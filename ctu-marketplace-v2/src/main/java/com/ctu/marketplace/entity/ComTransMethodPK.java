package com.ctu.marketplace.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ComTransMethodPK implements Serializable{
    @Column(name = "transmission_method_id")
    private Long transMethodId;
    
    @Column(name = "commercial_project_id")
    private Long commercialProjectId; 
}
