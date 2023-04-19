package com.ctu.marketplace.dto.response;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResearchGroupResponseDto implements Serializable {
    private Long id;
    private String groupName;
    private String introduction;
    private String researchTopic;
    private String publication;
    private String shortDescription;
    private String groupImage;
    // private UserProfileResponseDto userProfile;
    private UserProfileResearchGroupResponseDto userProfile;
    private List<GroupDetailResponseDto> groupDetailList;
}
