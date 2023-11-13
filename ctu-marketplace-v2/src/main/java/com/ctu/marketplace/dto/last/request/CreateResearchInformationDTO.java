package com.ctu.marketplace.dto.last.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class CreateResearchInformationDTO {
    private String degree;
    private String position;
    private String institution;
    private String department;
    private Long personId;
}
