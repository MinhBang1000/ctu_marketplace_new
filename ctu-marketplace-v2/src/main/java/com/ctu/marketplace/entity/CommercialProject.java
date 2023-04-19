package com.ctu.marketplace.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "commercial_project")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class CommercialProject extends Project {

    @Column(name = "process")
    private String process;

    @Column(name = "advantage")
    private String advantage;

    @Column(name = "scope")
    private String scope;

    @Column(name = "price")
    private String price;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "commercialProject", cascade = CascadeType.ALL)
    private List<ComTransMethod> comTransMethodList = new ArrayList<>(); // sua

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "commercialProject", cascade = CascadeType.ALL)
    private List<ComDevLevel> comDevLevelList = new ArrayList<>(); // sua

}
