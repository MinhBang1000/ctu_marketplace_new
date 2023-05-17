package com.ctu.marketplace.service.last;

import com.ctu.marketplace.dto.last.FieldDTO;
import com.ctu.marketplace.dto.last.KeyValueDTO;
import com.ctu.marketplace.dto.last.request.NewProjectRequestDTO;
import com.ctu.marketplace.dto.last.response.NewProjectDTO;
import com.ctu.marketplace.entity.*;
import com.ctu.marketplace.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.xml.crypto.dsig.keyinfo.KeyValue;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class NewProjectService {
    @Autowired
    private NewProjectRepository newProjectRepository;
    @Autowired
    private UserProfileRepository userProfileRepository;
    @Autowired
    private NewFieldRepository fieldRepository;
    @Autowired
    private StatusRepository statusRepository;
    @Autowired
    private FkeyValueRepository fkeyValueRepository;
    public NewProject create(NewProject instance, List<KeyValueDTO> keyValues, List<Long> fieldIds) throws NoSuchElementException{
        NewProject newProject = this.newProjectRepository.save(instance);
        keyValues.stream().forEach(
                (item) -> {
                    FkeyValue keyValue = (new ModelMapper()).map(item, FkeyValue.class);
                    keyValue.setProject(newProject);
                    newProject.addKeyValue(this.fkeyValueRepository.save(keyValue));
                }
        );
        fieldIds.stream().forEach((item) -> {
            NewField field = this.fieldRepository.findById(item).get();
            newProject.addField(field);
        });
        return this.newProjectRepository.save(newProject);
    }
    public List<NewProject> getAll() {
        return this.newProjectRepository.findAll();
    }
    public List<NewProject> getAllTemplate() {
        return this.newProjectRepository.findAllByIsTemplate(true);
    }
    public List<NewProject> searchProjects(String search) {
        return this.newProjectRepository.findByNameContaining(search);
    }
    public NewProject get(Long id) throws NoSuchElementException{
        return this.newProjectRepository.findById(id).get();
    }
    public NewProject update(NewProjectRequestDTO dto, Long id) throws  NoSuchElementException{
        NewProject exists = this.newProjectRepository.findById(id).get();
        exists.getKeyValues().removeIf(c -> c.getProject().getId() == exists.getId());
        exists.setAuthor(dto.getAuthor());
        exists.setName(dto.getName());
        exists.setImage(dto.getImage());
        exists.setIntroduction(dto.getIntroduction());
        Set<NewField> fieldSet = dto.getFieldIds().stream().map((item) -> {
            return this.fieldRepository.findById(item).get();
        }).collect(Collectors.toSet());
        exists.setFields(fieldSet);
        exists.setStatus(this.statusRepository.findByCode("CD").get());
        dto.getKeyValues().forEach((item) -> {
            FkeyValue fkeyValue = new FkeyValue();
            fkeyValue.setProject(exists);
            fkeyValue.setValue(item.getValue());
            fkeyValue.setKey(item.getKey());
            exists.addKeyValue(this.fkeyValueRepository.save(fkeyValue));
        });
        return this.newProjectRepository.save(exists);
    }
    public NewProject approve(Status status, Long id) throws NoSuchElementException{
        NewProject instance = this.newProjectRepository.findById(id).get();
        instance.setStatus(status);
        UserProfile user = this.userProfileRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).get();
        instance.setApprover(user);
        return this.newProjectRepository.save(instance);
    }
    public void delete(Long id) throws Exception {
        NewProject instance = this.newProjectRepository.findById(id).get();
        instance.setFields(new HashSet<>());
        this.newProjectRepository.save(instance);
        this.newProjectRepository.deleteById(id);
    }
}
