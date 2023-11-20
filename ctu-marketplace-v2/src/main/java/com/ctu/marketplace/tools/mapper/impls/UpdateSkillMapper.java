package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.request.CreateSkillReqDTO;
import com.ctu.marketplace.dto.last.request.UpdateSkillReqDTO;
import com.ctu.marketplace.entity.ResearchInformation;
import com.ctu.marketplace.entity.Skill;
import com.ctu.marketplace.exception.CustomExceptionMessage;
import com.ctu.marketplace.repository.IResearchInformationRepository;
import com.ctu.marketplace.repository.ISkillRepository;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class UpdateSkillMapper implements IMapper<UpdateSkillReqDTO, Skill> {
    @Autowired
    private IResearchInformationRepository researchInformationRepository;
    @Autowired
    private ISkillRepository skillRepository;

    @Override
    public Skill mapping(UpdateSkillReqDTO source) {
        Optional<Skill> optionalSkill = skillRepository.findById(source.getId());
        if (!optionalSkill.isPresent()) {
            throw new IllegalArgumentException(CustomExceptionMessage.NOT_FOUND_BY_THIS_ID);
        }
        Skill newSkill = new Skill();
        newSkill.setId(optionalSkill.get().getId());
        newSkill.setName(Objects.isNull(source.getName()) ? optionalSkill.get().getName() : source.getName());
        newSkill.setResearchInformation(optionalSkill.get().getResearchInformation());
        return newSkill;
    }
}
