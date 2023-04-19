package com.ctu.marketplace.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "commercial_transmission_method")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComTransMethod implements Serializable{
    @EmbeddedId
    private ComTransMethodPK id = new ComTransMethodPK();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("transMethodId")
    @JoinColumn(name = "transmission_method_id")
    private TransMethod transMethod;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("commercialProjectId")
    @JoinColumn(name = "commercial_project_id")
    private CommercialProject commercialProject;

    @Column(name = "note")
    private String note;

}
