package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.RoleDto;
import com.ctu.marketplace.entity.Role;

public interface RoleService {
    public List<Role> getAll();
    public Role getById(Long roleId);
    public Role create(RoleDto roleDto);
    public Role update(Long roleId, RoleDto roleDto);
    public Boolean deleteById(Long roleId);
}
