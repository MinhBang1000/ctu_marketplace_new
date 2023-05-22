package com.ctu.marketplace.service.impl;

import java.time.Instant;
import java.util.Date;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.entity.PasswordResetCode;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.exception.GlobalException;
import com.ctu.marketplace.repository.PasswordResetCodeRepository;
import com.ctu.marketplace.repository.UserProfileRepository;
import com.ctu.marketplace.service.EmailService;
import com.ctu.marketplace.service.PasswordResetCodeService;

@Service
@Transactional
public class PasswordResetCodeServiceImpl implements PasswordResetCodeService {

    @Autowired
    private PasswordResetCodeRepository passwordResetCodeRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private static final Logger LOGGER = LogManager.getLogger(PasswordResetCodeServiceImpl.class);

    @Override
    public PasswordResetCode findById(Long id) {
        try {
            return passwordResetCodeRepository.findOneById(id);
        } catch (Exception e) {
            LOGGER.error("Could not get reset code: ", e);
            return null;
        }
    }

    @Override
    public PasswordResetCode sendResetCodeEmail(String username) {
        try {
            UserProfile userProfile = userProfileRepository.findByUsername(username).orElse(null);
            if (userProfile == null) {
                throw new GlobalException(Constant.STATUS_CODE_400, "Người dùng không tồn tại!");
            }
            String code = generate();
            Date date = DateUtils.addMinutes(Date.from(Instant.now()), 10);
            PasswordResetCode passwordResetCode = null;
            if (userProfile.getPasswordResetCode() == null) {
                passwordResetCode = new PasswordResetCode();
            } else {
                passwordResetCode = userProfile.getPasswordResetCode();
            }
            passwordResetCode.setExpiryDate(date);
            passwordResetCode.setResetCode(code);
            userProfile.setPasswordResetCode(passwordResetCode);
            userProfileRepository.save(userProfile);

            String content = "<h2 style='text-align: center'>Khôi phục mật khẩu</h2><p>Xin chào,</p><p>Chúng tôi đã nhận được yêu cầu khôi phục mật khẩu của bạn thông qua username mà bạn đã cung cấp. Mã xác nhận của bạn là: </p><h1 style='text-align: center; color: red; font-family: consolas; margin:0'>"
                    + code
                    + "</h1><p style='text-align: center;'>(Mã xác nhận có hiệu lực trong vòng 10 phút) </p><p>Vui lòng không cung cấp mã xác nhận cho bất kỳ ai vì lí do bảo mật!</p><p>Trân trọng, <br>System Admin.</p>";

            emailService.sendNotificationMessage(userProfile.getEmail(),"[CTU-MARKETPLACE] Thay đổi mật khẩu người dùng!", content);
            return passwordResetCode;
        } catch (Exception e) {
            throw new GlobalException(Constant.STATUS_CODE_400, e.getMessage());
        }
    }

    private static String generate() {
        return RandomStringUtils.randomAlphabetic(6, 6);
    }

    @Override
    public boolean checkResetCode(String username, String code) {
        UserProfile userProfile = userProfileRepository.findByUsername(username).orElse(null);
        Date currentTime = Date.from(Instant.now());
        if (userProfile.getPasswordResetCode() == null) {
            return false;
        }
        return code.equals(userProfile.getPasswordResetCode().getResetCode())
                && currentTime.before(userProfile.getPasswordResetCode().getExpiryDate());
    }

    @Override
    public UserProfile updatePassword(String username, String password, String code) {
        boolean isValid = checkResetCode(username, code);
        if (isValid) {
            UserProfile userProfile = userProfileRepository
                    .findByUsernameAndProviderAndIsDeletedAndIsEnabledAndIsLocked(username,
                            Constant.USER_PROVIDER_LOCAL,
                            false, true,
                            false)
                    .orElse(null);
            if (userProfile == null) {
                throw new GlobalException(Constant.STATUS_CODE_400, "Không thể đổi mật khẩu!");
            }
            PasswordResetCode passwordResetCode = userProfile.getPasswordResetCode();
            passwordResetCode.setResetCode(null);
            passwordResetCode.setExpiryDate(null);
            userProfile.setPassword(bCryptPasswordEncoder.encode(password));
            userProfile.setPasswordResetCode(passwordResetCode);
            return userProfileRepository.save(userProfile);
        } else {
            throw new GlobalException(Constant.STATUS_CODE_400, "Không thể đổi mật khẩu!");
        }
    }
}
