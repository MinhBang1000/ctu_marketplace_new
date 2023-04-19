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
public class IdeaProjectResponseDto extends ProjectResponseDto implements Serializable {
    private String description;
    private String scope;
}
