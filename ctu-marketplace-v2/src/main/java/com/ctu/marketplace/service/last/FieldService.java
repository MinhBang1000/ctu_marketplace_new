package com.ctu.marketplace.service.last;

import com.ctu.marketplace.dto.last.FieldDTO;
import com.ctu.marketplace.entity.Field;
import com.ctu.marketplace.entity.NewField;
import com.ctu.marketplace.repository.FieldRepository;
import com.ctu.marketplace.repository.NewFieldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FieldService {
    @Autowired
    private NewFieldRepository fieldRepository;

    public List<NewField> getAll() {
        return this.fieldRepository.findAll();
    }
    public NewField create(NewField newField) throws Exception {
        return this.fieldRepository.save(newField);
    }
    public void delete(Long newFieldId) throws Exception{
        this.fieldRepository.deleteById(newFieldId);
    }
}
