package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.request.CreateStrongGroupReqDTO;
import com.ctu.marketplace.dto.last.request.UpdateStrongGroupReqDTO;
import com.ctu.marketplace.entity.StrongGroup;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.exception.CustomExceptionMessage;
import com.ctu.marketplace.repository.IStrongGroupRepository;
import com.ctu.marketplace.repository.UserProfileRepository;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class UpdateStrongGroupMapper implements IMapper<UpdateStrongGroupReqDTO, StrongGroup> {
    @Autowired
    private IStrongGroupRepository strongGroupRepository;

    @Override
    public StrongGroup mapping(UpdateStrongGroupReqDTO source) {
        Optional<StrongGroup> optionalStrongGroup = strongGroupRepository.findById(source.getId());
        if (!optionalStrongGroup.isPresent()) {
            throw new IllegalArgumentException(CustomExceptionMessage.NOT_FOUND_BY_THIS_ID);
        }
        StrongGroup existedStrongGroup = optionalStrongGroup.get();
        StrongGroup updatingStrongGroup = new StrongGroup();
        updatingStrongGroup.setId(existedStrongGroup.getId());
        updatingStrongGroup.setName(Objects.isNull(source.getName()) ? existedStrongGroup.getName() : source.getName());
        updatingStrongGroup.setTopic(Objects.isNull(source.getTopic()) ? existedStrongGroup.getTopic() : source.getTopic());
        updatingStrongGroup.setMission(Objects.isNull(source.getMission()) ? existedStrongGroup.getMission() : source.getMission());
        updatingStrongGroup.setIntroduction(Objects.isNull(source.getIntroduction()) ? existedStrongGroup.getIntroduction() : source.getIntroduction());
        updatingStrongGroup.setVision(Objects.isNull(source.getVision()) ? existedStrongGroup.getVision() : source.getVision());
        updatingStrongGroup.setUserProfile(existedStrongGroup.getUserProfile());
        return updatingStrongGroup;
    }
}
