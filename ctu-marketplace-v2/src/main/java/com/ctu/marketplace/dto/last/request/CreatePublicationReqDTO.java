package com.ctu.marketplace.dto.last.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreatePublicationReqDTO {
    private String title;
    private String author;
    private Integer yearOfPublication;
    private String journalName;
    private String volumeName;
    private String issueName;
    private String pageNumber;
    private String doi;
    private Long researchInformationId;
}
