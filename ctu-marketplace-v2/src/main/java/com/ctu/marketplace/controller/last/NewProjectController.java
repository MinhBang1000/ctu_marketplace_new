package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.dto.last.request.NewProjectRequestDTO;
import com.ctu.marketplace.dto.last.response.NewProjectDTO;
import com.ctu.marketplace.entity.FkeyValue;
import com.ctu.marketplace.entity.NewProject;
import com.ctu.marketplace.entity.Status;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.service.FieldService;
import com.ctu.marketplace.service.StatusService;
import com.ctu.marketplace.service.UserProfileService;
import com.ctu.marketplace.service.impl.UserProfileServiceImpl;
import com.ctu.marketplace.service.last.KeyValueService;
import com.ctu.marketplace.service.last.NewProjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v3/projects")
public class NewProjectController {
    @Autowired
    private NewProjectService newProjectService;
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private FieldService fieldService;
    @Autowired
    private KeyValueService keyValueService;
    @Autowired
    private StatusService statusService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("")
    public ResponseEntity<List<NewProjectDTO>> getAll(@RequestParam(value = "is_template", required = false) Boolean isTemplate) {
        List<NewProject> list = new LinkedList<>();
        if (isTemplate != null) {
            list = this.newProjectService.getAllTemplate();
        }else{
            list = this.newProjectService.getAll();
        }
        List<NewProjectDTO> dtos = list.stream().map(
                (item) -> {
                    NewProjectDTO dto = mapper.map(item, NewProjectDTO.class);
                    return dto;
                }
        ).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<NewProjectDTO> get(@PathVariable Long projectId) {
        NewProjectDTO dto = this.mapper.map(this.newProjectService.get(projectId), NewProjectDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<NewProjectDTO> createNewProject(@RequestBody NewProjectRequestDTO newProjectDTO) {
        NewProject newProject = new NewProject();
        newProject.setName(newProjectDTO.getName());
        newProject.setAuthor(newProjectDTO.getAuthor());
        // find  fix auto get user --> First time approverId is UserId
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserProfile userProfile = this.userProfileService.getByUsername(auth.getName());
        newProject.setUser(userProfile);
        newProject.setApprover(userProfile);
        newProject.setField(this.fieldService.getById(newProjectDTO.getFieldId()));
        // Status
        newProject.setStatus(this.statusService.getById(newProjectDTO.getStatusId()));
        // to list
        NewProject newInstance = this.newProjectService.create(
                newProject,
                newProjectDTO.getKeyValues()
        );
        NewProjectDTO dto = this.mapper.map(newInstance, NewProjectDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<NewProjectDTO> updateNewProject(@RequestBody NewProjectRequestDTO newProjectRequestDTO, @PathVariable Long projectId) {
        NewProject newProject = new NewProject();
        newProject.setName(newProjectRequestDTO.getName());
        newProject.setAuthor(newProjectRequestDTO.getAuthor());
        newProject.setId(projectId);
        newProject.setField(this.fieldService.getById(newProjectRequestDTO.getFieldId()));
        NewProjectDTO dto = this.mapper.map(
            this.newProjectService.update(newProject, newProjectRequestDTO.getKeyValues()),
            NewProjectDTO.class
        );
        return new ResponseEntity<NewProjectDTO>(dto, HttpStatus.OK);
    }

    @PutMapping("/approve/{projectId}")
    public ResponseEntity<String> approveProject(
            @PathVariable Long projectId,
            @RequestParam(value = "TC", required = false) Boolean denied,
            @RequestParam(value = "DD", required = false) Boolean approved){
        Status status = null;
        if (denied != null) {
            status = this.statusService.getByCode("TC");
            this.newProjectService.approve(status, projectId);
        }
        if (approved != null) {
            status = this.statusService.getByCode("DD");
            this.newProjectService.approve(status, projectId);
        }
        return new ResponseEntity<>("Accept successfully!", HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProject(
            @PathVariable Long projectId
    ) {
        this.newProjectService.delete(projectId);
        return new ResponseEntity<>("Deleted instance", HttpStatus.NO_CONTENT);
    }
}
