package com.ctu.marketplace.dto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.ctu.marketplace.entity.UserProfile;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class UserPrincipal implements UserDetails, OAuth2User {

    private UserProfile userProfile;
    private Map<String, Object> attributes;

    public UserPrincipal(UserProfile userProfile, Map<String, Object> attributes ) {
        this.userProfile = userProfile;
        this.attributes = attributes;
    }
    public UserPrincipal(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> grantedAuthorityList = new ArrayList<GrantedAuthority>();
		GrantedAuthority auth = new SimpleGrantedAuthority(userProfile.getRole().getCode());
		grantedAuthorityList.add(auth);
        return grantedAuthorityList; 
    }

    public Long getId() {
        return this.userProfile.getId();
    }

    @Override
    public String getPassword() {
        return this.userProfile.getPassword();
    }

    @Override
    public String getUsername() {
     return this.userProfile.getUsername();
    }
    
    // @Override
    // public String getUsername() {
    //  return this.userProfile.getExternalAccount();
    // }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !this.userProfile.getIsLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.userProfile.getIsEnabled();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    // public void setAttributes(Map<String, Object> attributes) {
    //     this.attributes = attributes;
    // }

    @Override
    public String getName() {
        return String.valueOf(userProfile.getId());
    }

}
