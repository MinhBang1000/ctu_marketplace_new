package com.ctu.marketplace.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ctu.marketplace.entity.ComTransMethod;
import com.ctu.marketplace.entity.ComTransMethodPK;
import com.ctu.marketplace.repository.ComTransMethodRepository;
import com.ctu.marketplace.service.ComTransMethodService;
import com.ctu.marketplace.service.CommercialProjectService;
import com.ctu.marketplace.service.TransMethodService;

@Service
@Transactional
public class ComTransMethodServiceImpl implements ComTransMethodService {
    @Autowired
    private TransMethodService transMethodService;
    @Autowired
    private ComTransMethodRepository comTransMethodRepository;

    @Autowired
    private CommercialProjectService commercialProjectService;

    @Override
    public ComTransMethod create(Long commercialProjectId, Long transMethodId, String note)
            {
        try {
            ComTransMethodPK id = new ComTransMethodPK(transMethodId, commercialProjectId);
            ComTransMethod comTransMethod = new ComTransMethod();
            comTransMethod.setId(id);
            comTransMethod.setNote(note);
            comTransMethod.setTransMethod(transMethodService.getById(transMethodId));
            comTransMethod.setCommercialProject(commercialProjectService.getById(commercialProjectId));
            return comTransMethodRepository.save(comTransMethod);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteByCommercialProjectId(Long commercialProjectId) {
        try {
            comTransMethodRepository.deleteByCommercialProjectId(commercialProjectId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
