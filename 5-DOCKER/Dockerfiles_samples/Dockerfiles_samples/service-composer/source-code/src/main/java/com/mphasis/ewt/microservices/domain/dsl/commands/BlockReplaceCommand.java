package com.mphasis.ewt.microservices.domain.dsl.commands;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import com.mphasis.ewt.microservices.domain.dsl.Command;
import com.mphasis.ewt.microservices.domain.dsl.CommandContext;
import com.mphasis.ewt.microservices.domain.dsl.CommandRegistry;

public class BlockReplaceCommand implements Command {

	private static final String VERB = "BLOCK_REPLACE";
	private static final String FRAGMENT_LOCATION = "/config/dsl/fragments/";
	
	static {
		CommandRegistry.registerCommand(VERB, new BlockReplaceCommand());
	}
	
	@Override
	public boolean execute(final CommandContext context, final List<String> parameters) {
		final String pattern = parameters.get(0).replaceAll("[*]", ".*");
		final String fragmentName = parameters.get(2);
		String fragment = "";
		try {
			fragment = readFragment(FRAGMENT_LOCATION + fragmentName);
			fragment = interpolateString(fragment, context.getEnvironment());
		} catch (Exception e) {
			e.printStackTrace();
		}
		processFiles(context.getDestinationDirectory().getAbsolutePath(), context.getDestinationDirectory(), pattern, parameters.get(1), fragment);
		return true;
	}
	
	private void processFiles(final String rootPath, final File directory, final String pattern, final String block, final String replaceWith) {
		for (File file: directory.listFiles()) {
			if (file.isDirectory()) {
				processFiles(rootPath, file, pattern, block, replaceWith);
			} else {
				final String filePath = file.getAbsolutePath().replace(rootPath, "").replaceAll("\\\\", "/");
				if (filePath.matches(pattern)) {
					replaceBlock(file, block, replaceWith);
				}
			}
		}
	}
	
	private void replaceBlock(final File file, final String block, final String replaceWith) {
		final String BLOCK_START = "<block-" + block + "-start>";
		final String BLOCK_END = "<block-" + block + "-end>";
		final ByteArrayOutputStream tempFile = new ByteArrayOutputStream();
		try(LineNumberReader reader = new LineNumberReader(new FileReader(file))) {
			PrintWriter writer = new PrintWriter(new OutputStreamWriter(tempFile));
			String aLine;
			boolean omit = false;
			while ((aLine = reader.readLine()) != null) {
				if (aLine.indexOf(BLOCK_END) > -1) {
					if (omit) {
						omit = false;
						writer.println(replaceWith);
						continue;
					} else {
						writer.println(aLine);
					}
				} else if (aLine.indexOf(BLOCK_START) > -1) {
					omit = true;
				} else {
					if (!omit) {
						writer.println(aLine);	
					}
				}
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
	
	private String interpolateString(final String data, final Map<String, Object> variables) {
		String result = data;
		for (Map.Entry<String, Object> entry: variables.entrySet()) {
			final String placeHolder = "\\{\\{" + entry.getKey() + "\\}\\}";
			result = result.replaceAll(placeHolder, null == entry.getValue() ? "" : String.valueOf(entry.getValue()));
		}
		return result;
	}
	
	private String readFragment(final String path) {
		if (null == BlockReplaceCommand.class.getResource(path)) {
			System.out.println("Fragment not found: " + path);
			return "";
		}
		final StringBuffer result = new StringBuffer();
		try (final InputStream stream = BlockReplaceCommand.class.getResourceAsStream(path)) {
			LineNumberReader reader = new LineNumberReader(new InputStreamReader(stream));
			String aLine;
			while ((aLine = reader.readLine()) != null) {
				result.append(aLine);
				result.append('\n');
			}
			return result.toString();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
