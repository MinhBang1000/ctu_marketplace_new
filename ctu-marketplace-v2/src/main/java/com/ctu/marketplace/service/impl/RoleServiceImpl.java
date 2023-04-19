package com.ctu.marketplace.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.RoleDto;
import com.ctu.marketplace.entity.Role;
import com.ctu.marketplace.repository.RoleRepository;
import com.ctu.marketplace.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    @Override
    public Role getById(Long roleId) {
        return roleRepository.findById(roleId).orElse(null);
    }

    @Override
    public Role create(RoleDto roleDto) {
        try {
            List<Role> findRole = roleRepository.findByIdOrCode(roleDto.getId(), roleDto.getCode());
            if (!findRole.isEmpty())
                return null;
            Role role = new Role();
            mapper.map(roleDto, role);
            return roleRepository.save(role);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public Role update(Long roleId, RoleDto roleDto) {
        try {
            Role role = roleRepository.findById(roleId).orElse(null);
            if (role == null)
                return null;
            if (!role.getCode().equals(roleDto.getCode())
                    && roleRepository.findByCode(roleDto.getCode()).orElse(null) != null)
                return null;
            role.setCode(roleDto.getCode());
            role.setName(roleDto.getName());
            return roleRepository.save(role);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean deleteById(Long roleId) {
        try {
            roleRepository.deleteById(roleId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
