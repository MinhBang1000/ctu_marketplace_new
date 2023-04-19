package com.ctu.marketplace.controller.cpublic;

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
import com.ctu.marketplace.dto.response.CommercialProjectResponseDto;
import com.ctu.marketplace.dto.response.IdeaProjectResponseDto;
import com.ctu.marketplace.dto.response.ProjectResponseDto;
import com.ctu.marketplace.dto.response.ResearchingProjectResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.CommercialProject;
import com.ctu.marketplace.entity.IdeaProject;
import com.ctu.marketplace.entity.Project;
import com.ctu.marketplace.entity.ResearchingProject;
import com.ctu.marketplace.service.CommercialProjectService;
import com.ctu.marketplace.service.IdeaProjectService;
import com.ctu.marketplace.service.ProjectService;
import com.ctu.marketplace.service.ResearchingProjectService;

@RestController
@RequestMapping(BaseURL.PUBLIC + "/projects")
public class ProjectPublicController {
    @Autowired
    private CommercialProjectService commercialProjectService;
    @Autowired
    private ResearchingProjectService researchingProjectService;
    @Autowired
    private IdeaProjectService ideaProjectService;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<Response<List<ProjectResponseDto>>> getAllByStatusDD() {
        List<Project> projects = projectService.getAllByStatusDD();
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

    @GetMapping("/search")
    public ResponseEntity<Response<List<ProjectResponseDto>>> searchByName(@RequestParam("name") String name) {
        List<Project> projects = projectService.searchByNameAndStatusDD(name);
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

    @GetMapping("/related/{projectId}")
    public ResponseEntity<Response<List<ProjectResponseDto>>> getAllRelatedDescCreatedDate(
            @PathVariable("projectId") Long projectId) {
        List<Project> projects = projectService.getAllRelatedDescCreatedDate(projectId);
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

    @GetMapping("/commercial")
    public ResponseEntity<Response<List<CommercialProjectResponseDto>>> getAllCommercialProjectByStatusDD() {
        List<CommercialProject> commercialProjects = commercialProjectService.getAllByStatusDD();
        List<CommercialProjectResponseDto> commercialProjectResponseDtos = new ArrayList<>();

        for (CommercialProject commercialProject : commercialProjects) {
            CommercialProjectResponseDto commercialProjectResponseDto = new CommercialProjectResponseDto();
            mapper.map(commercialProject, commercialProjectResponseDto);
            commercialProjectResponseDtos.add(commercialProjectResponseDto);
        }
        Response<List<CommercialProjectResponseDto>> response = new Response<>(Constant.STATUS_CODE_200, commercialProjectResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/researching")
    public ResponseEntity<Response<List<ResearchingProjectResponseDto>>> getAllResearchingProjectByStatusDD() {
        List<ResearchingProject> researchingProjects = researchingProjectService.getAllByStatusDD();
        List<ResearchingProjectResponseDto> researchingProjectResponseDtos = new ArrayList<>();
        for (ResearchingProject researchingProject : researchingProjects) {
            ResearchingProjectResponseDto researchingProjectResponseDto = new ResearchingProjectResponseDto();
            mapper.map(researchingProject, researchingProjectResponseDto);
            researchingProjectResponseDtos.add(researchingProjectResponseDto);
        }
        Response<List<ResearchingProjectResponseDto>> response = new Response<>(Constant.STATUS_CODE_200, researchingProjectResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/idea")
    public ResponseEntity<Response<List<IdeaProjectResponseDto>>> getAllIdeaProjectByStatusDD() {
        List<IdeaProject> ideaProjects = ideaProjectService.getAllByStatusDD();
        List<IdeaProjectResponseDto> ideaProjectResponseDtos = new ArrayList<>();
        for (IdeaProject ideaProject : ideaProjects) {
            IdeaProjectResponseDto ideaProjectResponseDto = new IdeaProjectResponseDto();
            mapper.map(ideaProject, ideaProjectResponseDto);
            ideaProjectResponseDtos.add(ideaProjectResponseDto);
        }
        Response<List<IdeaProjectResponseDto>> response = new Response<>(Constant.STATUS_CODE_200, ideaProjectResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/commercial/{commercialProjectId}")
    public ResponseEntity<Response<CommercialProjectResponseDto>> getByCommercialProjectId(
            @PathVariable Long commercialProjectId) {
        CommercialProject commercialProject = commercialProjectService.getById(commercialProjectId);
        if (commercialProject != null) {
            CommercialProjectResponseDto commercialProjectResponseDto = new CommercialProjectResponseDto();
            mapper.map(commercialProject, commercialProjectResponseDto);
            Response<CommercialProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_200, commercialProjectResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<CommercialProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/researching/{researchingProjectId}")
    public ResponseEntity<Response<ResearchingProjectResponseDto>> getByResearchingProjectId(
            @PathVariable Long researchingProjectId) {
        ResearchingProject researchingProject = researchingProjectService.getById(researchingProjectId);
        if (researchingProject != null) {
            ResearchingProjectResponseDto researchingProjectResponseDto = new ResearchingProjectResponseDto();
            mapper.map(researchingProject, researchingProjectResponseDto);
            Response<ResearchingProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_200, researchingProjectResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<ResearchingProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/idea/{id}")
    public ResponseEntity<Response<IdeaProjectResponseDto>> getByIdeaProjectId(@PathVariable Long id) {
        IdeaProject ideaProject = ideaProjectService.getById(id);
        if (ideaProject != null) {
            IdeaProjectResponseDto ideaProjectResponseDto = new IdeaProjectResponseDto();
            mapper.map(ideaProject, ideaProjectResponseDto);
            Response<IdeaProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_200, ideaProjectResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<IdeaProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }
}
