package com.ctu.marketplace.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComTransMethodResponseDto {
    private TransMethodResponseDto transMethod;
    private String note;
}
