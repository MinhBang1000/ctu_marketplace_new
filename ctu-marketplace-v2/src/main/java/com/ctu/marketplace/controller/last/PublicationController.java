package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.dto.last.request.CreatePublicationReqDTO;
import com.ctu.marketplace.dto.last.request.CreateResearchInformationReqDTO;
import com.ctu.marketplace.dto.last.request.UpdatePublicationReqDTO;
import com.ctu.marketplace.dto.last.response.RetrievePublicationResDTO;
import com.ctu.marketplace.entity.Publication;
import com.ctu.marketplace.service.IPublicationService;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v3/publications")
public class PublicationController {

    @Autowired
    private IPublicationService publicationService;
    @Autowired
    private IMapper<CreatePublicationReqDTO, Publication> createMapper;
    @Autowired
    private IMapper<UpdatePublicationReqDTO, Publication> updateMapper;
    @Autowired
    private IMapper<Publication, RetrievePublicationResDTO> retrieveMapper;

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody CreatePublicationReqDTO createPublicationReqDTO) {
        publicationService.create(createMapper.mapping(createPublicationReqDTO));
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/{publicationId}")
    public ResponseEntity<Void> update(@RequestBody UpdatePublicationReqDTO updatePublicationReqDTO) {
        publicationService.update(updateMapper.mapping(updatePublicationReqDTO));
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping
    public ResponseEntity<List<RetrievePublicationResDTO>> list() {
        return new ResponseEntity<>(publicationService.list().stream().map(
                publication -> {
                    return retrieveMapper.mapping(publication);
                }
        ).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/{publicationId}")
    public ResponseEntity<RetrievePublicationResDTO> retrieve(@PathVariable Long publicationId) {
        return new ResponseEntity<>(retrieveMapper.mapping(publicationService.retrieve(publicationId)), HttpStatus.OK);
    }

    @DeleteMapping("/{publicationId}")
    public ResponseEntity<Void> delete(@PathVariable Long publicationId) {
        publicationService.delete(publicationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
