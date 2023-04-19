package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.DomainDto;
import com.ctu.marketplace.entity.Domain;

public interface DomainService {
    List<Domain> getAll();

    Domain getById(Long domainId);

    Domain create(DomainDto domainDto);

    Domain update(Long domainId, DomainDto domainDto);

    boolean deleteById(Long domainId);
}
