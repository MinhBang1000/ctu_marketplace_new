package com.ctu.marketplace.dto.request;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto implements Serializable{
    @NotBlank
    private String username;
    @NotBlank
    private String password;

}
