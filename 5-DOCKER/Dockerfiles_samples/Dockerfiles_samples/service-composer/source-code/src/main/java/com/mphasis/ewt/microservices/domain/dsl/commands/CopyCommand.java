package com.mphasis.ewt.microservices.domain.dsl.commands;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import com.mphasis.ewt.microservices.domain.dsl.Command;
import com.mphasis.ewt.microservices.domain.dsl.CommandContext;
import com.mphasis.ewt.microservices.domain.dsl.CommandRegistry;

public final class CopyCommand implements Command {

	private static final String VERB = "COPY";
	
	static {
		CommandRegistry.registerCommand(VERB, new CopyCommand());
	}
	
	@Override
	public boolean execute(final CommandContext context, final List<String> parameters) {
		final String pattern = parameters.get(0).replaceAll("[*]", ".*");
		copyFiles(context.getSourceDirectory().getAbsolutePath(), context.getSourceDirectory(), pattern, context.getDestinationDirectory());
		return true;
	}
	
	private void copyFiles(final String rootPath, final File sourceDirectory, final String pattern, final File destinationDirectory) {
		for (File file: sourceDirectory.listFiles()) {
			if (file.isDirectory()) {
				copyFiles(rootPath, file, pattern, destinationDirectory);
			} else {
				final String filePath = file.getAbsolutePath().replace(rootPath, "").replaceAll("\\\\", "/");
				if (filePath.matches(pattern)) {
					copyFile(file, new File(destinationDirectory.getAbsolutePath() + File.separator + filePath));
				}
			}
		}
	}
	
	private void copyFile(final File source, final File destination) {
		try {
			if (!destination.getParentFile().exists()) {
				destination.getParentFile().mkdirs();
			}
			Files.copy(source.toPath(), destination.toPath());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
