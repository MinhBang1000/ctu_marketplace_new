package com.ctu.marketplace.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserProfileGuestDto {
    private String fullName;
    private String email;
    private String dob;
    private String phoneNumber;
    private String address;
    private Integer gender;
    private Boolean getNews;
}
