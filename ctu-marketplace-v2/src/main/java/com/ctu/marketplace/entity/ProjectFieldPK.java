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
public class ProjectFieldPK implements Serializable{
    @Column(name = "field_id")
    private Long fieldId;
    
    @Column(name = "project_id")
    private Long projectId; 

}
