package com.ctu.marketplace.dto.last.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileUploadResponseDTO {
    private String fileName;
    private String fileCode;
    private long size;
}
