package com.mphasis.ewt.microservices.domain.dsl;

import java.util.HashMap;
import java.util.Map;

import com.mphasis.ewt.microservices.domain.dsl.commands.BlockCleanCommand;
import com.mphasis.ewt.microservices.domain.dsl.commands.BlockDeleteCommand;
import com.mphasis.ewt.microservices.domain.dsl.commands.BlockReplaceCommand;
import com.mphasis.ewt.microservices.domain.dsl.commands.CopyCommand;
import com.mphasis.ewt.microservices.domain.dsl.commands.DeleteCommand;
import com.mphasis.ewt.microservices.domain.dsl.commands.InterpolationCommand;
import com.mphasis.ewt.microservices.domain.dsl.commands.RenameCommand;
import com.mphasis.ewt.microservices.domain.dsl.commands.WorkingDirCommand;

public final class CommandRegistry {
	
	private final static Map<String, Command> registry = new HashMap<>();
	
	private CommandRegistry() {
		
	}
	
	static{
		try {
			Class.forName(CopyCommand.class.getName());
			Class.forName(DeleteCommand.class.getName());
			Class.forName(RenameCommand.class.getName());
			Class.forName(BlockDeleteCommand.class.getName());
			Class.forName(BlockCleanCommand.class.getName());
			Class.forName(BlockReplaceCommand.class.getName());
			Class.forName(InterpolationCommand.class.getName());
			Class.forName(WorkingDirCommand.class.getName());
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	public static void registerCommand(final String verb, final Command command) {
		registry.put(verb.trim().toLowerCase(), command);
	}
	
	public static Command getCommand(final CommandDescription description) {
		final Command result = registry.get(description.getVerb().trim().toLowerCase());
		if (null == result) {
			throw new RuntimeException("Command for verb '" + description.getVerb() + "' not found.");
		}
		return result;
	}
	

}
