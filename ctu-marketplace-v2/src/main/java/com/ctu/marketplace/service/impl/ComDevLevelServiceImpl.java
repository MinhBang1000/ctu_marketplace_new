package com.ctu.marketplace.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ctu.marketplace.entity.ComDevLevel;
import com.ctu.marketplace.entity.ComDevLevelPK;
import com.ctu.marketplace.repository.ComDevLevelRepository;
import com.ctu.marketplace.service.ComDevLevelService;
import com.ctu.marketplace.service.CommercialProjectService;
import com.ctu.marketplace.service.DevLevelService;

@Service
@Transactional
public class ComDevLevelServiceImpl implements ComDevLevelService {

    @Autowired
    private DevLevelService devLevelService;
    @Autowired
    private ComDevLevelRepository comDevLevelRepository;

    @Autowired
    private CommercialProjectService commercialProjectService;

    @Override
    public ComDevLevel create(Long commercialProjectId, Long devLevelId, String note) {
        try {
            ComDevLevelPK id = new ComDevLevelPK(devLevelId, commercialProjectId);
            ComDevLevel comDevLevel = new ComDevLevel();
            comDevLevel.setId(id);
            comDevLevel.setNote(note);
            comDevLevel.setDevLevel(devLevelService.getById(devLevelId));
            comDevLevel.setCommercialProject(commercialProjectService.getById(commercialProjectId));
            return comDevLevelRepository.save(comDevLevel);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteByCommercialProjectId(Long commercialProjectId) {
        try {
            comDevLevelRepository.deleteByCommercialProjectId(commercialProjectId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
