package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.last.request.NewProjectRequestDTO;
import com.ctu.marketplace.dto.last.response.NewProjectDTO;
import com.ctu.marketplace.dto.response.Response;
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
    public ResponseEntity<Response<List<NewProjectDTO>>> getAll(@RequestParam(value = "is_template", required = false) Boolean isTemplate, @RequestParam(value = "search", required = false) String search) {
        List<NewProject> list = new LinkedList<>();
        if (isTemplate != null) {
            list = this.newProjectService.getAllTemplate();
        }else{
            if (search != null) {
                list = this.newProjectService.searchProjects(search);
            }else{
                list = this.newProjectService.getAll();
            }
        }
        List<NewProjectDTO> dtos = list.stream().map(
                (item) -> {
                    NewProjectDTO dto = mapper.map(item, NewProjectDTO.class);
                    return dto;
                }
        ).collect(Collectors.toList());
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_200, dtos ,Constant.SUCCESS_MESSAGE), HttpStatus.OK);
    }
    @GetMapping("/{projectId}")
    public ResponseEntity<Response<NewProjectDTO>> get(@PathVariable Long projectId) {
        try{
            NewProjectDTO dto = this.mapper.map(this.newProjectService.get(projectId), NewProjectDTO.class);
            return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_200,dto,Constant.SUCCESS_MESSAGE), HttpStatus.OK);
        }catch (Exception e) {
            // pass
        }
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_404, null, Constant.FAILED_MESSAGE), HttpStatus.NOT_FOUND);
    }

    @PostMapping("")
    public ResponseEntity<Response<NewProjectDTO>> createNewProject(@RequestBody NewProjectRequestDTO newProjectDTO) {
        NewProject newProject = new NewProject();
        newProject.setName(newProjectDTO.getName());
        newProject.setAuthor(newProjectDTO.getAuthor());
        // find  fix auto get user --> First time approverId is UserId
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String exceptionMsg = "";
        try {
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
            return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_200, dto, Constant.SUCCESS_MESSAGE), HttpStatus.CREATED);
        }catch (Exception e) {
            exceptionMsg = e.getMessage();
        }
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_400, null, exceptionMsg), HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Response<NewProjectDTO>> updateNewProject(@RequestBody NewProjectRequestDTO newProjectRequestDTO, @PathVariable Long projectId) {
        String exceptionMsg = "";
        try{
            NewProject newProject = new NewProject();
            newProject.setName(newProjectRequestDTO.getName());
            newProject.setAuthor(newProjectRequestDTO.getAuthor());
            newProject.setId(projectId);
            newProject.setField(this.fieldService.getById(newProjectRequestDTO.getFieldId()));
            NewProjectDTO dto = this.mapper.map(
                    this.newProjectService.update(newProject, newProjectRequestDTO.getKeyValues()),
                    NewProjectDTO.class
            );
            return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_200, dto, Constant.SUCCESS_MESSAGE), HttpStatus.OK);
        }catch (Exception e){
            exceptionMsg = e.getMessage();
        }
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_400, null, exceptionMsg),HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/approve/{projectId}")
    public ResponseEntity<Response<Object>> approveProject(@PathVariable Long projectId, @RequestParam(value = "TC", required = false) Boolean denied, @RequestParam(value = "DD", required = false) Boolean approved){
        String exceptionMsg = "";
        try{
            Status status = null;
            if (denied != null) {
                status = this.statusService.getByCode("TC");
                this.newProjectService.approve(status, projectId);
            }
            if (approved != null) {
                status = this.statusService.getByCode("DD");
                this.newProjectService.approve(status, projectId);
            }
            return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_200, null, Constant.SUCCESS_MESSAGE), HttpStatus.OK);
        }catch (Exception e){
            exceptionMsg = e.getMessage();
        }
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_400, null, exceptionMsg),HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Response<String>> deleteProject(@PathVariable Long projectId) {
        String exceptionMsg = "";
        try {
            this.newProjectService.delete(projectId);
            return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_204,"Deleted the instance!", Constant.SUCCESS_MESSAGE), HttpStatus.NO_CONTENT);
        }catch (Exception e) {
            exceptionMsg = e.getMessage();
        }
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_400, null, exceptionMsg),HttpStatus.BAD_REQUEST);
    }
}
