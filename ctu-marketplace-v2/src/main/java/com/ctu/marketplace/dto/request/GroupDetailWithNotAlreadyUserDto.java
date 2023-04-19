package com.ctu.marketplace.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupDetailWithNotAlreadyUserDto {
    private Long researchGroupId;
    private Long roleOfGroupId;
    private String fullName;
    private String email;
    private String avatar;
    private String bio;
    private String qualification;
    private String website;
}
