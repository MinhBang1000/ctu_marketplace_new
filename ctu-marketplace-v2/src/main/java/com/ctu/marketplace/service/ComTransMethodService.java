package com.ctu.marketplace.service;

import com.ctu.marketplace.entity.ComTransMethod;

public interface ComTransMethodService {
    public ComTransMethod create(Long commercialProjectId, Long comTransMethodId, String note);

    public boolean deleteByCommercialProjectId(Long commercialProjectId);
}
