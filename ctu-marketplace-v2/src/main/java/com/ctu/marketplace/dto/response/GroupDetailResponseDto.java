package com.ctu.marketplace.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupDetailResponseDto {
    private Long id;
    // private UserProfileResponseDto userProfile;
    private UserProfileResearchGroupResponseDto userProfile;
    //private ResearchGroupResponseDto researchGroup;
    private RoleOfGroupResponseDto roleOfGroup;
    private String fullName;
    private String email;
    private String avatar;
    private String bio;
    private String qualification;
    private String website;
}
