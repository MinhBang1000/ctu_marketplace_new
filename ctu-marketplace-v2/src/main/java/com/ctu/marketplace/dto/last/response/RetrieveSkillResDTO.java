package com.ctu.marketplace.dto.last.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RetrieveSkillResDTO {
    private Long id;
    private String name;
    private Long researchInformationId;
}
