package com.ctu.marketplace.service.last;

import com.ctu.marketplace.entity.FkeyValue;
import com.ctu.marketplace.repository.FkeyValueRepository;
import com.ctu.marketplace.repository.NewProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KeyValueService {
    @Autowired
    private FkeyValueRepository fkeyValueRepository;
    @Autowired
    private NewProjectRepository newProjectRepository;
    public FkeyValue create(FkeyValue instance) {
        return this.fkeyValueRepository.save(instance);
    }

    public void delete(Long id) {
        this.fkeyValueRepository.deleteById(id);
    }



}
