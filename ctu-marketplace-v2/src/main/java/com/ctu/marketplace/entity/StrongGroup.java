package com.ctu.marketplace.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class StrongGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "introduction")
    private String introduction;

    @Column(name = "mission")
    private String mission;

    @Column(name = "vision")
    private String vision;

    @Column(name = "topic")
    private String topic;

    @ManyToOne
    private UserProfile userProfile;

    @OneToMany(mappedBy = "strongGroup", cascade = CascadeType.ALL)
    private List<StrongGroupMember> members = new ArrayList<>();
}
