package com.minhduy.service.impl;

import java.io.File;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.minhduy.service.UploadService;

@Service
public class UploadServiceImpl implements UploadService {

	@Override
	public File save(MultipartFile file, String folder) {
		try {
			File dir = new ClassPathResource("static/assets/" + folder).getFile();
			if (!dir.exists()) {
				dir.mkdirs();
			}
			String s = System.currentTimeMillis() + file.getOriginalFilename();
			String name = Integer.toHexString(s.hashCode()) + s.substring(s.lastIndexOf("."));

			File savedFile = new File(dir, name);
			file.transferTo(savedFile);
			System.out.println(savedFile.getAbsolutePath());
			return savedFile;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
