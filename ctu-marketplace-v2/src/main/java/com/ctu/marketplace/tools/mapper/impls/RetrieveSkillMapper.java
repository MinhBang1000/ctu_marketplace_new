package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.response.RetrieveSkillResDTO;
import com.ctu.marketplace.entity.Skill;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.stereotype.Component;

@Component
public class RetrieveSkillMapper implements IMapper<Skill, RetrieveSkillResDTO> {
    @Override
    public RetrieveSkillResDTO mapping(Skill source) {
        return RetrieveSkillResDTO.builder()
                .id(source.getId())
                .name(source.getName())
                .researchInformationId(source.getResearchInformation().getId())
                .build();
    }
}
