package com.ctu.marketplace.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "group_detail")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GroupDetail {
    // @EmbeddedId
    // private GroupDetailPK id;

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long id;

    // @Column(name = "role_in_group")
    // private String roleInGroup;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "bio")
    private String bio;

    @Column(name = "qualification")
    private String qualification;

    @Column(name = "website")
    private String website;

    @ManyToOne
    @JoinColumn(name = "research_group_id")
    private ResearchGroup researchGroup;

    @ManyToOne
    @JoinColumn(name = "user_profile_id")
    private UserProfile userProfile;



    @ManyToOne
    @JoinColumn(name = "role_of_group_id")
    private RoleOfGroup roleOfGroup;

    // @ManyToOne
    // @MapsId("userProfileId")
    // @JoinColumn(name = "user_profile_id")
    // private UserProfile userProfile;

    // @ManyToOne
    // @MapsId("functionId")
    // @JoinColumn(name = "research_group_id")
    // private ResearchGroup researchGroup;


}
