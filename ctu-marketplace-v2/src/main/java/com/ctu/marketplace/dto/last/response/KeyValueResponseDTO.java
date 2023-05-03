package com.ctu.marketplace.dto.last.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class KeyValueResponseDTO {
    private Long id;
    private String key;
    private String value;
}
