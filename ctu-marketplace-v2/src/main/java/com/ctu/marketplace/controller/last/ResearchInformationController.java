package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.dto.last.request.CreateResearchInformationReqDTO;
import com.ctu.marketplace.dto.last.request.UpdateResearchInformationReqDTO;
import com.ctu.marketplace.dto.last.response.RetrieveResearchInformationResDTO;
import com.ctu.marketplace.entity.ResearchInformation;
import com.ctu.marketplace.service.IResearchInformationService;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v3/research-information")
public class ResearchInformationController {
    @Autowired
    private IResearchInformationService researchInformationService;
    @Autowired
    private IMapper<CreateResearchInformationReqDTO, ResearchInformation> createMapper;
    @Autowired
    private IMapper<UpdateResearchInformationReqDTO, ResearchInformation> updateMapper;
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody CreateResearchInformationReqDTO createResearchInformationReqDTO) {
        ResearchInformation researchInformation = createMapper.mapping(createResearchInformationReqDTO);
        researchInformationService.create(researchInformation);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<RetrieveResearchInformationResDTO>> list() {
        return new ResponseEntity<>(researchInformationService.list().stream().map(
                res -> {
                    return RetrieveResearchInformationResDTO.builder()
                            .id(res.getId())
                            .degree(res.getDegree())
                            .position(res.getPosition())
                            .institution(res.getInstitution())
                            .department(res.getDepartment())
                            .build();
                }
        ).collect(Collectors.toList()), HttpStatus.OK);
    }

    @PatchMapping("/{researchInformationId}")
    public ResponseEntity<Void> update(@RequestBody UpdateResearchInformationReqDTO updateResearchInformationReqDTO, @PathVariable Long researchInformationId) {
        updateResearchInformationReqDTO.setId(researchInformationId);
        researchInformationService.update(updateMapper.mapping(updateResearchInformationReqDTO));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{researchInformationId}")
    public ResponseEntity<RetrieveResearchInformationResDTO> retrieve(@PathVariable Long researchInformationId) {
        ResearchInformation researchInformation = researchInformationService.retrieve(researchInformationId);
        return new ResponseEntity<>(RetrieveResearchInformationResDTO.builder()
                .id(researchInformation.getId())
                .degree(researchInformation.getDegree())
                .position(researchInformation.getPosition())
                .institution(researchInformation.getInstitution())
                .department(researchInformation.getDepartment())
                .build(), HttpStatus.OK);
    }

    @DeleteMapping("/{researchInformationId}")
    public ResponseEntity<Void> delete(@PathVariable Long researchInformationId) {
        researchInformationService.delete(researchInformationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
