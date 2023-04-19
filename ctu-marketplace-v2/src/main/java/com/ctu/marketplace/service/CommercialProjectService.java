package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.CommercialProjectDto;
import com.ctu.marketplace.entity.CommercialProject;

public interface CommercialProjectService {
    CommercialProject getById(Long commercialProjectId);

    CommercialProject create(CommercialProjectDto commercialProjectDto);

    CommercialProject createDraft(CommercialProjectDto commercialProjectDto);

    CommercialProject update(Long commercialProjectId, CommercialProjectDto commercialProjectDto);

    CommercialProject updateDraft(Long commercialProjectId, CommercialProjectDto commercialProjectDto);

    List<CommercialProject> getAllByStatusDD();

}
