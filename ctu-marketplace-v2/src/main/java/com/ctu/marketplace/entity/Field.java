package com.ctu.marketplace.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "field")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Field implements Serializable {
    @Id
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "child_of_field_id")
    @JsonBackReference
    private Field childOfFieldId;

    @OneToMany(mappedBy = "childOfFieldId")
    @JsonManagedReference
    private List<Field> childOfFieldList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "field", cascade = CascadeType.ALL)
    private List<ProjectField> projectFieldList = new ArrayList<>(); // sua

}
