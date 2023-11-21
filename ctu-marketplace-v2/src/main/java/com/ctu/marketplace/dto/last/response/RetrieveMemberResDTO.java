package com.ctu.marketplace.dto.last.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RetrieveMemberResDTO {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String fullName;
    private RetrieveResearchInformationResDTO researchInformation;
}
