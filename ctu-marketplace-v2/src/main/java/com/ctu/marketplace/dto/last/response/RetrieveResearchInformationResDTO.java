package com.ctu.marketplace.dto.last.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RetrieveResearchInformationResDTO {
    private Long id;
    private String degree;
    private String position;
    private String institution;
    private String department;
}
