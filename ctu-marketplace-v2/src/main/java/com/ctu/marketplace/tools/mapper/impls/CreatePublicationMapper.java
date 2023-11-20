package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.request.CreatePublicationReqDTO;
import com.ctu.marketplace.entity.Publication;
import com.ctu.marketplace.entity.ResearchInformation;
import com.ctu.marketplace.exception.CustomExceptionMessage;
import com.ctu.marketplace.repository.IPublicationRepository;
import com.ctu.marketplace.repository.IResearchInformationRepository;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CreatePublicationMapper implements IMapper<CreatePublicationReqDTO, Publication> {
    @Autowired
    private IPublicationRepository publicationRepository;
    @Autowired
    private IResearchInformationRepository researchInformationRepository;
    @Override
    public Publication mapping(CreatePublicationReqDTO source) {
        Publication newPublication = new Publication();
        Optional<ResearchInformation> optionalResearchInformation = researchInformationRepository.findById(source.getResearchInformationId());
        if (!optionalResearchInformation.isPresent()) {
            throw new IllegalArgumentException(CustomExceptionMessage.NOT_FOUND_BY_THIS_ID);
        }
        newPublication.setDoi(source.getDoi());
        newPublication.setAuthor(source.getAuthor());
        newPublication.setYearOfPublication(source.getYearOfPublication());
        newPublication.setTitle(source.getTitle());
        newPublication.setIssueNumber(source.getIssueName());
        newPublication.setJournalName(source.getJournalName());
        newPublication.setPageNumber(source.getPageNumber());
        newPublication.setVolumeNumber(source.getVolumeName());
        newPublication.setResearchInformation(optionalResearchInformation.get());
        return newPublication;
    }
}
