package com.ctu.marketplace.dto.last.response;

import com.ctu.marketplace.dto.last.FieldDTO;
import com.ctu.marketplace.dto.last.StatusDTO;
import com.ctu.marketplace.dto.last.UserProfileDTO;
import com.ctu.marketplace.dto.last.KeyValueDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewProjectDTO {
    private Long id;
    private String name;
    private String author;
    private String image;
    private String introduction;
    private Date createdAt;
    private UserProfileDTO approver;
    private UserProfileDTO user;
    private Set<FieldDTO> fields;
    private StatusDTO status;
    private boolean isTemplate;
    private List<KeyValueResponseDTO> keyValues;

}
