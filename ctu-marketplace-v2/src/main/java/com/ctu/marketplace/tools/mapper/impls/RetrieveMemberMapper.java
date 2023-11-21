package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.response.RetrieveMemberResDTO;
import com.ctu.marketplace.dto.last.response.RetrieveResearchInformationResDTO;
import com.ctu.marketplace.entity.ResearchInformation;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RetrieveMemberMapper implements IMapper<UserProfile, RetrieveMemberResDTO> {
    @Autowired
    private IMapper<ResearchInformation, RetrieveResearchInformationResDTO> researchMapper;

    @Override
    public RetrieveMemberResDTO mapping(UserProfile source) {
        return RetrieveMemberResDTO.builder()
                .id(source.getId())
                .email(source.getEmail())
                .phone(source.getPhoneNumber())
                .fullName(source.getFullName())
                .username(source.getUsername())
                .researchInformation(researchMapper.mapping(source.getResearchInformation()))
                .build();
    }
}
