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

    @Column(name = "decision", columnDefinition = "VARCHAR(60) CHECK (decision IN ('ACCEPT', 'PENDING', 'DENIED'))")
    private String decision;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private UserProfile member;

    @ManyToOne
    @JoinColumn(name = "strong_group_id", nullable = false)
    private StrongGroup strongGroup;
}
