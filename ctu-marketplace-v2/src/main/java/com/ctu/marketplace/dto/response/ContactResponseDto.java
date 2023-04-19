package com.ctu.marketplace.dto.response;

import java.security.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactResponseDto {
    private String fullName;
    private String phoneNumber;
    private String email;
    private String title;
    private String content;
    private Timestamp createdDate;
}
