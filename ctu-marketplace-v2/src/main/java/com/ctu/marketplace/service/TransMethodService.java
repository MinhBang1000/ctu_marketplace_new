package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.TransMethodDto;
import com.ctu.marketplace.entity.TransMethod;

public interface TransMethodService {
     List<TransMethod> getAll();

     TransMethod getById(Long transMethodId);

     TransMethod create(TransMethodDto transMethodDto);

     TransMethod update(Long transMethodId, TransMethodDto transMethodDto);

     boolean deleteById(Long transMethodId);
}
