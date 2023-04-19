package com.ctu.marketplace.service.impl;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ctu.marketplace.config.GenerateDateTime;
import com.ctu.marketplace.service.FileStorageService;

@Service
public class FileStorageServiceImpl implements FileStorageService {
    @Autowired
    private GenerateDateTime generateDateTime;

    @Value("${url}")
    private String url;

    @Override
    public void init() {
        try {
            Path root = Paths.get(url);
            Files.createDirectories(root);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String store(MultipartFile file) {
        try {
            Path root = Paths.get(url);
            String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."),
                    file.getOriginalFilename().length());
            String fileName = generateDateTime.getString() + extension;
            Files.copy(file.getInputStream(), root.resolve(fileName));
            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path root = Paths.get(url);
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Không thể đọc file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            Path root = Paths.get(url);
            return Files.walk(root, 1).filter(path -> !path.equals(root)).map(root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Không thể tải file!");
        }
    }

    @Override
    public void deleteAll() {
    }
}
