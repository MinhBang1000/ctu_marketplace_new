package com.ctu.marketplace.dto.last.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AskingStrongGroupDTO {
    private Long memberId;
    private Long strongGroupId;
}
