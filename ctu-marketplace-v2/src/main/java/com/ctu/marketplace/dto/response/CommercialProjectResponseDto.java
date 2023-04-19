package com.ctu.marketplace.dto.response;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CommercialProjectResponseDto extends ProjectResponseDto implements Serializable {
    private String process;
    private String advantage;
    private String scope;
    private String price;
    private List<ComDevLevelResponseDto> comDevLevelList;
    private List<ComTransMethodResponseDto> comTransMethodList;

}
