package com.ctu.marketplace.dto.request;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserProfileResearcherByAdminDto {
    private String avatar;
    @NotBlank
    private String fullName;
    private String email;
    private String dob;
    private String phoneNumber;
    private String address;
    private Integer gender;
    private String username;
    private String password;
    private String qualification;
    private String website;
    private String bio;
    private Long domainId;

}
