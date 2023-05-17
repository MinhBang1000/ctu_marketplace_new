package com.ctu.marketplace.dto.last.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPasswordDTO {
    private String password;
    private String confirm;
}
