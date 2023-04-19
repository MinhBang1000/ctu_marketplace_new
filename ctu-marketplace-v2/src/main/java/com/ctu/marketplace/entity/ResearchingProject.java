package com.ctu.marketplace.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "researching_project")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ResearchingProject extends Project{

    @Column(name = "challenge")
    private String challenge;

    @Column(name = "solution")
    private String solution;

    @Column(name = "benefit")
    private String benefit;
    
}
