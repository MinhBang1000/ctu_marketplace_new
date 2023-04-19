package com.ctu.marketplace.service;

import com.ctu.marketplace.dto.request.FooterDto;
import com.ctu.marketplace.entity.Footer;

public interface FooterService {
    public Footer getById(Long footerId);
    public Footer update(Long footerId, FooterDto footerDto);
}
