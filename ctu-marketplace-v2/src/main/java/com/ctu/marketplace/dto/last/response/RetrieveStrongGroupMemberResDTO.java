package com.ctu.marketplace.dto.last.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RetrieveStrongGroupMemberResDTO {
    private Long id;
    private RetrieveStrongGroupResDTO strongGroup;
    private RetrieveMemberResDTO member;
    private String decision;
}
