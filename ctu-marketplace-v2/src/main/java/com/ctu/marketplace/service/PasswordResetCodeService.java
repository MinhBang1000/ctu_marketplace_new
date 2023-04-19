package com.ctu.marketplace.service;

import com.ctu.marketplace.entity.PasswordResetCode;
import com.ctu.marketplace.entity.UserProfile;

public interface PasswordResetCodeService {
    public PasswordResetCode findById(Long id);
    public PasswordResetCode sendResetCodeEmail(String username);
    public boolean checkResetCode(String username, String code);
    public UserProfile updatePassword(String username,String password, String code);
}
