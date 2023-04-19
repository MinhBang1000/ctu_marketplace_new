package com.ctu.marketplace.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.FooterDto;
import com.ctu.marketplace.entity.Footer;
import com.ctu.marketplace.repository.FooterRepository;
import com.ctu.marketplace.service.FooterService;

@Service
public class FooterServiceImpl implements FooterService {

    @Autowired
    private FooterRepository footerRepository;

    @Override
    public Footer getById(Long id) {
        return footerRepository.findById(id).orElse(null);
    }

    @Override
    public Footer update(Long id, FooterDto footerDto) {
        try {
            Footer footer = footerRepository.findById(id).orElse(null);
            if (footer == null)
                return null;
            footer.setContent(footerDto.getContent());
            footer.setName(footerDto.getName());
            return footerRepository.save(footer);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
