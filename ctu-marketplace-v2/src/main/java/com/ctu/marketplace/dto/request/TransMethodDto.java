package com.ctu.marketplace.dto.request;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransMethodDto implements Serializable{
    private Long id;
    private String code;
    private String name;
}
