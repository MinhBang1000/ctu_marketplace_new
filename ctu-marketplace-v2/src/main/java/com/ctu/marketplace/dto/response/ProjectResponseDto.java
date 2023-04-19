package com.ctu.marketplace.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponseDto extends BaseResponse {
    private Long id;
    private String projectType;
    private String name;
    private String shortDescription;
    private String address;
    private Long template;
    private String companyName;
    private String phoneNumber;
    private String email;
    private String author;
    private String website;
    private String fax;
    private Boolean isHighlighted;
    private Long ranking;
    private String projectImage;
    private UserProfileProjectResponseDto approver;
    private UserProfileProjectResponseDto user;
    private StatusResponseDto status;
    private List<ProjectFieldResponseDto> projectFieldList;
    // private List<CustomerContact> customerContactList;
}
