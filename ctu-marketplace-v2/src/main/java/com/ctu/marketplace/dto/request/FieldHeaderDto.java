package com.ctu.marketplace.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FieldHeaderDto {
    private Long id;
    String name;
    private Long childOfFieldHeaderId;
}
