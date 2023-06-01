package com.ctu.marketplace.dto.last.response;

import com.ctu.marketplace.dto.response.DomainResponseDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@AllArgsConstructor
@Data
public class NewFooterResponseDTO {
    private Long id;
    private String name;
    private DomainResponseDto domain;
    private List<NewFooterInfoResponseDTO> newFooterInfos;
}
