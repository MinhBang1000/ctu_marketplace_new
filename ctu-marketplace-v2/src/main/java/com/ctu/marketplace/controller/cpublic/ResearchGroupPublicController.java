package com.ctu.marketplace.controller.cpublic;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.response.ResearchGroupResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.ResearchGroup;
import com.ctu.marketplace.service.ResearchGroupService;

@RestController
@RequestMapping(BaseURL.PUBLIC + "/research-groups")
public class ResearchGroupPublicController {
    @Autowired
    private ResearchGroupService researchGroupService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<Response<List<ResearchGroupResponseDto>>> getAll() {
        List<ResearchGroup> researchGroups = researchGroupService.getAll();
        List<ResearchGroupResponseDto> researchGroupResponseDtos = new ArrayList<>();
        for (ResearchGroup researchGroup : researchGroups) {
            ResearchGroupResponseDto researchGroupResponseDto = new ResearchGroupResponseDto();
            mapper.map(researchGroup, researchGroupResponseDto);
            researchGroupResponseDtos.add(researchGroupResponseDto);
        }
        Response<List<ResearchGroupResponseDto>> response = new Response<>(Constant.STATUS_CODE_200, researchGroupResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{researchGroupId}")
    public ResponseEntity<Response<ResearchGroupResponseDto>> getByResearchGroupId(@PathVariable Long researchGroupId) {
        ResearchGroup researchGroup = researchGroupService.getById(researchGroupId);
        if (researchGroup != null) {
            ResearchGroupResponseDto researchGroupResponseDto = new ResearchGroupResponseDto();
            mapper.map(researchGroup, researchGroupResponseDto);
            Response<ResearchGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_200, researchGroupResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<ResearchGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }
}
