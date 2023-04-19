package com.ctu.marketplace.service;

public interface EmailService {
    public boolean sendNotificationMessage(String to, String title, String content,String... cc);
    public boolean sendEmail(String to, String title, String content);
}
