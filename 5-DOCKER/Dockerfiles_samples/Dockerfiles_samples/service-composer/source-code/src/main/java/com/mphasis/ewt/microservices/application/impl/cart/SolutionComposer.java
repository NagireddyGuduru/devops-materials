package com.mphasis.ewt.microservices.application.impl.cart;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.FileVisitOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.mphasis.ewt.microservices.domain.dsl.Command;
import com.mphasis.ewt.microservices.domain.dsl.CommandContext;
import com.mphasis.ewt.microservices.domain.dsl.CommandDescription;
import com.mphasis.ewt.microservices.domain.dsl.CommandRegistry;
import com.mphasis.ewt.microservices.domain.dsl.CriteriaService;
import com.mphasis.ewt.microservices.domain.dsl.ParserService;

public class SolutionComposer extends Thread {

	public static final String PROJECT_INFO_FILENAME = "projectInfo.txt";
	
	private static final String DEFAULT_DSL = "/config/dsl/default.dsl";
	private static final String DSL_ROOT = "/config/dsl";
	private static final String OUTPUT_FILE_NAME = "source-code.zip";
	private static final int THREAD_POOL_SIZE = 5;
	
	private static ExecutorService executorService;

	private String organizationName;
	private String organizationUrl;
	private String projectName;
	private String projectUrl;
	private String projectDescription;
	private String[] serviceIds;
	private String workingDirectory;
	private String sourceFile;
	private File sourceFolder;
	private int buildNumber;
	private File destinationFolder;
	private Map<String, String> environment;
	
	private SolutionComposer(final String organizationName, final String organizationUrl, final String projectName, 
						final String projectUrl, final String projectDescription, final String[] serviceIds,
						final String workingDirectory, final String sourceFile, final int buildNumber,
						final Map<String, String> environment) {
		this.organizationName = organizationName;
		this.organizationUrl = organizationUrl;
		this.projectName = projectName;
		this.projectUrl = projectUrl;
		this.projectDescription = projectDescription;
		this.workingDirectory = workingDirectory;
		this.serviceIds = validateSelectedServices(serviceIds);
		this.sourceFile = sourceFile;
		this.buildNumber = buildNumber;
		this.environment = environment;
	}
	
	@Override
	public void run() {
		recordProjectInfo();
		prepareSource();
		prepareTarget();
		executeDefaultRunBook();
		executeServiceRunbooks();
		packFiles();
	}

	private void packFiles() {
		ZipHelper.zipFolder(destinationFolder, 
							new File(workingDirectory + File.separator + buildNumber + File.separator + OUTPUT_FILE_NAME));
	}

	private void executeDefaultRunBook() {
		executeRunbook(getCommandContext(), DEFAULT_DSL);
	}
	
	private void executeServiceRunbooks() {
		final CommandContext context = getCommandContext();
		for (String serviceId: serviceIds) {
			final String runbookFile = DSL_ROOT + File.separator + serviceId + ".dsl";
			executeRunbook(context, runbookFile);
		}	
	}
	
	private void executeRunbook(final CommandContext context, final String runbookFile) {
		final ParserService parserService = new ParserService();
		final CriteriaService criteriaService = new CriteriaService();
		final CommandContext runbookContext = context.clone();
		try (InputStream stream = SolutionComposer.class.getResourceAsStream(runbookFile)) {
			if (null != stream) {
				final List<CommandDescription> commandDescriptions = parserService.parseFile(stream);
				for(CommandDescription cmdDescription: commandDescriptions) {
					final Command command = CommandRegistry.getCommand(cmdDescription);
					if (null == cmdDescription.getCriteria()) {
						command.execute(runbookContext, cmdDescription.getArguments());
					} else {
						if (criteriaService.evaluate(runbookContext, cmdDescription.getCriteria())) {
							command.execute(runbookContext, cmdDescription.getArguments());
						}
					}
				}
			} else {
				System.out.println("Runbook file not found: " + runbookFile);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private CommandContext getCommandContext() {
		final CommandContext context = new CommandContext();
		context.setSourceDirectory(sourceFolder);
		context.setDestinationDirectory(destinationFolder);
		context.getEnvironment().put("organizationName", organizationName);
		context.getEnvironment().put("organizationUrl", organizationUrl);
		context.getEnvironment().put("projectName", projectName);
		context.getEnvironment().put("projectUrl", projectUrl);
		context.getEnvironment().put("projectDescription", projectDescription);
		context.getServices().addAll(Arrays.asList(serviceIds));
		if (null != environment) {
			context.getEnvironment().putAll(environment);
		}
		return context;
	}
	
	private void prepareSource() {
		// sourceFolder = new File(workingDirectory + File.separator + buildNumber + File.separator + "source");
		sourceFolder = new File(workingDirectory + File.separator + "source" + File.separator);
		if (!sourceFolder.exists()) {
			ZipHelper.unzipFile(SolutionComposer.class.getResourceAsStream(sourceFile), sourceFolder.getAbsolutePath());
		}
	}
	
	private void prepareTarget() {
		if (null == projectName) {
			projectName = "sample";
		}
		
		final String folderName = projectName.trim().toLowerCase().replaceAll(" ", "-");
		destinationFolder = new File(workingDirectory + File.separator + buildNumber + File.separator + folderName);
		destinationFolder.mkdirs();
	}

	private void recordProjectInfo() {
		final File projectInfoFile = new File(
				workingDirectory + File.separator + buildNumber + File.separator + PROJECT_INFO_FILENAME);
		if (!projectInfoFile.getParentFile().exists()) {
			projectInfoFile.getParentFile().mkdirs();
		}
		try (final PrintWriter projectInfo = new PrintWriter(projectInfoFile.getAbsolutePath())) {
			projectInfo.println("organizationName= " + this.organizationName);
			projectInfo.println("organizationUrl=" + this.organizationUrl);
			projectInfo.println("projectName=" + this.projectName);
			projectInfo.println("projectUrl=" + this.projectUrl);
			projectInfo.println("projectDescription=" + this.projectDescription);
			projectInfo.println("serviceIds=" + String.join(",", this.serviceIds));
			projectInfo.println("workingDirectory=" + this.workingDirectory);
			projectInfo.println("sourceCodeFile=" + this.sourceFile);
			projectInfo.println("buildNumber=" + this.buildNumber);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	private String[] validateSelectedServices(final String[] serviceIds) {
		final List<String> services = new ArrayList<String>();
		services.addAll(Arrays.asList(serviceIds));
		if (services.contains("config-server-spring") ||
				services.contains("spring-sleuth") ||
				services.contains("edge-service-zuul") ||
				services.contains("zipkin-server")) {
			services.add("spring-cloud-services");
		}
		return services.toArray(new String[]{});
	}
	
	public synchronized static int compose(final String organizationName, final String organizationUrl, final String projectName, 
									final String projectUrl, final String projectDescription, final String[] serviceIds,
									final String workingDirectory, final String sourceFile, final int numberOfBuildsToRetain,
									final Map<String, String> environment) {
		initializeExecutorService();
		int buildNumber = -1;
		for (int index = 0; index < numberOfBuildsToRetain + 2; index++) {
			final File destinationFolder = new File(workingDirectory + File.separator + index);
			if (!destinationFolder.exists()) {
				buildNumber = index;
				break;
			}
		}
		if (buildNumber == -1) {
			buildNumber = 0;
		}
		File destinationFolder = new File(workingDirectory + File.separator + buildNumber);
		if (destinationFolder.exists()) {
			deleteFolder(destinationFolder.toPath());
		}
		destinationFolder = new File(workingDirectory + File.separator + ((buildNumber + 1) % (numberOfBuildsToRetain + 1)));
		if (destinationFolder.exists()) {
			deleteFolder(destinationFolder.toPath());
		}
		
		executorService.submit(
						new SolutionComposer(
								organizationName, 
								organizationUrl, 
								projectName, 
								projectUrl, 
								projectDescription, 
								serviceIds, 
								workingDirectory, 
								sourceFile, 
								buildNumber,
								environment));
		return buildNumber;
	}
	
	private static void deleteFolder(Path path) {
		try {
			Files.walk(path, FileVisitOption.FOLLOW_LINKS)
				.sorted(Comparator.reverseOrder())
				.map(Path::toFile)
				.forEach(File::delete);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	public static boolean isComposeReady(final String workingDirectory, final int buildNumber) {
		return new File(workingDirectory + File.separator + buildNumber + File.separator + OUTPUT_FILE_NAME).exists();
	}
	
	public static File getBuildContent(final String workingDirectory, final int buildNumber) {
		if (isComposeReady(workingDirectory, buildNumber)) {
			return new File(workingDirectory + File.separator + buildNumber + File.separator + OUTPUT_FILE_NAME);
		}
		return null;
	}
	
	private static void initializeExecutorService() {
		if (null == executorService) {
			executorService = Executors.newFixedThreadPool(THREAD_POOL_SIZE);
		}
	}
}
