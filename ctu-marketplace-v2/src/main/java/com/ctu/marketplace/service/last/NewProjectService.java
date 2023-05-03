package com.ctu.marketplace.service.last;

import com.ctu.marketplace.dto.last.FieldDTO;
import com.ctu.marketplace.dto.last.KeyValueDTO;
import com.ctu.marketplace.dto.last.response.NewProjectDTO;
import com.ctu.marketplace.entity.*;
import com.ctu.marketplace.repository.FieldRepository;
import com.ctu.marketplace.repository.FkeyValueRepository;
import com.ctu.marketplace.repository.NewProjectRepository;
import com.ctu.marketplace.repository.UserProfileRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.xml.crypto.dsig.keyinfo.KeyValue;
import java.util.*;

@Service
public class NewProjectService {
    @Autowired
    private NewProjectRepository newProjectRepository;
    @Autowired
    private UserProfileRepository userProfileRepository;
    @Autowired
    private FieldRepository fieldRepository;
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
            Field field = this.fieldRepository.findById(item).get();
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
    public NewProject update(NewProject instance, List<KeyValueDTO> keyValues, Set<Field> setFields) throws  NoSuchElementException{
        NewProject exists = this.newProjectRepository.findById(instance.getId()).get();
        // setting auth value for exists
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserProfile currentUser = this.userProfileRepository.findByUsername(auth.getName()).get();
        if (currentUser.getId() != exists.getUser().getId()) {
            throw new NoSuchElementException("You are not onwer of this projects!");
        }
        instance.setUser(exists.getUser());
        instance.setApprover(exists.getApprover());
        instance.setStatus(exists.getStatus());
        instance.setTemplate(exists.isTemplate());
        Set<FkeyValue> existsKeyValues = exists.getKeyValues();
        // delete old version of key values
        existsKeyValues.stream().forEach(
                (item) -> {
                    this.fkeyValueRepository.deleteById(item.getId());
                }
        );
        // add new key values
        keyValues.stream().forEach(
                (item) -> {
                    FkeyValue keyValue = (new ModelMapper()).map(item, FkeyValue.class);
                    keyValue.setProject(instance);
                    instance.addKeyValue(this.fkeyValueRepository.save(keyValue));
                }
        );
        // update fields
        instance.setFields(setFields);
        return this.newProjectRepository.save(instance);
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
