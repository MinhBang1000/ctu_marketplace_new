package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.RoleOfGroupDto;
import com.ctu.marketplace.entity.RoleOfGroup;

public interface RoleOfGroupService {
    public List<RoleOfGroup> getAll();
    public RoleOfGroup getById(Long roleOfGroupId);
    public RoleOfGroup create(RoleOfGroupDto roleOfGroupDto);
    public RoleOfGroup update(Long roleOfGroupid, RoleOfGroupDto roleOfGroupDto);
    public Boolean deleteById(Long roleOfGroupId);
}
