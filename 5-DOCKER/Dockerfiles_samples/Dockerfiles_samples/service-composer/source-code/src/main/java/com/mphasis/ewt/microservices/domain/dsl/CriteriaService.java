package com.mphasis.ewt.microservices.domain.dsl;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;
import java.util.StringTokenizer;


public class CriteriaService {

	private final static String COMMA = ",";
	private final static String CLOSING_PARANTHESIS = ")";
	private final static String OPEN_PARANTHESIS = "(";
	
	public CriteriaService() {
	}
	
	public boolean evaluate(final CommandContext context, final String criteria) {
		final Stack<String> expressionStack = new Stack<String>();
		final StringTokenizer tokenizer = new StringTokenizer(criteria, ",() ", true);
		String token;
		boolean expressionResult = false;
		
		while(tokenizer.hasMoreTokens()) {
			token = tokenizer.nextToken().trim();
			if (COMMA.equals(token) || "".equals(token)) {
				continue;
			} else if (CLOSING_PARANTHESIS.equals(token)) {
				final Criteria operation = popOperation(expressionStack);
				final String result = String.valueOf(evaluate(operation, context));
				expressionStack.push(result);	
			} else {
				expressionStack.push(token);
			}
		}
		expressionResult = Boolean.valueOf(expressionStack.pop());
		if (expressionStack.size() > 0 ) {
			throw new RuntimeException("Expression '" + criteria + "' not properly framed.");
		}
		
		return expressionResult;
	}
	
	private Criteria popOperation(final Stack<String> expressionStack) {
		final List<String> arguments = new ArrayList<String>();
		String itemOnTop; 
		try {
			while (true) {
				itemOnTop = expressionStack.pop();
				if (itemOnTop != null && String.class.isAssignableFrom(itemOnTop.getClass())) {
					if (OPEN_PARANTHESIS.equals((String) itemOnTop)){
						break;
					}
				}
				arguments.add(0, itemOnTop);
			}
			final String verb = (String) expressionStack.pop();
			return new Criteria(verb, arguments);
		} catch (Exception  e) {
			throw new RuntimeException("Invalid EL Expression [" + e.getLocalizedMessage() + "]", e);
		}
	}
	
	private boolean evaluate(final Criteria operation, final CommandContext context) {
		if ("IF_INCLUDED".equalsIgnoreCase(operation.getVerb())) {
			return ifIncluded(context, operation.getArguments().get(0));
		} else if ("IF_NOT_INCLUDED".equalsIgnoreCase(operation.getVerb())) {
			return !ifIncluded(context, operation.getArguments().get(0));
		} else if ("AND".equalsIgnoreCase(operation.getVerb())) {
			return and(operation.getArguments());
		} else if ("OR".equalsIgnoreCase(operation.getVerb())) {
			return or(operation.getArguments());
		} else if ("NOT".equalsIgnoreCase(operation.getVerb())) {
			return not(operation.getArguments());
		} else {
			return false;
		}
	}
	
	private boolean ifIncluded(final CommandContext context, final String serviceId) {
		return context.getServices().contains(serviceId);
	}
	
	private boolean and(List<String> arguments) {
		boolean result = true;
		for (String s: arguments) {
			result = result && Boolean.valueOf(s);
		}
		return result;
	}
	
	private boolean or(List<String> arguments) {
		boolean result = false;
		for (String s: arguments) {
			result = result || Boolean.valueOf(s);
		}
		return result;
	}
	
	private boolean not(List<String> arguments) {
		return !Boolean.valueOf(arguments.get(0));
	}
	
	public static void main(String[] args) {
		CriteriaService service = new CriteriaService();
		System.out.println(service.evaluate(new CommandContext(), "AND(IF_INCLUDED(TEST),NOT_INCLUEDED(1,2))"));
		System.out.println(service.evaluate(new CommandContext(), " AND ( IF_INCLUDED( TEST ) , NOT_INCLUEDED( 1 , 2) )"));
	}
}
