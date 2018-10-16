package com.mphasis.ewt.microservices.domain.dsl;

import java.util.List;

public interface Command {
	
	boolean execute(CommandContext context, List<String> parameters);
}
