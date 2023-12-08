package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.request.AskingStrongGroupDTO;
import com.ctu.marketplace.entity.StrongGroup;
import com.ctu.marketplace.entity.StrongGroupMember;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.entity.constraints.CustomConstraints;
import com.ctu.marketplace.exception.CustomExceptionMessage;
import com.ctu.marketplace.repository.IStrongGroupRepository;
import com.ctu.marketplace.repository.UserProfileRepository;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AskingStrongGroupMemberMapper implements IMapper<AskingStrongGroupDTO, StrongGroupMember> {
    @Autowired
    private UserProfileRepository userProfileRepository;
    @Autowired
    private IStrongGroupRepository strongGroupRepository;

    @Override
    public StrongGroupMember mapping(AskingStrongGroupDTO source) {
        Optional<StrongGroup> optionalStrongGroup = strongGroupRepository.findById(source.getStrongGroupId());
        Optional<UserProfile> optionalUserProfile = userProfileRepository.findById(source.getMemberId());
        if (!optionalStrongGroup.isPresent() || !optionalUserProfile.isPresent()) {
            throw new IllegalArgumentException(CustomExceptionMessage.NOT_FOUND_BY_THIS_ID);
        }
        StrongGroupMember creatingInvitation = new StrongGroupMember();
        creatingInvitation.setMember(optionalUserProfile.get());
        creatingInvitation.setStrongGroup(optionalStrongGroup.get());
        creatingInvitation.setDecision(CustomConstraints.PENDING);
        return creatingInvitation;
    }
}
