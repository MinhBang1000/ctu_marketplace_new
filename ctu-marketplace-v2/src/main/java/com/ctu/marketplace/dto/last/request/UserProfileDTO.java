package com.ctu.marketplace.dto.last.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {
    private String fullName;
    private String phoneNumber;
    private String address;
    private Integer gender;
    private String email;
    private Date dob;
}
