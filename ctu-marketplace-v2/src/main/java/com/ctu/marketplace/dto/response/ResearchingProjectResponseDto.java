package com.ctu.marketplace.dto.response;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ResearchingProjectResponseDto extends ProjectResponseDto implements Serializable {
    private String challenge;
    private String solution;
    private String benefit;

}
