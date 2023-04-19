package com.ctu.marketplace.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.DevLevelDto;
import com.ctu.marketplace.entity.DevLevel;
import com.ctu.marketplace.repository.DevLevelRepository;
import com.ctu.marketplace.service.DevLevelService;

@Service
public class DevLevelServiceImpl implements DevLevelService {

    @Autowired
    private DevLevelRepository devLevelRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<DevLevel> getAll() {
        return devLevelRepository.findAll();
    }

    @Override
    public DevLevel getById(Long devLevelId) {
        return devLevelRepository.findById(devLevelId).orElse(null);
    }

    @Override
    public DevLevel create(DevLevelDto devLevelDto) {
        try {
            List<DevLevel> findDevLevel = devLevelRepository.findByIdOrCode(devLevelDto.getId(), devLevelDto.getCode());
            if (!findDevLevel.isEmpty())
                return null;
            DevLevel devLevel = new DevLevel();
            mapper.map(devLevelDto, devLevel);
            return devLevelRepository.save(devLevel);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public DevLevel update(Long devLevelId, DevLevelDto devLevelDto) {
        try {
            DevLevel devLevel = devLevelRepository.findById(devLevelId).orElse(null);
            if (devLevel == null)
                return null;
            if (!devLevel.getCode().equals(devLevelDto.getCode())
                    && devLevelRepository.findByCode(devLevelDto.getCode()).orElse(null) != null)
                return null;
            devLevel.setCode(devLevelDto.getCode());
            devLevel.setName(devLevelDto.getName());
            return devLevelRepository.save(devLevel);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteById(Long devLevelId) {
        try {
            devLevelRepository.deleteById(devLevelId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
