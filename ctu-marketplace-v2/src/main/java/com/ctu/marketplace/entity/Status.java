package com.ctu.marketplace.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "status")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Status implements Serializable{
    @Id
    private Long id;
    
    @Column(name = "code")
    private String code;
     
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "status")
    private List<Project> projectList;
    
}
