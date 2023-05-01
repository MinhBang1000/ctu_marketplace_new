package com.ctu.marketplace.service.last;

import com.ctu.marketplace.entity.Field;
import com.ctu.marketplace.repository.FieldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FieldService {
    @Autowired
    private FieldRepository fieldRepository;

    public List<Field> getAll() {
        return this.fieldRepository.findAll();
    }
}
