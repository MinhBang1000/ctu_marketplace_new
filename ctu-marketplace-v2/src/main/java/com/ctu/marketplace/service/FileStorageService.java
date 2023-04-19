package com.ctu.marketplace.service;

import java.nio.file.Path;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    public void init();

    public String store(MultipartFile file);

    public Resource loadAsResource(String filename);

    public void deleteAll();

    public Stream<Path> loadAll();
}
