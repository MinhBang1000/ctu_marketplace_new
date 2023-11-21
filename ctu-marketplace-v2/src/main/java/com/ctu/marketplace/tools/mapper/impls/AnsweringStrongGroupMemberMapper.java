package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.request.AnsweringStrongGroupDTO;
import com.ctu.marketplace.entity.StrongGroupMember;
import com.ctu.marketplace.exception.CustomExceptionMessage;
import com.ctu.marketplace.repository.IStrongGroupMemberRepository;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;
@Component
public class AnsweringStrongGroupMemberMapper implements IMapper<AnsweringStrongGroupDTO, StrongGroupMember> {
    @Autowired
    private IStrongGroupMemberRepository strongGroupMemberRepository;

    @Override
    public StrongGroupMember mapping(AnsweringStrongGroupDTO source) {
        Optional<StrongGroupMember> optionalStrongGroupMember = strongGroupMemberRepository.findById(source.getInvitationId());
        if (!optionalStrongGroupMember.isPresent()) {
            throw new IllegalArgumentException(CustomExceptionMessage.NOT_FOUND_BY_THIS_ID);
        }
        StrongGroupMember strongGroupMember = optionalStrongGroupMember.get();
        strongGroupMember.setDecision(source.getDecision());
        return strongGroupMember;
    }
}
