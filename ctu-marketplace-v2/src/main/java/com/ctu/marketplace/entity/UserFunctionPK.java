package com.ctu.marketplace.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class UserFunctionPK implements Serializable {
    @Column(name = "user_profile_id")
    private Long userProfileId;
    
    @Column(name = "function_id")
    private Long functionId; 
}
