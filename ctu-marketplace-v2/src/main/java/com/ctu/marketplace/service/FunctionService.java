package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.FunctionDto;
import com.ctu.marketplace.entity.Function;

public interface FunctionService {
    List<Function> getAll();

    List<Function> getAllByRoleCode(String code);

    List<Function> getAllByRoleId(Long roleId);

    Function getById(Long functionId);

    Function create(FunctionDto functionDto);

    Function update(Long functionId, FunctionDto functionDto);

    boolean deleteById(Long functionId);
}
