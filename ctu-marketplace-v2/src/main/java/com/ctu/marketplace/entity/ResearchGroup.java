package com.ctu.marketplace.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "research_group")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ResearchGroup extends BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long id;
     
    @Column(name = "group_name")
    private String groupName;

    @Column(name = "introduction")
    private String introduction;

    @Column(name = "research_topic")
    private String researchTopic;

    @Column(name = "publication")
    private String publication;

    @Column(name = "short_description")
    private String shortDescription;

    @Column(name = "group_image")
    private String groupImage;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;

    @OneToMany(mappedBy = "researchGroup")
    private List<GroupDetail> groupDetailList;

}
