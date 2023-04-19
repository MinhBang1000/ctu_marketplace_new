package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.CustomerContactDto;
import com.ctu.marketplace.entity.CustomerContact;

public interface CustomerContactService {
    CustomerContact getById(Long customerContactId);

    List<CustomerContact> getAllByUserAdmin(Long userAdminId);

    List<CustomerContact> getAllByDomainId(Long domainId);

    List<CustomerContact> getAllByDomainCTUAndKHC();

    CustomerContact create(CustomerContactDto customerContactDto);

    CustomerContact update(Long customerContactId);

    Boolean deleteById(Long customerContactId);
}
