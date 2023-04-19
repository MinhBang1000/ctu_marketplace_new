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
public class ComDevLevelPK implements Serializable{
    @Column(name = "development_level_id")
    private Long devLevelId;
    
    @Column(name = "commercial_project_id")
    private Long commercialProjectId; 
}
