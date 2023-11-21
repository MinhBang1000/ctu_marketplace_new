package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.response.RetrieveMemberResDTO;
import com.ctu.marketplace.dto.last.response.RetrieveStrongGroupMemberResDTO;
import com.ctu.marketplace.dto.last.response.RetrieveStrongGroupResDTO;
import com.ctu.marketplace.entity.StrongGroup;
import com.ctu.marketplace.entity.StrongGroupMember;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RetrieveStrongGroupMemberMapper implements IMapper<StrongGroupMember, RetrieveStrongGroupMemberResDTO>{
    @Autowired
    private IMapper<UserProfile, RetrieveMemberResDTO> memberMapper;
    @Autowired
    private IMapper<StrongGroup, RetrieveStrongGroupResDTO> strongGroupMapper;


    @Override
    public RetrieveStrongGroupMemberResDTO mapping(StrongGroupMember source) {
        return RetrieveStrongGroupMemberResDTO.builder()
                .id(source.getId())
                .member(memberMapper.mapping(source.getMember()))
                .strongGroup(strongGroupMapper.mapping(source.getStrongGroup()))
                .decision(source.getDecision())
                .build();
    }
}
