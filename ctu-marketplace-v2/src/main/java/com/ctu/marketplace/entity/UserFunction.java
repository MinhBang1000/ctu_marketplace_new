package com.ctu.marketplace.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_function")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFunction implements Serializable{
    @EmbeddedId
    private UserFunctionPK id = new UserFunctionPK();

    @Column(name = "is_enabled")
    private Boolean isEnabled;

    @ManyToOne
    @MapsId("userProfileId")
    @JoinColumn(name = "user_profile_id")
    private UserProfile userProfile;

    @ManyToOne
    @MapsId("functionId")
    @JoinColumn(name = "function_id")
    private Function function;
}
