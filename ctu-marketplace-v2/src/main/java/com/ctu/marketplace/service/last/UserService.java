package com.ctu.marketplace.service.last;

import com.ctu.marketplace.dto.last.request.UserProfileDTO;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UserService {
    @Autowired
    private UserProfileRepository userProfileRepository;

    public UserProfile updateAvatar(String imageName, String username) throws NoSuchElementException {
        UserProfile user = this.userProfileRepository.findByUsername(username).get();
        user.setAvatar(imageName);
        return this.userProfileRepository.save(user);
    }

    public UserProfile updateInformations(UserProfileDTO userProfileDTO, String username) {
        UserProfile user = this.userProfileRepository.findByUsername(username).get();
        user.setFullName(userProfileDTO.getFullName().isEmpty() || userProfileDTO.getFullName() == null ? user.getFullName() : userProfileDTO.getFullName());
        user.setAddress(userProfileDTO.getAddress().isEmpty() || userProfileDTO.getAddress() == null ? user.getAddress() : userProfileDTO.getAddress());
        user.setEmail(userProfileDTO.getEmail().isEmpty() || userProfileDTO.getEmail() == null ? user.getEmail() : userProfileDTO.getEmail());
        user.setPhoneNumber(userProfileDTO.getPhoneNumber().isEmpty() || userProfileDTO.getPhoneNumber() == null ? user.getPhoneNumber() : userProfileDTO.getPhoneNumber());
        user.setDob(userProfileDTO.getDob() == null ? user.getDob() : userProfileDTO.getDob());
        user.setGender(userProfileDTO.getGender() == null ? user.getGender() : userProfileDTO.getGender());
        return this.userProfileRepository.save(user);
    }
}
