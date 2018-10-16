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

import com.mphasis.ewt.microservices.domain.dsl.Command;
import com.mphasis.ewt.microservices.domain.dsl.CommandContext;
import com.mphasis.ewt.microservices.domain.dsl.CommandRegistry;

public class BlockDeleteCommand implements Command {

	private static final String VERB = "BLOCK_DELETE";
	
	static {
		CommandRegistry.registerCommand(VERB, new BlockDeleteCommand());
	}
	
	@Override
	public boolean execute(final CommandContext context, final List<String> parameters) {
		final String pattern = parameters.get(0).replaceAll("[*]", ".*");
		processFiles(context.getDestinationDirectory().getAbsolutePath(), context.getDestinationDirectory(), pattern, parameters.get(1));
		return true;
	}
	
	private void processFiles(final String rootPath, final File directory, final String pattern, final String block) {
		for (File file: directory.listFiles()) {
			if (file.isDirectory()) {
				processFiles(rootPath, file, pattern, block);
			} else {
				final String filePath = file.getAbsolutePath().replace(rootPath, "").replaceAll("\\\\", "/");
				if (filePath.matches(pattern)) {
					removeBlock(file, block);
				}
			}
		}
	}
	
	private void removeBlock(final File file, final String block) {
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
}
