package com.ctu.marketplace.controller.admin;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.controller.common.ProjectCommonController;
import com.ctu.marketplace.dto.request.ApproveProjectDto;
import com.ctu.marketplace.dto.response.ProjectResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Project;
import com.ctu.marketplace.service.ProjectService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/project-management")
public class ProjectManagementController extends ProjectCommonController {
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ModelMapper mapper;

    @PutMapping("/approve")
    public ResponseEntity<Response<ProjectResponseDto>> approve(
            @RequestBody ApproveProjectDto approveProjectDto) {
        boolean check = projectService.approve(approveProjectDto);
        if (check) {
            Project project = projectService.getById(approveProjectDto.getProjectId());
            ProjectResponseDto projectResponseDto = new ProjectResponseDto();
            mapper.map(project, projectResponseDto);
            Response<ProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_200, projectResponseDto,
                    Constant.APPROVE_SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<ProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.APPROVE_FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("ranking/project-id/{projectId}/number/{number}")
    public ResponseEntity<Response<ProjectResponseDto>> updateRanking(
            @PathVariable("projectId") Long projectId, @PathVariable("number") Long number) {
        boolean check = projectService.updateRanking(number, projectId);
        if (check) {
            Project project = projectService.getById(projectId);
            ProjectResponseDto projectResponseDto = new ProjectResponseDto();
            mapper.map(project, projectResponseDto);
            Response<ProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_200, projectResponseDto,
                    Constant.APPROVE_SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<ProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.APPROVE_FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("highlight/project-id/{projectId}/is-highlighted/{isHighlighted}")
    public ResponseEntity<Response<ProjectResponseDto>> updateHighLight(
            @PathVariable("projectId") Long projectId, @PathVariable Boolean isHighlighted) {
        boolean check = projectService.updateHighLight(isHighlighted, projectId);
        if (check) {
            Project project = projectService.getById(projectId);
            ProjectResponseDto projectResponseDto = new ProjectResponseDto();
            mapper.map(project, projectResponseDto);
            Response<ProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_200, projectResponseDto,
                    Constant.APPROVE_SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<ProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.APPROVE_FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/projects/userId/{userId}")
    public ResponseEntity<Response<List<ProjectResponseDto>>> getAllByUserAdmin(
            @PathVariable("userId") Long userId) {
        List<Project> projects = projectService.getAllByUserAdminId(userId);
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

    @GetMapping("/projects")
    public ResponseEntity<Response<List<ProjectResponseDto>>> getAllByDomainAndStatus(
            @RequestParam("userId") Long userId, @RequestParam("projectType") String projectType,
            @RequestParam("statusId") Long statusId) {
        List<Project> projects = projectService.getAllByDomainAndStatusAndType(userId, statusId, projectType);
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
