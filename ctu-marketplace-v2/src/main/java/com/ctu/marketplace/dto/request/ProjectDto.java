package com.ctu.marketplace.dto.request;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDto {
    @NotBlank
    private String name;
    @NotBlank
    private String shortDescription;
    @NotBlank
    private String address;
    private Long template;
    @NotBlank
    private String companyName;
    @NotBlank
    private String phoneNumber;
    @NotBlank
    private String email;
    @NotBlank
    private String author;
    private String website;
    private String fax;
    @NotBlank
    private String projectImage;
    private Long statusId;
    @NotNull
    private Long userId;
    @NotEmpty
    private List<Long> fieldIdList;

}
