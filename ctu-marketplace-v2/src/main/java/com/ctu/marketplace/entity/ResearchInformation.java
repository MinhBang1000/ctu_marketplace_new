package com.ctu.marketplace.entity;

import lombok.*;

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
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_profile_id", referencedColumnName = "id")
    private UserProfile userProfile;
    @OneToMany(mappedBy = "researchInformation", cascade = CascadeType.ALL)
    private List<Publication> publications = new ArrayList<>();
    @OneToMany(mappedBy = "researchInformation", cascade = CascadeType.ALL)
    private List<Skill> skills = new ArrayList<>();

    public ResearchInformation(Long id, String degree, String position, String institution, String department, UserProfile userProfile) {
        this.id = id;
        this.degree = degree;
        this.position = position;
        this.institution = institution;
        this.department = department;
        this.userProfile = userProfile;
    }

    public ResearchInformation(String degree, String position, String institution, String department, UserProfile userProfile) {
        this.degree = degree;
        this.position = position;
        this.institution = institution;
        this.department = department;
        this.userProfile = userProfile;
    }
}

