package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.last.request.ImageDTO;
import com.ctu.marketplace.dto.last.request.NewProjectRequestDTO;
import com.ctu.marketplace.dto.last.response.FileResponseDTO;
import com.ctu.marketplace.dto.last.response.FileUploadResponseDTO;
import com.ctu.marketplace.dto.last.response.NewProjectDTO;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.*;
import com.ctu.marketplace.service.FieldService;
import com.ctu.marketplace.service.StatusService;
import com.ctu.marketplace.service.UserProfileService;
import com.ctu.marketplace.service.impl.UserProfileServiceImpl;
import com.ctu.marketplace.service.last.FileService;
import com.ctu.marketplace.service.last.KeyValueService;
import com.ctu.marketplace.service.last.NewProjectService;
import com.ctu.marketplace.upload.FileDownloadUtil;
import com.ctu.marketplace.upload.FileUploadUtil;
import lombok.var;
import org.apache.tomcat.util.bcel.Const;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
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
    @Autowired
    private FileService fileService;
    private String path = "images/";
    @GetMapping("")
    public ResponseEntity<Response<List<NewProjectDTO>>> getAll(
            @RequestParam(value = "is_template", required = false) Boolean isTemplate,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "approve", required = false) Boolean isApproved
    ) {
        List<NewProject> list = new LinkedList<>();
        if (isTemplate != null && isTemplate==true) {
            list = this.newProjectService.getAllTemplate();
        }else{
            if (search != null) {
                list = this.newProjectService.searchProjects(search);
            }else{
                list = this.newProjectService.getAll();
            }
        }
        if (isApproved != null && isApproved==true) {
            list = list.stream().filter((item) -> {
                return item.getStatus().getCode().equals("DD");
            }).collect(Collectors.toList());
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
    public ResponseEntity<Response<NewProjectDTO>> createNewProject(@RequestBody NewProjectRequestDTO newProjectDTO, @RequestParam(value = "is_template",required = false ) Boolean isTemplate) {
        NewProject newProject = new NewProject();
        newProject.setName(newProjectDTO.getName());
        newProject.setAuthor(newProjectDTO.getAuthor());
        newProject.setImage(newProjectDTO.getImage());
        newProject.setIntroduction(newProjectDTO.getIntroduction());
        if (isTemplate != null) {
            newProject.setTemplate(true);
        }
        // find  fix auto get user --> First time approverId is UserId
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String exceptionMsg = "";
        try {
            UserProfile userProfile = this.userProfileService.getByUsername(auth.getName());
            newProject.setUser(userProfile);
            newProject.setApprover(userProfile);
            // Editing fields
            List<Long> fieldId = newProjectDTO.getFieldIds();
            // Status - default is 102 - CD
            newProject.setStatus(this.statusService.getByCode("CD"));
            // to list
            NewProject newInstance = this.newProjectService.create(
                    newProject,
                    newProjectDTO.getKeyValues(),
                    fieldId
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
            NewProjectDTO dto = this.mapper.map(
                    this.newProjectService.update(newProjectRequestDTO, projectId),
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
//            Check
            this.newProjectService.delete(projectId);
            return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_204,"Deleted the instance!", Constant.SUCCESS_MESSAGE), HttpStatus.NO_CONTENT);
        }catch (Exception e) {
            exceptionMsg = e.getMessage();
        }
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_400, null, exceptionMsg),HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/upload-image", consumes = { "multipart/form-data" })
    public ResponseEntity<Response<FileResponseDTO>> fileUpload(@ModelAttribute ImageDTO fileDto) {
        String name = "";
        MultipartFile file = fileDto.getFile();
        try {
            name = this.fileService.uploadImage(path, file);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_400,null, Constant.FAILED_MESSAGE), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_200,new FileResponseDTO(name), Constant.SUCCESS_MESSAGE), HttpStatus.OK);
    }

    @GetMapping(value = "/view-image/{fileName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public void serveImage(
            @PathVariable("fileName") String fileName,
            HttpServletResponse response
    ) throws IOException {
        InputStream resource = this.fileService.getResource(path, fileName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource, response.getOutputStream());
    }
}
