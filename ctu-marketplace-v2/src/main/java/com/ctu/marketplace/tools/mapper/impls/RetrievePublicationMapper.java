package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.response.RetrievePublicationResDTO;
import com.ctu.marketplace.entity.Publication;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.stereotype.Component;

@Component
public class RetrievePublicationMapper implements IMapper<Publication, RetrievePublicationResDTO> {

    @Override
    public RetrievePublicationResDTO mapping(Publication source) {
        return RetrievePublicationResDTO.builder()
                .id(source.getId())
                .doi(source.getDoi())
                .author(source.getAuthor())
                .issueName(source.getIssueNumber())
                .journalName(source.getJournalName())
                .pageNumber(source.getPageNumber())
                .researchInformationId(source.getResearchInformation().getId())
                .yearOfPublication(source.getYearOfPublication())
                .title(source.getTitle())
                .volumeName(source.getVolumeNumber())
                .build();
    }
}
