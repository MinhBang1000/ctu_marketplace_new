package com.ctu.marketplace.service;

import com.ctu.marketplace.entity.ResearchInformation;

import java.util.List;

public interface IResearchInformationService {
    List<ResearchInformation> list();
    ResearchInformation retrieve(Long id);
    ResearchInformation create(ResearchInformation researchInformation);
    void delete(Long id);
    ResearchInformation update(ResearchInformation researchInformation);
}
