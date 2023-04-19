package com.ctu.marketplace.service.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.UserPrincipal;
import com.ctu.marketplace.dto.request.CreateUserProfileAdminDto;
import com.ctu.marketplace.dto.request.CreateUserProfileGuestDto;
import com.ctu.marketplace.dto.request.CreateUserProfileResearcherByAdminDto;
import com.ctu.marketplace.dto.request.CreateUserProfileResearcherDto;
import com.ctu.marketplace.dto.request.PasswordDto;
import com.ctu.marketplace.dto.request.UpdateUserProfileAdminDto;
import com.ctu.marketplace.dto.request.UpdateUserProfileGuestDto;
import com.ctu.marketplace.dto.request.UpdateUserProfileResearcherByAdminDto;
import com.ctu.marketplace.dto.request.UpdateUserProfileResearcherDto;
import com.ctu.marketplace.entity.Function;
import com.ctu.marketplace.entity.PasswordResetCode;
import com.ctu.marketplace.entity.UserFunction;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.UserProfileRepository;
import com.ctu.marketplace.service.DomainService;
import com.ctu.marketplace.service.FunctionService;
import com.ctu.marketplace.service.RoleService;
import com.ctu.marketplace.service.UserFunctionService;
import com.ctu.marketplace.service.UserProfileService;

@Service
@Transactional
public class UserProfileServiceImpl implements UserProfileService {
    @Autowired
    private UserProfileRepository userProfileRepository;
    @Autowired
    private DomainService domainService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private UserFunctionService userFunctionService;
    @Autowired
    private FunctionService functionService;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            Optional<UserProfile> userProfile = userProfileRepository
                    .findByUsernameAndProviderAndIsDeletedAndIsEnabledAndIsLocked(username,
                            Constant.USER_PROVIDER_LOCAL, false, true,
                            false);
            if (!userProfile.isPresent())
                throw new UsernameNotFoundException(username);
            UserPrincipal userDetailDto = new UserPrincipal(userProfile.get());
            return new User(userDetailDto.getUsername(), userDetailDto.getPassword(), userDetailDto.getAuthorities());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username, String provider) {
        try {
            Optional<UserProfile> userProfile = userProfileRepository
                    .findByUsernameAndProviderAndIsDeletedAndIsEnabledAndIsLocked(username, provider, false, true,
                            false);
            if (!userProfile.isPresent())
                throw new UsernameNotFoundException(username);
            UserPrincipal userDetailDto = new UserPrincipal(userProfile.get());
            return new User(userDetailDto.getUsername(), userDetailDto.getPassword(), userDetailDto.getAuthorities());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<UserProfile> getAll(Long id) {
        UserProfile userProfile = userProfileRepository.findByIdAndIsDeletedAndIsEnabledAndIsLocked(id, false, true,
                false).orElse(null);
        List<UserProfile> userProfiles = new ArrayList<>();
        if (userProfile == null)
            return userProfiles;
        if (userProfile.getRole().getId() == Constant.ROLE_SUPER_ADMIN_ID)
            userProfiles = userProfileRepository.findAllByIsDeleted(false);
        if (userProfile.getRole().getId() == Constant.ROLE_ADMIN_ID) {
            userProfiles = userProfileRepository.findAllByDomainId(userProfile.getDomain().getId());
        }
        return userProfiles;
    }

    @Override
    public UserProfile getById(Long id) {
        return userProfileRepository.findByIdAndIsDeletedAndIsEnabledAndIsLocked(id, false, true,
                false).orElse(null);
    }

    @Override
    public List<UserProfile> getUserFunctionByRoleId(Long roleId) {
        return userProfileRepository.findAllByRoleId(roleId);
    }

    @Override
    public UserProfile getByUsername(String username) {
        return userProfileRepository
                .findByUsernameAndIsDeletedAndIsEnabledAndIsLocked(username,
                        false, true,
                        false)
                .orElse(null);
    }

    @Override
    public UserProfile createGuest(CreateUserProfileGuestDto createUserProfileGuestDto) {
        try {
            UserProfile findUserProfileGuest = userProfileRepository
                    .findByUsername(createUserProfileGuestDto.getUsername()).orElse(null);
            if (findUserProfileGuest != null)
                return null;
            UserProfile userProfileGuest = new UserProfile();
            mapper.map(createUserProfileGuestDto, userProfileGuest);
            userProfileGuest.setPassword(bCryptPasswordEncoder.encode(createUserProfileGuestDto.getPassword()));
            userProfileGuest.setProvider(Constant.USER_PROVIDER_LOCAL);
            userProfileGuest.setIsEnabled(true); // set default isEnabled true;
            userProfileGuest.setIsLocked(false); // set default isLocked false;
            userProfileGuest.setIsDeleted(false); // set default isDeleted false;
            userProfileGuest.setRole(roleService.getById(Constant.ROLE_GUEST_ID)); // 104L KHC
            userProfileGuest.setDomain(domainService.getById(Constant.DOMAIN_KHC_ID)); // 999L KHC
            return userProfileRepository.save(userProfileGuest);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public UserProfile createResearcher(CreateUserProfileResearcherDto createUserProfileResearcherDto) {
        try {
            UserProfile findUserProfileResearcher = userProfileRepository
                    .findByUsername(createUserProfileResearcherDto.getUsername()).orElse(null);
            if (findUserProfileResearcher != null)
                return null;
            UserProfile userProfileResearcher = new UserProfile();
            mapper.map(createUserProfileResearcherDto, userProfileResearcher);
            userProfileResearcher.setProvider(Constant.USER_PROVIDER_LOCAL);
            userProfileResearcher
                    .setPassword(bCryptPasswordEncoder.encode(createUserProfileResearcherDto.getPassword()));
            userProfileResearcher.setIsEnabled(false); // set default isEnabled false;
            userProfileResearcher.setIsLocked(false); // set default isEnabled false;
            userProfileResearcher.setIsDeleted(false); // set default isEnabled false;
            userProfileResearcher.setDomain(domainService.getById(Constant.DOMAIN_KHC_ID));
            userProfileResearcher.setRole(roleService.getById(Constant.ROLE_RESEARCHER_ID));
            return userProfileRepository.save(userProfileResearcher);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public UserProfile createResearcherByAdmin(
            CreateUserProfileResearcherByAdminDto createUserProfileResearcherByAdminDto) {
        try {
            UserProfile findUserProfileResearcher = userProfileRepository
                    .findByUsername(createUserProfileResearcherByAdminDto.getUsername()).orElse(null);
            if (findUserProfileResearcher != null)
                return null;
            UserProfile userProfileResearcher = new UserProfile();
            mapper.map(createUserProfileResearcherByAdminDto, userProfileResearcher);
            userProfileResearcher.setProvider(Constant.USER_PROVIDER_LOCAL);
            userProfileResearcher
                    .setPassword(bCryptPasswordEncoder.encode(createUserProfileResearcherByAdminDto.getPassword()));
            userProfileResearcher
                    .setDomain(domainService.getById(createUserProfileResearcherByAdminDto.getDomainId()));
            userProfileResearcher.setRole(roleService.getById(Constant.ROLE_RESEARCHER_ID));
            userProfileResearcher.setIsEnabled(true);
            userProfileResearcher.setIsLocked(false);
            userProfileResearcher.setIsDeleted(false);
            return userProfileRepository.save(userProfileResearcher);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public UserProfile createAdmin(CreateUserProfileAdminDto createUserProfileAdminDto) {
        try {
            UserProfile findUserProfileAdmin = userProfileRepository
                    .findByUsername(createUserProfileAdminDto.getUsername()).orElse(null);
            if (findUserProfileAdmin != null)
                return null;
            UserProfile userProfileAdmin = new UserProfile();
            mapper.map(createUserProfileAdminDto, userProfileAdmin);
            userProfileAdmin.setProvider(Constant.USER_PROVIDER_LOCAL);
            userProfileAdmin.setPassword(bCryptPasswordEncoder.encode(createUserProfileAdminDto.getPassword()));
            userProfileAdmin.setRole(roleService.getById(Constant.ROLE_ADMIN_ID));
            userProfileAdmin.setDomain(domainService.getById(createUserProfileAdminDto.getDomainId()));
            userProfileAdmin.setIsEnabled(true);
            userProfileAdmin.setIsLocked(false);
            userProfileAdmin.setIsDeleted(false);
            UserProfile created = userProfileRepository.save(userProfileAdmin);
            userFunctionService.setDefaultForUserProfile(created.getId());
            return created;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public UserProfile updateGuest(Long id, UpdateUserProfileGuestDto updateUserProfileGuestDto) {
        try {
            UserProfile userProfileGuest = userProfileRepository.findById(id).orElse(null);
            if (userProfileGuest == null)
                return null;
            mapper.map(updateUserProfileGuestDto, userProfileGuest);
            return userProfileRepository.save(userProfileGuest);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public UserProfile updateResearcher(Long id,
            UpdateUserProfileResearcherDto updateUserProfileResearcherDto) {
        try {
            UserProfile userProfileResearcher = userProfileRepository.findById(id).orElse(null);
            if (userProfileResearcher == null)
                return null;
            mapper.map(updateUserProfileResearcherDto, userProfileResearcher);
            return userProfileRepository.save(userProfileResearcher);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public UserProfile updateResearcherByAdmin(Long id,
            UpdateUserProfileResearcherByAdminDto updateUserProfileResearcherByAdminDto) {
        try {
            UserProfile userProfileResearcher = userProfileRepository.findById(id).orElse(null);
            if (userProfileResearcher == null)
                return null;
            String oldPass = userProfileResearcher.getPassword();
            mapper.map(updateUserProfileResearcherByAdminDto, userProfileResearcher);
            if (updateUserProfileResearcherByAdminDto.getPassword().length() == 0) {
                userProfileResearcher.setPassword(oldPass);
            } else {
                userProfileResearcher
                        .setPassword(bCryptPasswordEncoder.encode(updateUserProfileResearcherByAdminDto.getPassword()));
            }
            userProfileResearcher.setUsername(updateUserProfileResearcherByAdminDto.getUsername());
            userProfileResearcher
                    .setDomain(domainService.getById(updateUserProfileResearcherByAdminDto.getDomainId()));
            return userProfileRepository.save(userProfileResearcher);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public UserProfile updateAdmin(Long id, UpdateUserProfileAdminDto updateUserProfileAdminDto) {
        try {
            UserProfile userProfileAdmin = userProfileRepository.findById(id).orElse(null);
            if (userProfileAdmin == null)
                return null;
            String oldPass = userProfileAdmin.getPassword();
            mapper.map(updateUserProfileAdminDto, userProfileAdmin);

            if (updateUserProfileAdminDto.getPassword().length() == 0) {
                userProfileAdmin.setPassword(oldPass);
            } else {
                userProfileAdmin
                        .setPassword(bCryptPasswordEncoder.encode(updateUserProfileAdminDto.getPassword()));
            }
            userProfileAdmin.setUsername(updateUserProfileAdminDto.getUsername());
            userProfileAdmin.setDomain(domainService.getById(updateUserProfileAdminDto.getDomainId()));            List<UserFunction> userFunctions = null;
            List<Function> functions = functionService.getAllByRoleId(updateUserProfileAdminDto.getRoleId());
            if (userProfileAdmin.getRole().getId() != updateUserProfileAdminDto.getRoleId()) {
                if (updateUserProfileAdminDto.getRoleId() == Constant.ROLE_ADMIN_ID) {
                    userFunctions = functions.stream().map(function ->{
                        UserFunction userFunction = new UserFunction();
                        userFunction.setFunction(function);
                        userFunction.setUserProfile(userProfileAdmin);
                        userFunction.setIsEnabled(false);
                        return userFunction;
                    }).collect(Collectors.toList());
                }else{
                    userFunctionService.deleteUserFunctionByUserProfileId(userProfileAdmin.getId());
                }
            }
            userProfileAdmin.setRole(roleService.getById(updateUserProfileAdminDto.getRoleId()));
            userProfileAdmin.setUserFunctionList(userFunctions);
            return userProfileRepository.save(userProfileAdmin);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean updatePassword(String username, String password) {
        try {
            UserProfile userProfile = userProfileRepository
                    .findByUsernameAndIsDeletedAndIsEnabledAndIsLocked(username,
                            false, true,
                            false)
                    .orElse(null);
            if (userProfile == null)
                return false;
            userProfile.setPassword(bCryptPasswordEncoder.encode(password));
            userProfileRepository.save(userProfile);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean deleteByUsername(String username) {
        try {
            UserProfile userProfile = userProfileRepository
                    .findByUsername(username).orElse(null);
            if (userProfile == null)
                return false;
            userProfile.setIsDeleted(true);
            userProfileRepository.save(userProfile);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean enableAccount(Long id, Boolean isEnabled) {
        try {
            UserProfile userProfile = userProfileRepository
                    .findByIdAndIsDeleted(id, false).orElse(null);
            if (userProfile == null)
                return false;
            userProfileRepository.enableAccount(userProfile.getId(), isEnabled);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean lockAccount(Long id, Boolean isLocked) {
        try {
            UserProfile userProfile = userProfileRepository
                    .findByIdAndIsDeleted(id, false).orElse(null);
            if (userProfile == null)
                return false;
            userProfileRepository.lockAccount(userProfile.getId(), isLocked);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean sendCodeToEmail(String username) {
        try {
            if (username == "superadmin")
                return false;
            UserProfile userProfile = userProfileRepository
                    .findByUsernameAndProviderAndIsDeletedAndIsEnabledAndIsLocked(username, "local",
                            false, true,
                            false)
                    .orElse(null);
            if (userProfile == null)
                return false;
            PasswordResetCode passwordResetCode = new PasswordResetCode();
            Calendar cal = Calendar.getInstance();
            cal.setTime(new Date());
            cal.add(Calendar.SECOND, 120);
            passwordResetCode.setExpiryDate(cal.getTime());
            passwordResetCode.setResetCode("" + (new Random().ints(100000, 999999).findFirst().getAsInt()));
            passwordResetCode.setUserProfile(userProfile);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<UserProfile> getAllResearcher() {
        return userProfileRepository.findAllResearcher();
    }

    @Override
    public List<UserProfile> getAllByRoleId(Long roleId) {
        return userProfileRepository.findAllByRoleId(roleId);
    }

    @Override
    public List<UserProfile> getAllUserAdminByDomainId(Long domainId) {
        return userProfileRepository.findAllUserAdminByDomainId(domainId);
    }

    @Override
    public UserProfile updatePassword(Long userId, PasswordDto passwordDto) {
        try {
            UserProfile userProfile = userProfileRepository
                    .findByIdAndIsDeletedAndIsEnabledAndIsLocked(userId, false, true, false).orElse(null);
            if (userProfile == null) {
                return null;
            }
            if (bCryptPasswordEncoder.matches(passwordDto.getOldPassword(), userProfile.getPassword())) {
                userProfile.setPassword(bCryptPasswordEncoder.encode(passwordDto.getNewPassword()));
            } else {
                return null;
            }
            return userProfileRepository.save(userProfile);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
