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

public class BlockCleanCommand implements Command {

	private static final String VERB = "BLOCK_CLEAN";
	
	static {
		CommandRegistry.registerCommand(VERB, new BlockCleanCommand());
	}
	
	@Override
	public boolean execute(final CommandContext context, final List<String> parameters) {
		final String pattern = parameters.get(0).replaceAll("[*]", ".*");
		processFiles(context.getDestinationDirectory().getAbsolutePath(), context.getDestinationDirectory(), pattern);
		return true;
	}
	
	private void processFiles(final String rootPath, final File directory, final String pattern) {
		for (File file: directory.listFiles()) {
			if (file.isDirectory()) {
				processFiles(rootPath, file, pattern);
			} else {
				final String filePath = file.getAbsolutePath().replace(rootPath, "").replaceAll("\\\\", "/");
				if (filePath.matches(pattern)) {
					removeBlock(file);
				}
			}
		}
	}
	
	private void removeBlock(final File file) {
		final String BLOCK = "<block-"; 
		final String BLOCK_START = "-start>";
		final String BLOCK_END = "-end>";
		final ByteArrayOutputStream tempFile = new ByteArrayOutputStream();
		try(LineNumberReader reader = new LineNumberReader(new FileReader(file))) {
			PrintWriter writer = new PrintWriter(new OutputStreamWriter(tempFile));
			String aLine;
			while ((aLine = reader.readLine()) != null) {
				if (aLine.indexOf(BLOCK) > -1 && 
						aLine.indexOf(BLOCK_START) > -1 && 
						aLine.indexOf(BLOCK) < aLine.indexOf(BLOCK_START)) {
					continue;
				}
				if (aLine.indexOf(BLOCK) > -1 && 
						aLine.indexOf(BLOCK_END) > -1 && 
						aLine.indexOf(BLOCK) < aLine.indexOf(BLOCK_END)) {
					continue;
				}
				writer.println(aLine);
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
