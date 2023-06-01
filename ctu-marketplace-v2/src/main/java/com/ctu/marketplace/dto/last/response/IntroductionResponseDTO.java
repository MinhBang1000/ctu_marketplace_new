package com.ctu.marketplace.dto.last.response;

import com.ctu.marketplace.dto.response.DomainResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class IntroductionResponseDTO {
    private Long id;
    private String name;
    private DomainResponseDto domain;
    private List<IntroductionInfoResponseDTO> introductionInfos;
}
