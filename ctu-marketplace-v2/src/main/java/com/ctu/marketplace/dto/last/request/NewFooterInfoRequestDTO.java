package com.ctu.marketplace.dto.last.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class NewFooterInfoRequestDTO {
    @JsonProperty("key")
    private String footerKey;
    @JsonProperty("value")
    private String footerValue;
}
