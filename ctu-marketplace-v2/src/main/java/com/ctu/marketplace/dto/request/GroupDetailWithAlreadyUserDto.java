package com.ctu.marketplace.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupDetailWithAlreadyUserDto {
    private Long researchGroupId;
    private String username;
    private Long roleOfGroupId;
}
