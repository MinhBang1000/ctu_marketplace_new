package com.ctu.marketplace.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserProfileGuestDto {
    private String fullName;
    private String email;
    private String phoneNumber;
    private String address;
    private Integer gender;
    private String username;
    private String password;
    private Boolean getNews;
    private String dob;
}
