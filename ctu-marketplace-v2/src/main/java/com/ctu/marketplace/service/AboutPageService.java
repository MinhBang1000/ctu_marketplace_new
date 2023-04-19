package com.ctu.marketplace.service;

import com.ctu.marketplace.dto.request.AboutPageDto;
import com.ctu.marketplace.entity.AboutPage;

public interface AboutPageService {
    public AboutPage getById(Long aboutPageId);

    public AboutPage update(Long aboutPageId, AboutPageDto aboutPageDto);
}
