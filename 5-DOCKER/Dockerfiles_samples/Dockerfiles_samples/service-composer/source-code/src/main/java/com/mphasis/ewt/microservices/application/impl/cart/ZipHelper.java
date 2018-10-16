package com.mphasis.ewt.microservices.application.impl.cart;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import org.apache.tomcat.util.http.fileupload.IOUtils;

public final class ZipHelper {
	
	final static int BUFFER = 2048;
	
	private ZipHelper() {
		
	}
	
	public static void unzipFile(final InputStream zipInputStream, final String uncompressFolderPath) {
		try (ZipInputStream zis = new ZipInputStream(new BufferedInputStream(zipInputStream))) {
			BufferedOutputStream outputStream = null;
		    ZipEntry entry;
		    
		    while((entry = zis.getNextEntry()) != null) {
		    	
		    	final File uncompressedFile = new File(uncompressFolderPath + File.separator + entry.getName());
		    	if (!entry.isDirectory()) {
		    		if (!uncompressedFile.getParentFile().exists()){
			    		uncompressedFile.getParentFile().mkdirs();
			    	}
		    		int count;
			    	byte data[] = new byte[BUFFER];
			    	FileOutputStream fos = new FileOutputStream(uncompressedFile);
			    	outputStream = new BufferedOutputStream(fos, BUFFER);
			    	while ((count = zis.read(data, 0, BUFFER)) != -1) {
			    		outputStream.write(data, 0, count);
			    	}
			        outputStream.flush();
			        outputStream.close();
		    	}
		    }
		} catch(Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	public static void zipFolder(final File folder, final File zipFile) {
		try {
			zipFolder(folder, new FileOutputStream(zipFile));
		} catch(Exception e) {
			throw new RuntimeException(e);
		}
    }

    public static void zipFolder(final File folder, final OutputStream outputStream) throws IOException {
        try (ZipOutputStream zipOutputStream = new ZipOutputStream(outputStream)) {
            processFolder(folder, zipOutputStream, folder.getPath().length() + 1);
        }
    }

    private static void processFolder(final File folder, final ZipOutputStream zipOutputStream, final int prefixLength) throws IOException {
        for (final File file : folder.listFiles()) {
            if (file.isFile()) {
                final ZipEntry zipEntry = new ZipEntry(file.getPath().substring(prefixLength));
                zipOutputStream.putNextEntry(zipEntry);
                try (FileInputStream inputStream = new FileInputStream(file)) {
                    IOUtils.copy(inputStream, zipOutputStream);
                }
                zipOutputStream.closeEntry();
            } else if (file.isDirectory()) {
                processFolder(file, zipOutputStream, prefixLength);
            }
        }
    }
}
