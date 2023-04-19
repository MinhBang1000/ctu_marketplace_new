package com.ctu.marketplace.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserProfileAdminDto {
    private String fullName;
    private String email;
    private String phoneNumber;
    private String address;
    private Integer gender;
    private String username;
    private String password;
    private Long roleId;
    private Long domainId;
}
