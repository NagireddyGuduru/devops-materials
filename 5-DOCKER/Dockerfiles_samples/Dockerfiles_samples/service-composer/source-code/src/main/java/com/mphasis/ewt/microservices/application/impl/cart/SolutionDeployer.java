package com.mphasis.ewt.microservices.application.impl.cart;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.lang.ProcessBuilder.Redirect;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.FileTime;
import java.time.Instant;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SolutionDeployer implements Callable<Integer>{
	
	private final static String DEPLOYMENT_INO_FILE = "/config/deployment/deploymentParameters.properties";
	private final static String DEPLOYMENT_INSTRUCTIONS_FOLDER = "/config/deployment/";
	private final static String DEFAULT_INSTRUCTIONS = "default";
	private final static String DEPLOYMENT_SUCCESS_INDICATOR = "deployment.sccess.null";
	private final static String DEPLOYMENT_FAILURE_INDICATOR = "deployment.failure.null";
	private final static String DEPLOYMENT_LOG_FILE = "deployment.log";
	private static final int THREAD_POOL_SIZE = 5;
	
	private static ExecutorService executorService;
	
	private int buildNumber;
	private Map<String, String> deploymentParameters;
	private String workingDirectory;
	private File projectFolder;
	private Properties projectInfo; 
	private Map<String, String> environment; 
	private boolean isWindows;
	private File logFile;
	
	private SolutionDeployer(final int buildNumber, final Map<String, String> deploymentParameters, final String workingDirectory) {
		this.buildNumber = buildNumber;
		this.deploymentParameters = deploymentParameters;
		this.workingDirectory = workingDirectory;
	}
	
	public Integer call() {
		prepareForDeployment();
		
		boolean buildSuccess = true;
		try {
			buildSuccess = buildSuccess && executeDefaultScript(projectFolder, environment);
			
			for (final String serviceId: projectInfo.getProperty("serviceIds").split(",")) {
				if (buildSuccess) { 
					buildSuccess = buildSuccess && executeServiceScript(serviceId, projectFolder, environment);
				}
			}
		} catch (Throwable e) {
			writeException(e);
		} finally {
			if (buildSuccess) {
				touch(new File(workingDirectory + File.separator + buildNumber + File.separator + DEPLOYMENT_SUCCESS_INDICATOR).toPath());
			} else {
				touch(new File(workingDirectory + File.separator + buildNumber + File.separator + DEPLOYMENT_FAILURE_INDICATOR).toPath());
			}
			if (buildSuccess) {
				writeLog("\n\nDeployment successful");
			} else {
				writeLog("\n\nDeployment Failed");
			}
		}
		return buildSuccess ? 0 : 1;
	}
	
	private boolean executeDefaultScript(final File projectFolder, final Map<String, String> environment) {
		String path;
		if (isWindows) {
			path = DEPLOYMENT_INSTRUCTIONS_FOLDER + DEFAULT_INSTRUCTIONS + "-windows.cmd";
		} else {
			path = DEPLOYMENT_INSTRUCTIONS_FOLDER + DEFAULT_INSTRUCTIONS + "-unix.sh";
		}
		
		if (null == SolutionDeployer.class.getResource(path)) {
			path = DEPLOYMENT_INSTRUCTIONS_FOLDER + DEFAULT_INSTRUCTIONS;
		}
		
		if (null == SolutionDeployer.class.getResource(path)) {
			return true;
		}
		
		return executeScriptFile(path, projectFolder, environment);
	}
	
	private boolean executeServiceScript(final String serviceId, final File projectFolder, 
					final Map<String, String> environment) {
		String path;
		if (isWindows) {
			path = DEPLOYMENT_INSTRUCTIONS_FOLDER + serviceId + "-windows.cmd";
		} else {
			path = DEPLOYMENT_INSTRUCTIONS_FOLDER + serviceId + "-unix.sh";
		}
		if (null == SolutionDeployer.class.getResource(path)) {
			path = DEPLOYMENT_INSTRUCTIONS_FOLDER + serviceId ;
		}
		if (null == SolutionDeployer.class.getResource(path)) {
			return true;
		}
		return executeScriptFile(path, projectFolder, environment);
	}
	
	private boolean executeScriptFile(final String scriptFile, final File projectFolder, final Map<String, String> environment) {
		
		writeLog("Executing instructions from file: " + scriptFile);
		try (final LineNumberReader reader = new LineNumberReader(new InputStreamReader(SolutionDeployer.class.getResourceAsStream(scriptFile)))) {
			String aLine;
			boolean buildSuccess = true;
			while((aLine = reader.readLine()) != null) {
				aLine = aLine.trim();
				if (!aLine.isEmpty()) {
					final String instruction = interpolateLine(aLine, environment);
					int exitCode = runInstruction(instruction);
					writeLog("\nProcess Exit Code : " + exitCode + "\n---\n");
					if (0 != exitCode) {
						buildSuccess = false;
						break;
					}
				}
			}
			return buildSuccess;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	private int runInstruction(final String instruction) throws IOException, InterruptedException  {
		final ProcessBuilder builder = new ProcessBuilder();
		builder.directory(projectFolder);
		writeLog("Executing Instruction: " + instruction);
		System.out.println("Executing Instruction: " + instruction);
		if (isWindows) {
		    builder.command("cmd.exe", "/c", instruction);
		} else {
		    builder.command("sh", "-c", instruction);
		}
		builder.redirectErrorStream(true);
		builder.redirectError(Redirect.appendTo(logFile));
		builder.redirectOutput(Redirect.appendTo(logFile));
		final Process process = builder.start();
		int result = process.waitFor();
		return result;
	}
	
	private void writeLog(final String log) {
		try (PrintWriter logWriter = new PrintWriter(new FileOutputStream(logFile, true))) {
			logWriter.println(log);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	private void writeException(final Throwable exception) {
		try (PrintWriter logWriter = new PrintWriter(new FileOutputStream(logFile, true))) {
			exception.printStackTrace(logWriter);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	private String interpolateLine(final String data, final Map<String, String> variables) {
		String result = data;
		for (Map.Entry<String, String> entry: variables.entrySet()) {
			final String placeHolder = "\\{\\{" + entry.getKey() + "\\}\\}";
			result = result.replaceAll(placeHolder, entry.getValue());
		}
		return result;
	}
	
	private void prepareForDeployment() {
		logFile = new File(workingDirectory + File.separator + buildNumber + File.separator + DEPLOYMENT_LOG_FILE);
		isWindows = System.getProperty("os.name").toLowerCase().startsWith("windows");
		environment = new HashMap<String, String>();
		projectInfo = getProjectInfo(workingDirectory, buildNumber);
		String projectName = projectInfo.getProperty("projectName"); 
		if (null == projectName) {
			projectName = "sample";
		}
		projectFolder = new File(workingDirectory + File.separator + buildNumber + File.separator + projectName.trim().toLowerCase().replaceAll(" ", "-"));
		environment.put("projectFolder", projectFolder.getAbsolutePath().replaceAll("\\\\", "/"));
		
		for(final Entry<Object, Object> entry : projectInfo.entrySet()) {
			environment.put(String.valueOf(entry.getKey()), String.valueOf(entry.getValue()));
		}
		environment.putAll(deploymentParameters);
	}
	
	public static void touch(final Path path) {
		try {
		    if (Files.exists(path)) {
		        Files.setLastModifiedTime(path, FileTime.from(Instant.now()));
		    } else {
		        Files.createFile(path);
		    }
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	public static boolean deploy(final int buildNumber, final Map<String, String> deploymentParameters, 
						final String workingDirectory) {
		initializeExecutorService();
		executorService.submit(new SolutionDeployer(buildNumber, deploymentParameters, workingDirectory));
		return true;
	}

	public static boolean redeploy(final int buildNumber, final Map<String, String> deploymentParameters, 
						final String workingDirectory) {
		initializeExecutorService();
		File file = new File(workingDirectory + File.separator + buildNumber + File.separator + DEPLOYMENT_SUCCESS_INDICATOR);
		if (file.exists()) {
			file.delete();
		}
		file = new File(workingDirectory + File.separator + buildNumber + File.separator + DEPLOYMENT_FAILURE_INDICATOR);
		if (file.exists()) {
			file.delete();
		}
		file = new File(workingDirectory + File.separator + buildNumber + File.separator + DEPLOYMENT_LOG_FILE);
		if (file.exists()) {
			file.delete();
		}
		executorService.submit(new SolutionDeployer(buildNumber, deploymentParameters, workingDirectory));
		return true;
	}
	
	private static void initializeExecutorService() {
		if (null == executorService) {
			executorService = Executors.newFixedThreadPool(THREAD_POOL_SIZE);
		}
	}
	
	public static Map<String, String> getDeploymentInfo(final String workingDirectory, final int buildNumber) {
		final Map<String, String> result = new HashMap<String, String>();
		final Properties properties = new Properties();
		try {
			properties.load(SolutionDeployer.class.getResourceAsStream(DEPLOYMENT_INO_FILE));
			final List<String> serviceIds = getServiceIds(workingDirectory, buildNumber);
			for (String serviceId: serviceIds) {
				if (properties.containsKey(serviceId)) {
					final String parametersString = properties.getProperty(serviceId);
					for (final String pairs: parametersString.split(";")) {
						final String[] tokens = pairs.split(":");
						if (tokens.length > 1) {
							result.put(tokens[0], tokens[1]);
						}
					}
					break;
				}
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
		return result;
	}
	
	private static List<String> getServiceIds(final String workingDirectory, final int buildNumber) {
		final Properties projectInfo = getProjectInfo(workingDirectory, buildNumber);
		final String serviceIds = projectInfo.getProperty("serviceIds");
		return Arrays.asList(serviceIds.split(","));			
	}
	
	private static Properties getProjectInfo(final String workingDirectory, final int buildNumber) {
		final File projectInfoFile = new File(
				workingDirectory + File.separator + buildNumber + File.separator + SolutionComposer.PROJECT_INFO_FILENAME);
		final Properties properties = new Properties();
		try {
			properties.load(new FileInputStream(projectInfoFile));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return properties;
	}
	
	public static boolean isDeploymentDone(final String workingDirectory, final int buildNumber) {
		return 
				new File(workingDirectory + File.separator + buildNumber + File.separator + DEPLOYMENT_SUCCESS_INDICATOR).exists()
				||
				new File(workingDirectory + File.separator + buildNumber + File.separator + DEPLOYMENT_FAILURE_INDICATOR).exists();
	}

	public static boolean isDeploymentSuccessful(final String workingDirectory, final int buildNumber) {
		if (isDeploymentDone(workingDirectory, buildNumber)) {
			return new File(workingDirectory + File.separator + buildNumber + File.separator + DEPLOYMENT_SUCCESS_INDICATOR).exists();	
		} else {
			throw new RuntimeException("Deployment still in progress");
		}
	}
	
	public static boolean isBuildDeployale(final String[] serviceIds) {
		final List<String> serviceIdsList = Arrays.asList(serviceIds);
		return serviceIdsList.contains("docker-swarm") ||
				serviceIdsList.contains("kubernetes") ||
				serviceIdsList.contains("pas") ||
				serviceIdsList.contains("heroku");
	}
	
	public static Map<String, String> getDeploymentLogs(final String workingDirectory, final int buildNumber, final long position) {
		final Map<String, String> resultMap = new HashMap<String, String>(); 
		final File logFile = new File(workingDirectory + File.separator + buildNumber + File.separator + DEPLOYMENT_LOG_FILE);
		if (logFile.exists()) {
			final StringBuffer result = new StringBuffer();
			try(FileInputStream stream = new FileInputStream(logFile)) {
				stream.skip(position);
				Reader reader = new InputStreamReader(stream);
				char[] buffer = new char[1024];
				int charsRead = 0;
				while ((charsRead = reader.read(buffer)) != -1) {
					result.append(new String(buffer, 0, charsRead));
				}
				
				resultMap.put("logs", result.toString());
				resultMap.put("readUntil", String.valueOf(logFile.length()));
				return resultMap;
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		} else {
			return resultMap;
		}
	}
}
