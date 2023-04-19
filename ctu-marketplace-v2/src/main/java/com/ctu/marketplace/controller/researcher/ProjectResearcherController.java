package com.ctu.marketplace.controller.researcher;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.controller.common.ProjectCommonController;
import com.ctu.marketplace.dto.response.ProjectResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Project;
import com.ctu.marketplace.service.ProjectService;

@RestController
@RequestMapping(BaseURL.RESEARCHER + "/projects")
public class ProjectResearcherController extends ProjectCommonController {
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/userId/{userId}")
    public ResponseEntity<Response<List<ProjectResponseDto>>> getAllByUserId(@PathVariable("userId") Long userId) {
        List<Project> projects = projectService.getAllByUserId(userId);
        List<ProjectResponseDto> projectResponseDtos = new ArrayList<>();
        for (Project project : projects) {
            ProjectResponseDto projectResponseDto = new ProjectResponseDto();
            mapper.map(project, projectResponseDto);
            projectResponseDtos.add(projectResponseDto);
        }
        Response<List<ProjectResponseDto>> response = new Response<>(Constant.STATUS_CODE_200, projectResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<Response<List<ProjectResponseDto>>> getAllByUserAndStatusAndType(
            @RequestParam("userId") Long userId, @RequestParam("projectType") String projectType,
            @RequestParam("statusId") Long statusId) {
        List<Project> projects = projectService.getAllByUserIdAndStatusIdAndType(userId, statusId, projectType);
        List<ProjectResponseDto> projectResponseDtos = new ArrayList<>();
        for (Project project : projects) {
            ProjectResponseDto projectResponseDto = new ProjectResponseDto();
            mapper.map(project, projectResponseDto);
            projectResponseDtos.add(projectResponseDto);
        }
        Response<List<ProjectResponseDto>> response = new Response<>(Constant.STATUS_CODE_200, projectResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

}
