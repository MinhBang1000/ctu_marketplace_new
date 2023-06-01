package com.ctu.marketplace.dto.last.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class NewFooterInfoResponseDTO {
    private Long id;
    private String footerKey;
    private String footerValue;
}
