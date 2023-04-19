package com.ctu.marketplace.dto.response;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFunctionResponseDto implements Serializable{
    private Boolean isEnabled;
    private FunctionResponseDto function;
}
