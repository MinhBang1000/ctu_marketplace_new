package com.ctu.marketplace.dto.last.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class IntroductionInfoRequestDTO {
    @JsonProperty("key")
    private String introductionKey;
    @JsonProperty("value")
    private String introductionValue;
}
