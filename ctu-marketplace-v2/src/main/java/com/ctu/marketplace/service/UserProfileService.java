package com.ctu.marketplace.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.ctu.marketplace.dto.request.CreateUserProfileAdminDto;
import com.ctu.marketplace.dto.request.CreateUserProfileGuestDto;
import com.ctu.marketplace.dto.request.CreateUserProfileResearcherByAdminDto;
import com.ctu.marketplace.dto.request.CreateUserProfileResearcherDto;
import com.ctu.marketplace.dto.request.PasswordDto;
import com.ctu.marketplace.dto.request.UpdateUserProfileAdminDto;
import com.ctu.marketplace.dto.request.UpdateUserProfileGuestDto;
import com.ctu.marketplace.dto.request.UpdateUserProfileResearcherByAdminDto;
import com.ctu.marketplace.dto.request.UpdateUserProfileResearcherDto;
import com.ctu.marketplace.entity.UserProfile;

public interface UserProfileService extends UserDetailsService {
    List<UserProfile> getAll(Long userId);

    List<UserProfile> getAllResearcher();

    List<UserProfile> getAllByRoleId(Long roleId);

    List<UserProfile> getUserFunctionByRoleId(Long roleId);

    List<UserProfile> getAllUserAdminByDomainId(Long domainId);

    UserProfile getById(Long userId);

    UserProfile getByUsername(String username);

    UserDetails loadUserByUsername(String username, String provider);

    UserProfile createGuest(CreateUserProfileGuestDto createUserProfileGuestDto);

    UserProfile createResearcher(CreateUserProfileResearcherDto createUserProfileResearcherDto);

    UserProfile createResearcherByAdmin(CreateUserProfileResearcherByAdminDto createUserProfileResearcherByAdminDto);

    UserProfile createAdmin(CreateUserProfileAdminDto createUserProfileAdminDto);

    UserProfile updateGuest(Long userId, UpdateUserProfileGuestDto updateUserProfileGuestDto);

    UserProfile updateResearcher(Long userId, UpdateUserProfileResearcherDto updateUserProfileResearcherDto);

    UserProfile updateResearcherByAdmin(Long userId, UpdateUserProfileResearcherByAdminDto updateUserProfileResearcherDto);

    UserProfile updateAdmin(Long userId, UpdateUserProfileAdminDto updateUserProfileAdminDto);

    boolean updatePassword(String username, String password);

    boolean enableAccount(Long userId, Boolean isEnabled);

    boolean lockAccount(Long userId, Boolean isLocked);

    boolean deleteByUsername(String username);

    boolean sendCodeToEmail(String username);

    UserProfile updatePassword(Long userId, PasswordDto passwordDto);

}
