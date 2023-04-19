package com.ctu.marketplace.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.RoleOfGroupDto;
import com.ctu.marketplace.entity.RoleOfGroup;
import com.ctu.marketplace.repository.RoleOfGroupRepository;
import com.ctu.marketplace.service.RoleOfGroupService;

@Service
public class RoleOfGroupServiceImpl implements RoleOfGroupService {

    @Autowired
    private RoleOfGroupRepository roleOfGroupRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<RoleOfGroup> getAll() {
        return roleOfGroupRepository.findAll();
    }

    @Override
    public RoleOfGroup getById(Long id) {
        return roleOfGroupRepository.findById(id).orElse(null);
    }

    @Override
    public RoleOfGroup create(RoleOfGroupDto roleOfGroupDto) {
        try {
            List<RoleOfGroup> findRoleOfGroup = roleOfGroupRepository.findByIdOrCode(roleOfGroupDto.getId(),
                    roleOfGroupDto.getCode());
            if (!findRoleOfGroup.isEmpty())
                return null;
            RoleOfGroup roleOfGroup = new RoleOfGroup();
            mapper.map(roleOfGroupDto, roleOfGroup);
            return roleOfGroupRepository.save(roleOfGroup);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public RoleOfGroup update(Long roleOfGroupId, RoleOfGroupDto roleOfGroupDto) {
        try {
            RoleOfGroup roleOfGroup = roleOfGroupRepository.findById(roleOfGroupId).orElse(null);
            if (roleOfGroup == null)
                return null;
            if (!roleOfGroup.getCode().equals(roleOfGroupDto.getCode())
                    && roleOfGroupRepository.findByCode(roleOfGroupDto.getCode()).orElse(null) != null)
                return null;
            roleOfGroup.setCode(roleOfGroupDto.getCode());
            roleOfGroup.setName(roleOfGroupDto.getName());
            return roleOfGroupRepository.save(roleOfGroup);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean deleteById(Long roleOfGroupId) {
        try {
            roleOfGroupRepository.deleteById(roleOfGroupId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
