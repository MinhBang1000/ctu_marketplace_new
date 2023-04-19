package com.ctu.marketplace.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "password_reset_code")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordResetCode {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(name="reset_code")
    private String resetCode;

    @Column(name="expiry_date")
    private Date expiryDate;
 
    @OneToOne(mappedBy = "passwordResetCode")
    private UserProfile userProfile;
 

}
