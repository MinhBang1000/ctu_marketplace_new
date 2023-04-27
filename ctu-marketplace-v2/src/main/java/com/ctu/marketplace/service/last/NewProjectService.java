package com.ctu.marketplace.service.last;

import com.ctu.marketplace.dto.last.KeyValueDTO;
import com.ctu.marketplace.dto.last.response.NewProjectDTO;
import com.ctu.marketplace.entity.FkeyValue;
import com.ctu.marketplace.entity.NewProject;
import com.ctu.marketplace.entity.Status;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.FkeyValueRepository;
import com.ctu.marketplace.repository.NewProjectRepository;
import com.ctu.marketplace.repository.UserProfileRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    private FkeyValueRepository fkeyValueRepository;

    public NewProject create(NewProject instance, List<KeyValueDTO> keyValues) {
        NewProject newProject = this.newProjectRepository.save(instance);
        keyValues.stream().forEach(
                (item) -> {
                    FkeyValue keyValue = (new ModelMapper()).map(item, FkeyValue.class);
                    keyValue.setProject(newProject);
                    newProject.addKeyValue(this.fkeyValueRepository.save(keyValue));
                }
        );
        return this.newProjectRepository.save(newProject);
    }

    public List<NewProject> getAll() {
        return this.newProjectRepository.findAll();
    }
    public List<NewProject> getAllTemplate() {
        return this.newProjectRepository.findAllByIsTemplate(true);
    }

    public NewProject get(Long id) throws NoSuchElementException{
        return this.newProjectRepository.findById(id).get();
    }

    public NewProject update(NewProject instance, List<KeyValueDTO> keyValues) throws  NoSuchElementException{
        NewProject exists = this.newProjectRepository.findById(instance.getId()).get();
        // setting auth value for exists
        instance.setUser(exists.getUser());
        instance.setApprover(exists.getApprover());
        instance.setStatus(exists.getStatus());
        instance.setTemplate(exists.isTemplate());
        instance.setActive(exists.isActive());
        Set<FkeyValue> existsKeyValues = exists.getKeyValues();
        // delete old version of fields
        existsKeyValues.stream().forEach(
                (item) -> {
                    this.fkeyValueRepository.deleteById(item.getId());
                }
        );
        // add new fields
        keyValues.stream().forEach(
                (item) -> {
                    FkeyValue keyValue = (new ModelMapper()).map(item, FkeyValue.class);
                    keyValue.setProject(instance);
                    instance.addKeyValue(this.fkeyValueRepository.save(keyValue));
                }
        );
        return this.newProjectRepository.save(instance);
    }
    public NewProject approve(Status status, Long id) throws NoSuchElementException{
        NewProject instance = this.newProjectRepository.findById(id).get();
        instance.setStatus(status);
        UserProfile user = this.userProfileRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).get();
        instance.setApprover(user);
        return this.newProjectRepository.save(instance);
    }

    public void delete(Long id) throws  NoSuchElementException {
        this.newProjectRepository.deleteById(id);
    }
}
