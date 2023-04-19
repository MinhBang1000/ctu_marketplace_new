package com.ctu.marketplace.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FieldHeaderResponseDto {
    private Long id;
    String name;
    private List<FieldHeaderResponseDto> childOfFieldHeaderList;
}
