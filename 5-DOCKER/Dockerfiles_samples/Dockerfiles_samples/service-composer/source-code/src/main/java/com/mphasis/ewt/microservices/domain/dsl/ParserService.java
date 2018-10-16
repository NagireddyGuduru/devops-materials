package com.mphasis.ewt.microservices.domain.dsl;

import java.util.ArrayList;
import java.util.List;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;

public class ParserService {

	private final static String DO_VERB = "DO";
	private final static String WHEN_VERB = "WHEN";
	
	public List<CommandDescription> parseFile(final InputStream inputStream) {
		final List<CommandDescription> result = new ArrayList<CommandDescription>();
		final List<String> commands = readCommands(inputStream);
		for (String commandLine: commands) {
			result.add(parseCommandLine(commandLine));
		}
		
		return result;
	}
	
	private CommandDescription parseCommandLine(final String command) {
		final CommandDescription result = new CommandDescription();
		
		final String[] tokens = command.split(" ");
		boolean processingDoVerb = false, processingWhenVerb = false;
		boolean collectInstructions = false;
		final StringBuffer instruction = new StringBuffer();
		for (int index=0; index<tokens.length; index++) {
			final String token = tokens[index];
			if (DO_VERB.equalsIgnoreCase(token)) {
				processingDoVerb = true;
				collectInstructions = true;
				instruction.delete(0, instruction.length());
				continue;
			}
			if (WHEN_VERB.equalsIgnoreCase(token)) {
				processingWhenVerb = true;
				collectInstructions = true;
				instruction.delete(0, instruction.length());
				continue;
			}
			if (collectInstructions) {
				if (token.endsWith("]")) {
					collectInstructions = false;
					if (token.startsWith("[")) {
						instruction.append(token.substring(1, token.length() - 1));
					} else {
						instruction.append(' ');
						instruction.append(token.substring(0, token.length() - 1));
					}
					if (processingDoVerb) {
						processingDoVerb = false;
						final String[] doVerbTokens = instruction.toString().trim().split(" ");
						if (doVerbTokens.length > 0) {
							result.setVerb(doVerbTokens[0]);
						}
						for (int subIndex=1; subIndex<doVerbTokens.length; subIndex++) {
							result.getArguments().add(doVerbTokens[subIndex]);
						}
					}
					if (processingWhenVerb) {
						processingWhenVerb = false;
						result.setCriteria(instruction.toString().trim());
					}
					continue;
				}
				if (token.startsWith("[")) {
					instruction.append(token.substring(1));
				} else {
					instruction.append(' ');
					instruction.append(token);
				}
			}
		}
		return result;
	}
	
	private List<String> readCommands(final InputStream inputStream) {
		final List<String> result = new ArrayList<String>();
		try (LineNumberReader reader = new LineNumberReader(new InputStreamReader(inputStream))) {
			String aLine;
			StringBuffer command = new StringBuffer();
			while((aLine = reader.readLine()) != null) {
				command.delete(0, command.length());
				aLine = aLine.trim();
				if (aLine.isEmpty() || aLine.startsWith("#")) {
					continue;
				}
				if (aLine.endsWith("-")) {
					command.append(aLine.substring(0, aLine.length() - 1));
					//read further lines
					while ((aLine = reader.readLine()) != null) {
						aLine = aLine.trim();
						if (aLine.isEmpty()) {
							continue;
						}
						command.append(' ');
						if (aLine.endsWith("-")) {
							command.append(aLine.substring(0, aLine.length() - 1));
						} else {
							command.append(aLine.trim());
							break;
						}
					}
				} else {
					command.append(aLine);
				}
				
				result.add(command.toString());
			}
			
			return result;
		} catch (Exception e){
			throw new RuntimeException(e);
		}
	}
}
