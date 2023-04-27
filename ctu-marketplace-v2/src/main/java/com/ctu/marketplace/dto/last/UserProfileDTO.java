package com.ctu.marketplace.dto.last;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserProfileDTO {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String fullName;
}
