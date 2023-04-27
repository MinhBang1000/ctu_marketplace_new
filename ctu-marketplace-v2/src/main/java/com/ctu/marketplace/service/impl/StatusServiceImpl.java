package com.ctu.marketplace.service.impl;

import java.util.List;
import java.util.NoSuchElementException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.StatusDto;
import com.ctu.marketplace.entity.Status;
import com.ctu.marketplace.repository.StatusRepository;
import com.ctu.marketplace.service.StatusService;

@Service
public class StatusServiceImpl implements StatusService {

    @Autowired
    private StatusRepository statusRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Status> getAll() {
        return statusRepository.findAll();
    }

    @Override
    public Status getById(Long statusId) {
        return statusRepository.findById(statusId).orElse(null);
    }

    @Override
    public Status create(StatusDto statusDto) {
        try {
            List<Status> findStatus = statusRepository.findByIdOrCode(statusDto.getId(), statusDto.getCode());
            if (!findStatus.isEmpty())
                return null;
            Status status = new Status();
            mapper.map(statusDto, status);
            return statusRepository.save(status);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Status update(Long statusId, StatusDto statusDto) {
        try {
            Status status = statusRepository.findById(statusId).orElse(null);
            if (status == null)
                return null;
            if (!status.getCode().equals(statusDto.getCode())
                    && statusRepository.findByCode(statusDto.getCode()).orElse(null) != null)
                return null;
            status.setCode(statusDto.getCode());
            status.setName(statusDto.getName());
            return statusRepository.save(status);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteById(Long statusId) {
        try {
            statusRepository.deleteById(statusId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Status getByCode(String code) throws NoSuchElementException {
        return this.statusRepository.findByCode(code).get();
    }

}
