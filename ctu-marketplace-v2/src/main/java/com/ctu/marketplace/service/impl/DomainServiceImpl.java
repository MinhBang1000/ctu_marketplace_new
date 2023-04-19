package com.ctu.marketplace.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.DomainDto;
import com.ctu.marketplace.entity.Domain;
import com.ctu.marketplace.repository.DomainRepository;
import com.ctu.marketplace.service.DomainService;

@Service
public class DomainServiceImpl implements DomainService {

    @Autowired
    private DomainRepository domainRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Domain> getAll() {
        return domainRepository.findAll();
    }

    @Override
    public Domain getById(Long id) {
        return domainRepository.findById(id).orElse(null);
    }

    @Override
    public Domain create(DomainDto domainDto) {
        try {
            List<Domain> findDomain = domainRepository.findByIdOrCode(domainDto.getId(), domainDto.getCode());
            if (!findDomain.isEmpty())
                return null;
            Domain domain = new Domain();
            mapper.map(domainDto, domain);
            return domainRepository.save(domain);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Domain update(Long domainId, DomainDto domainDto) {
        try {
            Domain domain = domainRepository.findById(domainId).orElse(null);
            if (domain == null)
                return null;
            if (!domain.getCode().equals(domainDto.getCode())
                    && domainRepository.findByCode(domainDto.getCode()).orElse(null) != null)
                return null;
            domain.setCode(domainDto.getCode());
            domain.setName(domainDto.getName());
            return domainRepository.save(domain);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteById(Long domainId) {
        try {
            domainRepository.deleteById(domainId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
