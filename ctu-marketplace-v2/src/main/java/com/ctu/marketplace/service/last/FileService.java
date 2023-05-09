package com.ctu.marketplace.service.last;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class FileService {
    public String uploadImage(String path, MultipartFile multipartFile) throws IOException {
        String fileCode = RandomStringUtils.randomAlphabetic(8);
        String fileName = fileCode + "_" + multipartFile.getOriginalFilename();
        String filePath = path + File.separator + fileName;
        File f = new File(path);
        if (!f.exists()) {
            f.mkdir();
        }
        Files.copy(multipartFile.getInputStream(), Paths.get(filePath));
        return fileName;
    }

    public InputStream getResource(String path, String fileName) throws FileNotFoundException {
        String fullPath = path + File.separator + fileName;
        InputStream is = new FileInputStream(fullPath);
        return is;
    }
}
