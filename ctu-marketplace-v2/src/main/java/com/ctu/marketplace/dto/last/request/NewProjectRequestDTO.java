package com.ctu.marketplace.dto.last.request;

import com.ctu.marketplace.dto.last.KeyValueDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewProjectRequestDTO {
    private String name;
    private String author;
    private String image;
    private String introduction;
    private Long approverId;
    private Long userId;
    private List<Long> fieldIds;
    private Long statusId;
    private List<KeyValueDTO> keyValues;
}
