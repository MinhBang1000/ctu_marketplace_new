package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.FieldDto;
import com.ctu.marketplace.entity.Field;

public interface FieldService {
    Field getById(Long fieldId);

    List<Field> getAll();

    Field create(FieldDto fieldDto);

    Field update(Long fieldId, FieldDto fieldDto);

    boolean deleteById(Long fieldId);
}
