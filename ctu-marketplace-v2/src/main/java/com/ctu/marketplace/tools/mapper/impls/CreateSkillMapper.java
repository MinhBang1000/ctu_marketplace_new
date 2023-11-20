package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.request.CreateSkillReqDTO;
import com.ctu.marketplace.entity.ResearchInformation;
import com.ctu.marketplace.entity.Skill;
import com.ctu.marketplace.exception.CustomExceptionMessage;
import com.ctu.marketplace.repository.IResearchInformationRepository;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CreateSkillMapper implements IMapper<CreateSkillReqDTO, Skill> {
    @Autowired
    private IResearchInformationRepository researchInformationRepository;

    @Override
    public Skill mapping(CreateSkillReqDTO source) {
        Optional<ResearchInformation> optionalResearchInformation = researchInformationRepository.findById(source.getResearchInformationId());
        if (!optionalResearchInformation.isPresent()) {
            throw new IllegalArgumentException(CustomExceptionMessage.NOT_FOUND_BY_THIS_ID);
        }
        Skill newSkill = new Skill();
        newSkill.setName(source.getName());
        newSkill.setResearchInformation(optionalResearchInformation.get());
        return newSkill;
    }
}
