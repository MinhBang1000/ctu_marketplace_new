package com.ctu.marketplace.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.request.CustomerContactDto;
import com.ctu.marketplace.entity.CustomerContact;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.CustomerContactRepository;
import com.ctu.marketplace.service.CustomerContactService;
import com.ctu.marketplace.service.EmailService;
import com.ctu.marketplace.service.ProjectService;
import com.ctu.marketplace.service.UserProfileService;

@Service
public class CustomerContactServiceImpl implements CustomerContactService {

    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private CustomerContactRepository customerContactRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public CustomerContact getById(Long customerContactId) {
        return customerContactRepository.findByIdAndIsDeleted(customerContactId, false).orElse(null);
    }

    @Override
    public List<CustomerContact> getAllByDomainId(Long domainId) {
        return customerContactRepository.findAllByDomainId(domainId);
    }

    @Override
    public CustomerContact create(CustomerContactDto customerContactDto) {
        try {
            CustomerContact customerContact = new CustomerContact();
            mapper.map(customerContactDto, customerContact);
            if (projectService.getById(customerContactDto.getProjectId()) == null)
                return null;
            customerContact.setProject(projectService.getById(customerContactDto.getProjectId()));
            customerContact.setIsReplied(false);
            customerContact.setIsDeleted(false);
            CustomerContact created = customerContactRepository.save(customerContact);
            return created;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public CustomerContact update(Long customerContactId) {
        try {
            CustomerContact customerContact = customerContactRepository.findByIdAndIsDeleted(customerContactId, false)
                    .orElse(null);
            if (customerContact == null)
                return null;
            customerContact.setIsReplied(true);
            CustomerContact updated = customerContactRepository.save(customerContact);
            return updated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean deleteById(Long customerContactId) {
        try {
            CustomerContact customerContact = customerContactRepository.findByIdAndIsDeleted(customerContactId, false)
                    .orElse(null);
            if (customerContact == null)
                return null;
            customerContact.setIsDeleted(true);
            customerContactRepository.save(customerContact);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public List<CustomerContact> getAllByDomainCTUAndKHC() {
        return customerContactRepository.findAllByDomainCTUAndKHC();
    }

    @Override
    public List<CustomerContact> getAllByUserAdmin(Long userId) {
        try {
            UserProfile userProfile = userProfileService.getById(userId);
            if (userProfile == null)
                return null;
            List<CustomerContact> customerContacts = null;
            if (userProfile.getRole().getId() == Constant.ROLE_SUPER_ADMIN_ID) {
                customerContacts = customerContactRepository.findAllByIsDeleted(false);
            }
            if (userProfile.getRole().getId() == Constant.ROLE_ADMIN_ID) {
                if (userProfile.getDomain().getId() == Constant.DOMAIN_CTU_ID) {
                    customerContacts = customerContactRepository.findAllByDomainCTUAndKHC();
                } else {
                    customerContacts = customerContactRepository
                            .findAllByDomainId(userProfile.getDomain().getId());
                }
            }
            return customerContacts;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
