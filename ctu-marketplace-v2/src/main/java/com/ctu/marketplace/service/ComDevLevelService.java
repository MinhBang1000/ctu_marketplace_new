package com.ctu.marketplace.service;

import com.ctu.marketplace.entity.ComDevLevel;

public interface ComDevLevelService {
    public ComDevLevel create(Long commercialProjectId, Long devLevelId, String note);

    public boolean deleteByCommercialProjectId(Long commercialProjectId);
}
