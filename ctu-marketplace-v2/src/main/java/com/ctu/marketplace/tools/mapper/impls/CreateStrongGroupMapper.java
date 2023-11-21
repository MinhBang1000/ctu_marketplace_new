package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.request.CreateStrongGroupReqDTO;
import com.ctu.marketplace.entity.StrongGroup;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.exception.CustomExceptionMessage;
import com.ctu.marketplace.repository.UserProfileRepository;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CreateStrongGroupMapper implements IMapper<CreateStrongGroupReqDTO, StrongGroup> {
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Override
    public StrongGroup mapping(CreateStrongGroupReqDTO source) {
        Optional<UserProfile> optionalUserProfile = userProfileRepository.findById(source.getLeaderId());
        if (!optionalUserProfile.isPresent()) {
            throw new IllegalArgumentException(CustomExceptionMessage.NOT_FOUND_BY_THIS_ID);
        }
        StrongGroup newStrongGroup = new StrongGroup();
        newStrongGroup.setName(source.getName());
        newStrongGroup.setTopic(source.getTopic());
        newStrongGroup.setMission(source.getMission());
        newStrongGroup.setIntroduction(source.getIntroduction());
        newStrongGroup.setVision(source.getVision());
        newStrongGroup.setUserProfile(optionalUserProfile.get());
        return newStrongGroup;
    }
}
