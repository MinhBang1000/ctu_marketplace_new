package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.StatusDto;
import com.ctu.marketplace.entity.Status;

public interface StatusService {
    List<Status> getAll();

    Status getById(Long statusId);

    Status create(StatusDto statusDto);

    Status update(Long statusId, StatusDto statusDto);

    boolean deleteById(Long statusId);

    Status getByCode(String code);
}
