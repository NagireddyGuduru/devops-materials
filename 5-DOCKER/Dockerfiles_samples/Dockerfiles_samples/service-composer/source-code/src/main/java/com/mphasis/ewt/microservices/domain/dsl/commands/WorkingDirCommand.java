package com.mphasis.ewt.microservices.domain.dsl.commands;

import java.io.File;
import java.util.List;

import com.mphasis.ewt.microservices.domain.dsl.Command;
import com.mphasis.ewt.microservices.domain.dsl.CommandContext;
import com.mphasis.ewt.microservices.domain.dsl.CommandRegistry;

public class WorkingDirCommand implements Command {

	private static final String VERB = "WORKING_DIR";
	
	static {
		CommandRegistry.registerCommand(VERB, new WorkingDirCommand());
	}
	
	@Override
	public boolean execute(final CommandContext context, final List<String> parameters) {
		final String path = parameters.get(0);
		context.setSourceDirectory(
				new File(context.getSourceDirectory().getAbsolutePath() + File.separator + path));
		context.setDestinationDirectory(
				new File(context.getDestinationDirectory().getAbsolutePath() + File.separator + path));
		return true;
	}

}
