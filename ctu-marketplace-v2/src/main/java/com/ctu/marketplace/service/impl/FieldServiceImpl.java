package com.ctu.marketplace.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.FieldDto;
import com.ctu.marketplace.entity.Field;
import com.ctu.marketplace.repository.FieldRepository;
import com.ctu.marketplace.service.FieldService;

@Service
public class FieldServiceImpl implements FieldService {

    @Autowired
    private FieldRepository fieldRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public Field create(FieldDto fieldDto) {
        try {
            Field field = new Field();
            Field findField = fieldRepository.findById(fieldDto.getId()).orElse(null);
            if (findField != null)
                return null;
            mapper.map(fieldDto, field);
            Field f = fieldRepository.findById(fieldDto.getChildOfFieldId()).orElse(null);
            if (f == null) {
                return null;
            } else {
                field.setChildOfFieldId(f);
            }
            return fieldRepository.save(field);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteById(Long fieldId) {
        try {
            fieldRepository.deleteById(fieldId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public Field getById(Long fieldId) {
        return fieldRepository.findById(fieldId).orElse(null);

    }

    @Override
    public List<Field> getAll() {
        return fieldRepository.findByChildOfFieldIdIsNull();
    }

    @Override
    public Field update(Long fieldId, FieldDto fieldDto) {
        try {
            Field field = fieldRepository.findById(fieldId).orElse(null);
            if (field == null)
                return null;
            field.setName(fieldDto.getName());
            field.setChildOfFieldId(fieldRepository.findById(fieldDto.getChildOfFieldId()).orElse(null));
            return fieldRepository.save(field);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
