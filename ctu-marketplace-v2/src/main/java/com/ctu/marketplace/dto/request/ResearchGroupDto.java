package com.ctu.marketplace.dto.request;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResearchGroupDto implements Serializable {
    private String groupName;
    private String introduction;
    private String researchTopic;
    private String publication;
    private String shortDescription;
    private String groupImage;
    private Long userId; 
}
