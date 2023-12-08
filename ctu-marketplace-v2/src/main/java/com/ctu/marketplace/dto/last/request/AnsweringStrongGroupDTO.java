package com.ctu.marketplace.dto.last.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnsweringStrongGroupDTO {
    private Long invitationId;
    private String decision;
}
