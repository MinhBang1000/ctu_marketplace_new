package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.request.CreateResearchInformationReqDTO;
import com.ctu.marketplace.entity.ResearchInformation;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.exception.CustomExceptionMessage;
import com.ctu.marketplace.repository.UserProfileRepository;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CreateResearchInformationMapper implements IMapper<CreateResearchInformationReqDTO, ResearchInformation> {
    @Autowired
    private UserProfileRepository userProfileRepository;
    @Override
    public ResearchInformation mapping(CreateResearchInformationReqDTO source) {
        Optional<UserProfile> optionalUserProfile = userProfileRepository.findById(source.getPersonId());
        if (!optionalUserProfile.isPresent()) {
            throw new IllegalArgumentException(CustomExceptionMessage.NOT_FOUND_BY_THIS_ID);
        }
        return new ResearchInformation(source.getDegree(), source.getPosition(), source.getInstitution(), source.getDepartment(), optionalUserProfile.get());
    }
}
