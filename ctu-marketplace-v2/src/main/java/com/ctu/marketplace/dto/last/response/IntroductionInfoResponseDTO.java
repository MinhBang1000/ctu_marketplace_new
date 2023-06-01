package com.ctu.marketplace.dto.last.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class IntroductionInfoResponseDTO {
    private Long id;
    private String introductionKey;
    private String introductionValue;
}
