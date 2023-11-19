package com.ctu.marketplace.dto.last.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateResearchInformationReqDTO {
    private Long id;
    private String degree;
    private String position;
    private String institution;
    private String department;
    private Long personId;
}
