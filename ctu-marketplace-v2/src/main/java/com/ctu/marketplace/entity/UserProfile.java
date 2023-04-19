package com.ctu.marketplace.entity;

import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_profile")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserProfile extends BaseEntity implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email")
    private String email;
    
    @Column(name = "dob")
    private Date dob;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "provider")
    private String provider;

    @Column(name = "is_enabled")
    private Boolean isEnabled;

    @Column(name = "is_locked")
    private Boolean isLocked;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "password_reset_code_id")
    @JsonIgnore
    private PasswordResetCode passwordResetCode;

    //Phan nay la thong tin khach
    @Column(name = "get_news")
    private Boolean getNews;

    //Phan nay la thong tin nha nghien cuu
    @Column(name = "qualification")
    private String qualification;

    @Column(name = "website")
    private String website;

    @Column(name = "bio")
    private String bio;

    //Phan nay la cac lien ket
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "domain_id")
    private Domain domain;

    @OneToMany(mappedBy = "approver")
    private List<Project> approverList;

    @OneToMany(mappedBy = "user")
    private List<Project> userList;

    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL)
    private List<UserFunction> userFunctionList = new ArrayList<>();

    @OneToMany(mappedBy = "userProfile")
    private List<ResearchGroup> researchGroupList;

    @OneToMany(mappedBy = "userProfile")
    private List<GroupDetail> groupDetailList;

   
}
