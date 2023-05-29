package com.ctu.marketplace.security.oauth2;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.UserPrincipal;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.exception.OAuth2AuthenticationProcessingException;
import com.ctu.marketplace.repository.UserProfileRepository;
import com.ctu.marketplace.security.oauth2.user.OAuth2UserInfo;
import com.ctu.marketplace.security.oauth2.user.OAuth2UserInfoFactory;
import com.ctu.marketplace.service.DomainService;
import com.ctu.marketplace.service.RoleService;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private UserProfileRepository userProfileRepository;
    @Autowired
    private RoleService roleService;
    @Autowired
    private DomainService domainService;
    @Value("${secret}")
    private String secret;
    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(
                oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if (oAuth2UserInfo.getEmail().isEmpty()) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }
        UserProfile user = null;
        Optional<UserProfile> userOptional = null;
        userOptional = userProfileRepository
                .findByUsernameAndProviderAndIsDeletedAndIsEnabledAndIsLocked(oAuth2UserInfo.getEmail(),
                        Constant.USER_PROVIDER_GOOGLE, false, true, false);
        if (userOptional.isPresent()) {
            user = userOptional.get();
            if (!user.getProvider().equals("google")) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
            if (user == null)
                throw new OAuth2AuthenticationProcessingException("Something went wrong!");
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
            if (user == null)
                throw new OAuth2AuthenticationProcessingException("Something went wrong!");
        }
        return new UserPrincipal(user);
    }

    private UserProfile registerNewUser(OAuth2UserRequest oAuth2UserRequest,
            OAuth2UserInfo oAuth2UserInfo) {
        UserProfile userProfile = new UserProfile();
        try {
            userProfile.setIsEnabled(true); // set default isEnabled false;
            userProfile.setIsLocked(false); // set default isEnabled false;
            userProfile.setIsDeleted(false); // set default isEnabled false;
            userProfile.setProvider(Constant.USER_PROVIDER_GOOGLE);
            userProfile.setUsername(oAuth2UserInfo.getEmail());
            userProfile.setEmail(oAuth2UserInfo.getEmail());
            // Setup password like this
            userProfile.setPassword(encoder.encode(secret + oAuth2UserInfo.getEmail()));
            userProfile.setFullName(oAuth2UserInfo.getName());
            // fix there for avatar name --> fix in front end
            userProfile.setAvatar(oAuth2UserInfo.getImageUrl());
            String email = oAuth2UserInfo.getEmail();
            int length = email.length();
            int idx = email.indexOf('@');
            String sub = email.substring(idx,length);
            // Edit overhere --> CTU Researcher
            if (sub.equals("@cit.ctu.edu.vn") || sub.equals("@ctu.edu.vn")) {
                userProfile.setRole(roleService.getById(Constant.ROLE_RESEARCHER_ID));
                userProfile.setDomain(domainService.getById(Constant.DOMAIN_KHC_ID));
            }else {
                userProfile.setRole(roleService.getById(Constant.ROLE_GUEST_ID));
                userProfile.setDomain(domainService.getById(Constant.DOMAIN_KHC_ID));
            }
            return userProfileRepository.save(userProfile); // Guest
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private UserProfile updateExistingUser(UserProfile existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setFullName(oAuth2UserInfo.getName());
        //  fix there for avatar name
//        existingUser.setAvatar(oAuth2UserInfo.getImageUrl());
        return userProfileRepository.save(existingUser);
    }

}
