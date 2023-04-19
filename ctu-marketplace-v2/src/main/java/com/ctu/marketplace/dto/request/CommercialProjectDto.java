package com.ctu.marketplace.dto.request;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CommercialProjectDto extends ProjectDto implements Serializable {
    @NotBlank
    private String process;
    @NotBlank
    private String advantage;
    @NotBlank
    private String scope;
    private String price;
    @NotEmpty
    private List<ComDevLevelDto> comDevLevelList;
    @NotEmpty
    private List<ComTransMethodDto> comTransMethodList;

}
