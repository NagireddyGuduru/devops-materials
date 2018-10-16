package com.mphasis.ewt.microservices.application.impl.cart;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;

public class ProcessStreamGobbler implements Runnable {

	private Process process;
	private PrintWriter logWriter;
	
	public ProcessStreamGobbler(final Process process, final PrintWriter logWriter) {
		this.process = process;
		this.logWriter = logWriter;
	}
	
	@Override
	public void run() {
		new BufferedReader(new InputStreamReader(process.getErrorStream()))
			.lines()
			.peek(data -> {
				System.err.println(data);
			})
			.forEach(data -> {
				if (null != logWriter) {
					logWriter.println(data);
				}
			});
		new BufferedReader(new InputStreamReader(process.getInputStream()))
		.lines()
		.peek(data -> {
			System.err.println(data);
		})
		.forEach(data -> {
			if (null != logWriter) {
				logWriter.println(data);
			}
		});
	}
}
