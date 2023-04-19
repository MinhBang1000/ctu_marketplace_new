package com.ctu.marketplace.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerContactDto {
    private Long projectId;
    private String fullName;
    private String phoneNumber;
    private String email;
    private String content;
}
