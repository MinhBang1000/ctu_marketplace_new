package com.ctu.marketplace.service.last;


import com.ctu.marketplace.entity.ResearchInformation;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.IResearchInformationRepository;
import com.ctu.marketplace.repository.UserProfileRepository;
import com.ctu.marketplace.service.IResearchInformationService;
import com.ctu.marketplace.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
public class ResearchInformationService implements IResearchInformationService {
    @Autowired
    private IResearchInformationRepository researchInformationRepository;
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Override
    public List<ResearchInformation> list() {
        return researchInformationRepository.findAll();
    }

    @Override
    public ResearchInformation retrieve(Long id) {
        Optional<ResearchInformation> optionalResearchInfo = researchInformationRepository.findById(id);
        if (!optionalResearchInfo.isPresent()) {
            throw new IllegalArgumentException("Doesn't match any instance by this ID");
        }
        return optionalResearchInfo.get();
    }

    @Override
    public ResearchInformation create(ResearchInformation researchInformation) {
        Optional<UserProfile> userProfile = userProfileRepository.findById(researchInformation.getUserProfile().getId());
        if (!userProfile.isPresent()) {
            throw new IllegalArgumentException("Doesn't have any user with this ID");
        }
        ResearchInformation createdResearchInformation = researchInformationRepository.save(researchInformation);
        UserProfile foundUser = userProfile.get();
        foundUser.setResearchInformation(createdResearchInformation);
        userProfileRepository.save(foundUser);
        return researchInformationRepository.save(researchInformation);
    }

    @Override
    public void delete(Long id) {
        researchInformationRepository.deleteById(id);
    }

    @Override
    public ResearchInformation update(ResearchInformation researchInformation, Long id) {
        researchInformation.setId(id);
        return researchInformationRepository.save(researchInformation);
    }


}
