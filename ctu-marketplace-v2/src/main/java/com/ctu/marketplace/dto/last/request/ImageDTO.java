package com.ctu.marketplace.dto.last.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class ImageDTO implements Serializable {
    private MultipartFile file;
}
