package com.ctu.marketplace.dto.last.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class NewFooterRequestDTO {
    private String name;
    private Long domainId;
    private List<NewFooterInfoRequestDTO> newFooterInfos;
}
