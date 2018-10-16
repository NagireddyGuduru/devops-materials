package com.mphasis.ewt.microservices.domain.dsl.commands;

import java.io.File;
import java.util.List;

import com.mphasis.ewt.microservices.domain.dsl.Command;
import com.mphasis.ewt.microservices.domain.dsl.CommandContext;
import com.mphasis.ewt.microservices.domain.dsl.CommandRegistry;

public class RenameCommand implements Command {

	private static final String VERB = "RENAME";
	
	static {
		CommandRegistry.registerCommand(VERB, new RenameCommand());
	}
	
	@Override
	public boolean execute(final CommandContext context, final List<String> parameters) {
		final File source = new File(context.getDestinationDirectory() + File.separator + parameters.get(0));
		if (source.exists()) {
			source.renameTo(new File(source.getParent() + File.separator + parameters.get(1)));
		}
		return true;
	}
}
