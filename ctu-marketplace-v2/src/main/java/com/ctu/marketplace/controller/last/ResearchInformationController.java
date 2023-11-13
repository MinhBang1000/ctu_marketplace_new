package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.dto.last.request.CreateResearchInformationDTO;
import com.ctu.marketplace.dto.last.response.CreateResearchInformationResDTO;
import com.ctu.marketplace.dto.last.response.ListResearchInformationResDTO;
import com.ctu.marketplace.entity.ResearchInformation;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.service.IResearchInformationService;
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
    @PostMapping("")
    public ResponseEntity<CreateResearchInformationResDTO> createResearchInformation(@RequestBody CreateResearchInformationDTO createResearchInformationDTO) {
        ResearchInformation newResearchInformation = new ResearchInformation();
        newResearchInformation.setDegree(createResearchInformationDTO.getDegree());
        newResearchInformation.setDepartment(createResearchInformationDTO.getDepartment());
        newResearchInformation.setPosition(createResearchInformationDTO.getPosition());
        newResearchInformation.setInstitution(createResearchInformationDTO.getInstitution());
        UserProfile userProfile = new UserProfile();
        userProfile.setId(createResearchInformationDTO.getPersonId());
        newResearchInformation.setUserProfile(userProfile);
        ResearchInformation createdResearchInfo = researchInformationService.create(newResearchInformation);
        return new ResponseEntity<>(CreateResearchInformationResDTO.builder()
                .degree(createResearchInformationDTO.getDegree())
                .department(createResearchInformationDTO.getDepartment())
                .institution(createResearchInformationDTO.getInstitution())
                .position(createResearchInformationDTO.getPosition())
                .build(), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ListResearchInformationResDTO>> getAllResearchInformation() {
        return new ResponseEntity<>(researchInformationService.list().stream().map(
                res -> {
                    return ListResearchInformationResDTO.builder()
                            .degree(res.getDegree())
                            .position(res.getPosition())
                            .institution(res.getInstitution())
                            .department(res.getDepartment())
                            .build();
                }
        ).collect(Collectors.toList()), HttpStatus.OK);
    }

    @PutMapping("/{researchInformationId}")
    public ResponseEntity<ListResearchInformationResDTO> updateReseachInformation(@RequestBody CreateResearchInformationDTO updateResearchInformationDTO, @PathVariable Long researchInformationId) {
        ResearchInformation newResearchInformation = new ResearchInformation();
        newResearchInformation.setDegree(updateResearchInformationDTO.getDegree());
        newResearchInformation.setDepartment(updateResearchInformationDTO.getDepartment());
        newResearchInformation.setPosition(updateResearchInformationDTO.getPosition());
        newResearchInformation.setInstitution(updateResearchInformationDTO.getInstitution());
        ResearchInformation updatedResearchInfo = researchInformationService.update(newResearchInformation, researchInformationId);
        return new ResponseEntity<>(ListResearchInformationResDTO.builder()
                .department(updateResearchInformationDTO.getDepartment())
                .institution(updateResearchInformationDTO.getInstitution())
                .position(updateResearchInformationDTO.getPosition())
                .degree(updateResearchInformationDTO.getDegree())
                .build(), HttpStatus.OK);
    }

    @GetMapping("/{researchInformationId}")
    public ResponseEntity<ListResearchInformationResDTO> retrieveResearchInformation(@PathVariable Long researchInformationId) {
        ResearchInformation researchInformation = researchInformationService.retrieve(researchInformationId);
        return new ResponseEntity<>(ListResearchInformationResDTO.builder()
                .degree(researchInformation.getDegree())
                .position(researchInformation.getPosition())
                .institution(researchInformation.getInstitution())
                .department(researchInformation.getDepartment())
                .build(), HttpStatus.OK);
    }

    @DeleteMapping("/{researchInformationId}")
    public ResponseEntity<String> deleteResearchInformation(@PathVariable Long researchInformationId) {
        researchInformationService.delete(researchInformationId);
        return new ResponseEntity<>("", HttpStatus.NO_CONTENT);
    }
}
