package com.ctu.marketplace.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.AboutPageDto;
import com.ctu.marketplace.entity.AboutPage;
import com.ctu.marketplace.repository.AboutPageRepository;
import com.ctu.marketplace.service.AboutPageService;

@Service
public class AboutPageServiceImpl implements AboutPageService {
    @Autowired
    private AboutPageRepository aboutPageRepository;

    @Override
    public AboutPage getById(Long id) {
        return aboutPageRepository.findById(id).orElse(null);
    }

    @Override
    public AboutPage update(Long id, AboutPageDto aboutPageDto) {
        try {
            AboutPage aboutPage = aboutPageRepository.findById(id).orElse(null);
            if (aboutPage == null)
                return null;
            aboutPage.setContent(aboutPageDto.getContent());
            aboutPage.setName(aboutPageDto.getName());
            return aboutPageRepository.save(aboutPage);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}