package com.ctu.marketplace.service.impl;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender emailSender;

    @Value("${email}")
    private String email;

    @Override
    public boolean sendNotificationMessage(String to, String title, String content, String... cc) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
//            message.setContent(content, "text/html; charset=utf-8");
//            MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
//            helper.setTo(to);
//            helper.setCc(cc);
//            helper.setSubject(title);
            message.setFrom(new InternetAddress(email));
            message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(to));
            message.setSubject(title);
            message.setContent(content, "text/html; charset=utf-8");
            emailSender.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean sendEmail(String to, String title, String content) {
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(email);
            message.setTo(to);
            message.setSubject(title);
            message.setText(content);
            emailSender.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
