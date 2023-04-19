package com.ctu.marketplace.dto.request;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ResearchingProjectDto extends ProjectDto implements Serializable {
    @NotBlank
    private String challenge;
    @NotBlank
    private String solution;
    @NotBlank
    private String benefit;

}
