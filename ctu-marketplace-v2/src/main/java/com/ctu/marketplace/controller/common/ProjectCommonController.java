package com.ctu.marketplace.controller.common;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.request.CommercialProjectDto;
import com.ctu.marketplace.dto.request.IdeaProjectDto;
import com.ctu.marketplace.dto.request.ResearchingProjectDto;
import com.ctu.marketplace.dto.response.CommercialProjectResponseDto;
import com.ctu.marketplace.dto.response.IdeaProjectResponseDto;
import com.ctu.marketplace.dto.response.ResearchingProjectResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.CommercialProject;
import com.ctu.marketplace.entity.IdeaProject;
import com.ctu.marketplace.entity.ResearchingProject;
import com.ctu.marketplace.service.CommercialProjectService;
import com.ctu.marketplace.service.IdeaProjectService;
import com.ctu.marketplace.service.ProjectService;
import com.ctu.marketplace.service.ResearchingProjectService;

public class ProjectCommonController {
	@Autowired
	private CommercialProjectService commercialProjectService;
	@Autowired
	private IdeaProjectService ideaProjectService;
	@Autowired
	private ResearchingProjectService researchingProjectService;
	@Autowired
	private ProjectService projectService;
	@Autowired
	private ModelMapper mapper;

	@GetMapping("/commercial/{commercialProjectId}")
	public ResponseEntity<Response<CommercialProjectResponseDto>> getCommercialProjectById(
			@PathVariable Long commercialProjectId) {
		CommercialProject commercialProject = commercialProjectService.getById(commercialProjectId);
		if (commercialProject != null) {
			CommercialProjectResponseDto commercialProjectResponseDto = new CommercialProjectResponseDto();
			mapper.map(commercialProject, commercialProjectResponseDto);
			Response<CommercialProjectResponseDto> response = new Response<>(200, commercialProjectResponseDto,
					Constant.SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<CommercialProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PostMapping("/commercial")
	public ResponseEntity<Response<CommercialProjectResponseDto>> createCommercialProject(
			@Valid @RequestBody CommercialProjectDto commercialProjectDto) {
		CommercialProject commercialProject = commercialProjectService.create(commercialProjectDto);
		if (commercialProject != null) {
			CommercialProjectResponseDto commercialProjectResponseDto = new CommercialProjectResponseDto();
			mapper.map(commercialProject, commercialProjectResponseDto);
			Response<CommercialProjectResponseDto> response = new Response<>(200, commercialProjectResponseDto,
					Constant.CREATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);

		} else {
			Response<CommercialProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.CREATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PostMapping("/commercial/draft")
	public ResponseEntity<Response<CommercialProjectResponseDto>> createCommercialProjectDraft(
			@RequestBody CommercialProjectDto commercialProjectDto) {
		CommercialProject commercialProject = commercialProjectService.createDraft(commercialProjectDto);
		if (commercialProject != null) {
			CommercialProjectResponseDto commercialProjectResponseDto = new CommercialProjectResponseDto();
			mapper.map(commercialProject, commercialProjectResponseDto);
			Response<CommercialProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_200, commercialProjectResponseDto,
					Constant.CREATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);

		} else {
			Response<CommercialProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.CREATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PutMapping("/commercial/{commercialProjectId}")
	public ResponseEntity<Response<CommercialProjectResponseDto>> updateCommercialProjectById(
			@PathVariable Long commercialProjectId,
			@Valid @RequestBody CommercialProjectDto commercialProjectDto) {
		CommercialProject commercialProject = commercialProjectService.update(commercialProjectId,
				commercialProjectDto);
		if (commercialProject != null) {
			CommercialProjectResponseDto commercialProjectResponseDto = new CommercialProjectResponseDto();
			mapper.map(commercialProject, commercialProjectResponseDto);
			Response<CommercialProjectResponseDto> response = new Response<>(200, commercialProjectResponseDto,
					Constant.UPDATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<CommercialProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.UPDATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PutMapping("/commercial/draft/{commercialProjectId}")
	public ResponseEntity<Response<CommercialProjectResponseDto>> updateCommercialProjectByIdDraft(
			@PathVariable Long commercialProjectId,
			@RequestBody CommercialProjectDto commercialProjectDto) {
		CommercialProject commercialProject = commercialProjectService.updateDraft(commercialProjectId,
				commercialProjectDto);
		if (commercialProject != null) {
			CommercialProjectResponseDto commercialProjectResponseDto = new CommercialProjectResponseDto();
			mapper.map(commercialProject, commercialProjectResponseDto);
			Response<CommercialProjectResponseDto> response = new Response<>(200, commercialProjectResponseDto,
					Constant.UPDATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<CommercialProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.UPDATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@GetMapping("/idea/{ideaProjectId}")
	public ResponseEntity<Response<IdeaProjectResponseDto>> getOneByIdeaProjectId(@PathVariable Long ideaProjectId) {
		IdeaProject ideaProject = ideaProjectService.getById(ideaProjectId);
		if (ideaProject != null) {
			IdeaProjectResponseDto ideaProjectResponseDto = new IdeaProjectResponseDto();
			mapper.map(ideaProject, ideaProjectResponseDto);
			Response<IdeaProjectResponseDto> response = new Response<>(200, ideaProjectResponseDto,
					Constant.SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<IdeaProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}

	}

	@PostMapping("/idea")
	public ResponseEntity<Response<IdeaProjectResponseDto>> createIdeaProject(
			@Valid @RequestBody IdeaProjectDto ideaProjectDto) {
		IdeaProject ideaProject = ideaProjectService.create(ideaProjectDto);
		if (ideaProject != null) {
			IdeaProjectResponseDto ideaProjectResponseDto = new IdeaProjectResponseDto();
			mapper.map(ideaProject, ideaProjectResponseDto);
			Response<IdeaProjectResponseDto> response = new Response<>(200, ideaProjectResponseDto,
					Constant.CREATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<IdeaProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.CREATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PostMapping("/idea/draft")
	public ResponseEntity<Response<IdeaProjectResponseDto>> createIdeaProjectDraft(
			@RequestBody IdeaProjectDto ideaProjectDto) {
		IdeaProject ideaProject = ideaProjectService.createDraft(ideaProjectDto);
		if (ideaProject != null) {
			IdeaProjectResponseDto ideaProjectResponseDto = new IdeaProjectResponseDto();
			mapper.map(ideaProject, ideaProjectResponseDto);
			Response<IdeaProjectResponseDto> response = new Response<>(200, ideaProjectResponseDto,
					Constant.CREATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<IdeaProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.CREATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PutMapping("/idea/{ideaProjectId}")
	public ResponseEntity<Response<IdeaProjectResponseDto>> updateIdeaProjectById(@PathVariable Long ideaProjectId,
			@Valid @RequestBody IdeaProjectDto ideaProjectDto) {
		IdeaProject ideaProject = ideaProjectService.update(ideaProjectId,
				ideaProjectDto);
		if (ideaProject != null) {
			IdeaProjectResponseDto ideaProjectResponseDto = new IdeaProjectResponseDto();
			mapper.map(ideaProject, ideaProjectResponseDto);
			Response<IdeaProjectResponseDto> response = new Response<>(200, ideaProjectResponseDto,
					Constant.UPDATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<IdeaProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.UPDATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PutMapping("/idea/draft/{ideaProjectId}")
	public ResponseEntity<Response<IdeaProjectResponseDto>> updateIdeaProjectDraftById(@PathVariable Long ideaProjectId,
			@RequestBody IdeaProjectDto ideaProjectDto) {
		IdeaProject ideaProject = ideaProjectService.updateDraft(ideaProjectId,
				ideaProjectDto);
		if (ideaProject != null) {
			IdeaProjectResponseDto ideaProjectResponseDto = new IdeaProjectResponseDto();
			mapper.map(ideaProject, ideaProjectResponseDto);
			Response<IdeaProjectResponseDto> response = new Response<>(200, ideaProjectResponseDto,
					Constant.UPDATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<IdeaProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.UPDATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PostMapping("/researching")
	public ResponseEntity<Response<ResearchingProjectResponseDto>> createResearchingProject(
			@Valid @RequestBody ResearchingProjectDto researchingProjectDto) {
		researchingProjectDto.setStatusId(Constant.PROJECT_CODE_CD);
		ResearchingProject researchingProject = researchingProjectService
				.create(researchingProjectDto);
		if (researchingProject != null) {
			ResearchingProjectResponseDto researchingProjectResponseDto = new ResearchingProjectResponseDto();
			mapper.map(researchingProject, researchingProjectResponseDto);
			Response<ResearchingProjectResponseDto> response = new Response<>(200, researchingProjectResponseDto,
					Constant.CREATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<ResearchingProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.CREATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PostMapping("/researching/draft")
	public ResponseEntity<Response<ResearchingProjectResponseDto>> createResearchingProjectDraft(
			@RequestBody ResearchingProjectDto researchingProjectDto) {
		ResearchingProject researchingProject = researchingProjectService
				.createDraft(researchingProjectDto);
		if (researchingProject != null) {
			ResearchingProjectResponseDto researchingProjectResponseDto = new ResearchingProjectResponseDto();
			mapper.map(researchingProject, researchingProjectResponseDto);
			Response<ResearchingProjectResponseDto> response = new Response<>(200, researchingProjectResponseDto,
					Constant.CREATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<ResearchingProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.CREATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PutMapping("/researching/{researchingProjectId}")
	public ResponseEntity<Response<ResearchingProjectResponseDto>> updateResearchingProjectById(
			@PathVariable Long researchingProjectId,
			@Valid @RequestBody ResearchingProjectDto researchingProjectDto) {
		researchingProjectDto.setStatusId(Constant.PROJECT_CODE_CD);
		ResearchingProject researchingProject = researchingProjectService.update(researchingProjectId,
				researchingProjectDto);
		if (researchingProject != null) {
			ResearchingProjectResponseDto researchingProjectResponseDto = new ResearchingProjectResponseDto();
			mapper.map(researchingProject, researchingProjectResponseDto);
			Response<ResearchingProjectResponseDto> response = new Response<>(200, researchingProjectResponseDto,
					Constant.UPDATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		}

		else {
			Response<ResearchingProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.UPDATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PutMapping("/researching/draft/{researchingProjectId}")
	public ResponseEntity<Response<ResearchingProjectResponseDto>> updateResearchingProjectDraftById(
			@PathVariable Long researchingProjectId,
			@RequestBody ResearchingProjectDto researchingProjectDto) {
		ResearchingProject researchingProject = researchingProjectService.updateDraft(researchingProjectId,
				researchingProjectDto);
		if (researchingProject != null) {
			ResearchingProjectResponseDto researchingProjectResponseDto = new ResearchingProjectResponseDto();
			mapper.map(researchingProject, researchingProjectResponseDto);
			Response<ResearchingProjectResponseDto> response = new Response<>(200, researchingProjectResponseDto,
					Constant.UPDATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		}

		else {
			Response<ResearchingProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.UPDATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@GetMapping("/researching/{researchingProjectId}")
	public ResponseEntity<Response<ResearchingProjectResponseDto>> getOneByResearchingProjectId(
			@PathVariable Long researchingProjectId) {
		ResearchingProject researchingProject = researchingProjectService.getById(researchingProjectId);
		if (researchingProject != null) {
			ResearchingProjectResponseDto researchingProjectResponseDto = new ResearchingProjectResponseDto();
			mapper.map(researchingProject, researchingProjectResponseDto);
			Response<ResearchingProjectResponseDto> response = new Response<>(200, researchingProjectResponseDto,
					Constant.SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<ResearchingProjectResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@DeleteMapping("/delete/{projectId}")
	public ResponseEntity<Response<Boolean>> deleteProject(
			@PathVariable("projectId") Long projectId) {
		boolean check = projectService.deleteById(projectId);
		if (check) {
			Response<Boolean> response = new Response<>(200, true,
					Constant.DELETE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<Boolean> response = new Response<>(400, false,
					Constant.DELETE_FAILED_MESSAGE);
			return ResponseEntity.ok().body(response);
		}
	}
}
