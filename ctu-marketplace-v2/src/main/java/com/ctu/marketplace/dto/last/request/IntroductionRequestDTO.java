package com.ctu.marketplace.dto.last.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class IntroductionRequestDTO {
    private String name;
    private Long domainId;
    private List<IntroductionInfoRequestDTO> introductionInfoRequestDTOS;
}
