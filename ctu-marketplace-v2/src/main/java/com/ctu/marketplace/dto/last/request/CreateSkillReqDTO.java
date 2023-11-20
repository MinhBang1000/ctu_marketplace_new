package com.ctu.marketplace.dto.last.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateSkillReqDTO {
    private String name;
    private Long researchInformationId;
}
