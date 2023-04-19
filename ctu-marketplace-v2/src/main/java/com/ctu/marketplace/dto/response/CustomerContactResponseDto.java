package com.ctu.marketplace.dto.response;


import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerContactResponseDto {
    private Long id;
    private ProjectResponseDto project;
    private String fullName;
    private String phoneNumber;
    private String email;
    private String content;
    private Timestamp createdDate;
}
