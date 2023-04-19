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
public class IdeaProjectDto extends ProjectDto implements Serializable {
    @NotBlank
    private String description;
    @NotBlank
    private String scope;
}
