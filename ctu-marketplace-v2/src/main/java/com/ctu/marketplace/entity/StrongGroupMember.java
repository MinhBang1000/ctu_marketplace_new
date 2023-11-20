package com.ctu.marketplace.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class StrongGroupMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "decision")
    private Boolean decision;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private UserProfile member;

    @ManyToOne
    @JoinColumn(name = "strong_group_id", nullable = false)
    private StrongGroup strongGroup;
}
