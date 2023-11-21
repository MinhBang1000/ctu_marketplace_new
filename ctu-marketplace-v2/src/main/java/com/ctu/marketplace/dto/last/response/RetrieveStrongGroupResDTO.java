package com.ctu.marketplace.dto.last.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RetrieveStrongGroupResDTO {
    private Long id;
    private String name;
    private String introduction;
    private String mission;
    private String vision;
    private String topic;
    private Long leaderId;
}
