package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.response.RetrieveResearchInformationResDTO;
import com.ctu.marketplace.entity.ResearchInformation;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.stereotype.Component;

@Component
public class RetrieveResearchInformationMapper implements IMapper<ResearchInformation, RetrieveResearchInformationResDTO> {

    @Override
    public RetrieveResearchInformationResDTO mapping(ResearchInformation source) {
        return RetrieveResearchInformationResDTO.builder()
                .id(source.getId())
                .degree(source.getDegree())
                .department(source.getDepartment())
                .institution(source.getInstitution())
                .position(source.getPosition())
                .build();
    }
}
