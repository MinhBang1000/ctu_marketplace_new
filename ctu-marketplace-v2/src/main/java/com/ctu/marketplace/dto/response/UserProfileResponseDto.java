package com.ctu.marketplace.dto.response;

import java.sql.Date;
import java.util.List;

import com.ctu.marketplace.dto.request.DomainDto;
import com.ctu.marketplace.dto.request.RoleDto;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserProfileResponseDto extends BaseResponse {
    private Long id;
    private String avatar;
    private String fullName;
    private String email;
    private Date dob;
    private String phoneNumber;
    private String address;
    private Integer gender;
    private String username;
    @JsonIgnore
    private String password;
    private Boolean isEnabled;
    private Boolean isLocked;
    private Boolean getNews;
    private String qualification;
    private String website;
    private String bio;
    private RoleDto role;
    private DomainDto domain;
    private String provider;
    private List<UserFunctionResponseDto> userFunctionList;

}
