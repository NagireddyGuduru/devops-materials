package com.mphasis.ewt.microservices.domain.dsl.commands;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.LineNumberReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import com.mphasis.ewt.microservices.domain.dsl.Command;
import com.mphasis.ewt.microservices.domain.dsl.CommandContext;
import com.mphasis.ewt.microservices.domain.dsl.CommandRegistry;

public class InterpolationCommand implements Command {

	private static final String VERB = "INTERPOLATE";
	
	static {
		CommandRegistry.registerCommand(VERB, new InterpolationCommand());
	}
	
	@Override
	public boolean execute(final CommandContext context, final List<String> parameters) {
		final String pattern = parameters.get(0).replaceAll("[*]", ".*");
		processFiles(context.getDestinationDirectory().getAbsolutePath(), context.getDestinationDirectory(), pattern, context.getEnvironment());
		return true;
	}
	
	private void processFiles(final String rootPath, final File directory, final String pattern, final Map<String, Object> variables) {
		for (File file: directory.listFiles()) {
			if (file.isDirectory()) {
				processFiles(rootPath, file, pattern, variables);
			} else {
				final String filePath = file.getAbsolutePath().replace(rootPath, "").replaceAll("\\\\", "/");
				if (filePath.matches(pattern)) {
					interpolateFile(file, variables);
				}
			}
		}
	}
	
	private void interpolateFile(final File file, final Map<String, Object> variables) {
		final ByteArrayOutputStream tempFile = new ByteArrayOutputStream();
		try(LineNumberReader reader = new LineNumberReader(new FileReader(file))) {
			PrintWriter writer = new PrintWriter(new OutputStreamWriter(tempFile));
			String aLine;
			while ((aLine = reader.readLine()) != null) {
				writer.println(interpolateLine(aLine, variables));
			}
			writer.flush();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		file.delete();
		try (FileOutputStream out = new FileOutputStream(file)) {
			tempFile.writeTo(out);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	private String interpolateLine(final String data, final Map<String, Object> variables) {
		String result = data;
		for (Map.Entry<String, Object> entry: variables.entrySet()) {
			final String placeHolder = "\\{\\{" + entry.getKey() + "\\}\\}";
			if (null == entry.getValue() || "null".equals(String.valueOf(entry.getValue()))) {
				result = result.replaceAll(placeHolder, "");
			} else {
				result = result.replaceAll(placeHolder, String.valueOf(entry.getValue()));
			}
		}
		return result;
	}
}