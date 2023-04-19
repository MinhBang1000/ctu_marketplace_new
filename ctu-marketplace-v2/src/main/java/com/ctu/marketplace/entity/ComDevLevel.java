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
@Table(name = "commercial_development_level")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComDevLevel implements Serializable{
    @EmbeddedId
    private ComDevLevelPK id = new ComDevLevelPK();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("devLevelId")
    @JoinColumn(name = "development_level_id")
    private DevLevel devLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("commercialProjectId")
    @JoinColumn(name = "commercial_project_id")
    private CommercialProject commercialProject;

    @Column(name = "note")
    private String note;

}
