package com.ctu.marketplace.controller.common;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.service.FileStorageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping(BaseURL.ROOT + "/upload-file")
public class FileController {
    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping
    public String fileUploadHandling(@RequestParam("upload") MultipartFile[] upload) throws JsonProcessingException {
        List<String> url = new ArrayList<>();
        String fileName = "";
        String uri = "";
        for (MultipartFile multipartFile : upload) {
         fileName = fileStorageService.store(multipartFile);
            uri = ServletUriComponentsBuilder.fromCurrentContextPath().path(BaseURL.ROOT + "/upload-file" + "/download/")
                    .path(fileName).toUriString();
            url.add(uri);
        }
        HashMap<String,String> payload = new HashMap<>();
	    payload.put("uploaded","1");
	    payload.put("fileName",fileName);
	    payload.put("url", uri);
	    String fileInfo = new ObjectMapper().writeValueAsString(payload);
	    return fileInfo;
    }

    @CrossOrigin
    @GetMapping("/download/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        Resource resource = fileStorageService.loadAsResource(filename);
        try {
            Path path = resource.getFile().toPath();
            String contentType = Files.probeContentType(path);
            return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, contentType).body(resource);
        } catch (Exception e) {
            return ResponseEntity.ok().body(null);
        }
    }

}

