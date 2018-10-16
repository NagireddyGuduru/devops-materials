package com.mphasis.ewt.microservices.domain.dsl.commands;

import java.io.File;
import java.util.List;

import com.mphasis.ewt.microservices.domain.dsl.Command;
import com.mphasis.ewt.microservices.domain.dsl.CommandContext;
import com.mphasis.ewt.microservices.domain.dsl.CommandRegistry;

public class DeleteCommand implements Command {

	private static final String VERB = "DELETE";
	
	static {
		CommandRegistry.registerCommand(VERB, new DeleteCommand());
	}

	@Override
	public boolean execute(final CommandContext context, final List<String> parameters) {
		final String pattern = parameters.get(0).replaceAll("[*]", ".*");
		deleteFiles(context.getDestinationDirectory().getAbsolutePath(), context.getDestinationDirectory(), pattern);
		return true;
	}
	
	private void deleteFiles(final String rootPath, final File sourceDirectory, final String pattern) {
		for (File file: sourceDirectory.listFiles()) {
			final String filePath = file.getAbsolutePath().replace(rootPath, "").replaceAll("\\\\", "/");
			if (file.isDirectory()) {
				if (filePath.matches(pattern)) {
					deleteFolder(file);
				} else {
					deleteFiles(rootPath, file, pattern);
				}
			} else {
				if (filePath.matches(pattern)) {
					file.delete();
				}
			}
		}
	}
	
	public boolean deleteFolder(File path) {
        boolean ret = true;
        if (path.isDirectory()){
            for (File f : path.listFiles()){
                ret = ret && deleteFolder(f);
            }
        }
        return ret && path.delete();
    }
	
}
