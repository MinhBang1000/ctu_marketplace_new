package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.request.CreatePublicationReqDTO;
import com.ctu.marketplace.dto.last.request.UpdatePublicationReqDTO;
import com.ctu.marketplace.entity.Publication;
import com.ctu.marketplace.entity.ResearchInformation;
import com.ctu.marketplace.exception.CustomExceptionMessage;
import com.ctu.marketplace.repository.IPublicationRepository;
import com.ctu.marketplace.repository.IResearchInformationRepository;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class UpdatePublicationMapper implements IMapper<UpdatePublicationReqDTO, Publication> {
    @Autowired
    private IPublicationRepository publicationRepository;
    @Autowired
    private IResearchInformationRepository researchInformationRepository;
    @Override
    public Publication mapping(UpdatePublicationReqDTO source) {
        Publication newPublication = new Publication();
        Optional<Publication> optionalPublication = publicationRepository.findById(source.getId());
        if (!optionalPublication.isPresent()) {
            throw new IllegalArgumentException(CustomExceptionMessage.NOT_FOUND_BY_THIS_ID);
        }
        Publication foundPublication = optionalPublication.get();
        newPublication.setId(foundPublication.getId());
        newPublication.setDoi(Objects.isNull(source.getDoi()) ? foundPublication.getDoi() : source.getDoi());
        newPublication.setAuthor(Objects.isNull(source.getAuthor()) ? foundPublication.getAuthor() : source.getAuthor());
        newPublication.setYearOfPublication(Objects.isNull(source.getYearOfPublication()) ? foundPublication.getYearOfPublication() : source.getYearOfPublication());
        newPublication.setTitle(Objects.isNull(source.getTitle()) ? foundPublication.getTitle() : source.getTitle());
        newPublication.setIssueNumber(Objects.isNull(source.getIssueName()) ? foundPublication.getIssueNumber() : source.getIssueName());
        newPublication.setJournalName(Objects.isNull(source.getJournalName()) ? foundPublication.getJournalName() : source.getJournalName());
        newPublication.setPageNumber(Objects.isNull(source.getPageNumber()) ? foundPublication.getPageNumber() : source.getPageNumber());
        newPublication.setVolumeNumber(Objects.isNull(source.getVolumeName()) ? foundPublication.getVolumeNumber() : source.getVolumeName());
        newPublication.setResearchInformation(foundPublication.getResearchInformation());
        return newPublication;
    }
}
