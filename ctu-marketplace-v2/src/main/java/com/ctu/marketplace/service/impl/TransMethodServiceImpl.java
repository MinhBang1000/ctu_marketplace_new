package com.ctu.marketplace.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.TransMethodDto;
import com.ctu.marketplace.entity.TransMethod;
import com.ctu.marketplace.repository.TransMethodRepository;
import com.ctu.marketplace.service.TransMethodService;

@Service
public class TransMethodServiceImpl implements TransMethodService {

    @Autowired
    private TransMethodRepository transMethodRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public TransMethod getById(Long transMethodId) {
        return transMethodRepository.findById(transMethodId).orElse(null);
    }

    @Override
    public List<TransMethod> getAll() {
        return transMethodRepository.findAll();
    }

    @Override
    public TransMethod create(TransMethodDto transMethodDto) {
        try {
            List<TransMethod> findTransMethod = transMethodRepository.findByIdOrCode(transMethodDto.getId(),
                    transMethodDto.getCode());
            if (!findTransMethod.isEmpty())
                return null;
            TransMethod transMethod = new TransMethod();
            mapper.map(transMethodDto, transMethod);
            return transMethodRepository.save(transMethod);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteById(Long transMethodId) {
        try {
            transMethodRepository.deleteById(transMethodId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public TransMethod update(Long transMethodId, TransMethodDto transMethodDto) {
        try {
            TransMethod transMethod = transMethodRepository.findById(transMethodId).orElse(null);
            if (transMethod == null)
                return null;
            if (!transMethod.getCode().equals(transMethodDto.getCode())
                    && transMethodRepository.findByCode(transMethodDto.getCode()).orElse(null) != null)
                return null;
            transMethod.setCode(transMethodDto.getCode());
            transMethod.setName(transMethodDto.getName());
            return transMethodRepository.save(transMethod);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
