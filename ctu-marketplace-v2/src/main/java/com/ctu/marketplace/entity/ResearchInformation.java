package com.ctu.marketplace.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class ResearchInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "degree")
    private String degree;

    @Column(name = "position")
    private String position;

    @Column(name = "institution")
    private String institution;

    @Column(name = "department")
    private String department;

    @OneToOne(mappedBy = "researchInformation")
    private UserProfile userProfile;

    @OneToMany(mappedBy = "researchInformation", cascade = CascadeType.ALL)
    private List<Publication> publications = new ArrayList<>();

    @OneToMany(mappedBy = "researchInformation", cascade = CascadeType.ALL)
    private List<Skill> skills = new ArrayList<>();

}
