package com.ctu.marketplace.dto.last.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateStrongGroupReqDTO {
    private Long id;
    private String name;
    private String introduction;
    private String mission;
    private String vision;
    private String topic;
}
