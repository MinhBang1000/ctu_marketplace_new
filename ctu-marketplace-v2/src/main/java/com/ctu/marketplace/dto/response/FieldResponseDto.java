package com.ctu.marketplace.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FieldResponseDto {
    private Long id;
    private String name;
    private List<FieldResponseDto> childOfFieldList;
}
