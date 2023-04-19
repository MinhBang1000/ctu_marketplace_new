package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.DevLevelDto;
import com.ctu.marketplace.entity.DevLevel;

public interface DevLevelService {
    List<DevLevel> getAll();
    DevLevel getById(Long devLevelId);
    DevLevel create(DevLevelDto devLevelDto);
    DevLevel update(Long devLevelId, DevLevelDto devLevelDto);
    boolean deleteById(Long devLevelId);
}
