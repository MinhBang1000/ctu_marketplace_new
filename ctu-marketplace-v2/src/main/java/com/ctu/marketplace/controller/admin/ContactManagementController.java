package com.ctu.marketplace.controller.admin;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.response.ContactResponseDto;
import com.ctu.marketplace.dto.response.CustomerContactResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Contact;
import com.ctu.marketplace.entity.CustomerContact;
import com.ctu.marketplace.service.ContactService;
import com.ctu.marketplace.service.CustomerContactService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/contact-management")
public class ContactManagementController {
    @Autowired
    private ContactService contactService;
    @Autowired
    private CustomerContactService customerContactService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/customer-contact/ctu-khc")
    public ResponseEntity<Response<List<CustomerContactResponseDto>>> getAllByDomainCTUAndKHC() {
        List<CustomerContact> customerContacts = customerContactService.getAllByDomainCTUAndKHC();
        List<CustomerContactResponseDto> customerContactResponseDtos = new ArrayList<>();
        for (CustomerContact customerContact : customerContacts) {
            CustomerContactResponseDto customerContactResponseDto = new CustomerContactResponseDto();
            mapper.map(customerContact, customerContactResponseDto);
            customerContactResponseDtos.add(customerContactResponseDto);
        }
        Response<List<CustomerContactResponseDto>> response = new Response<>(Constant.STATUS_CODE_200, customerContactResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/customer-contact/userId/{userId}")
    public ResponseEntity<Response<List<CustomerContactResponseDto>>> getAllByAdmin(
            @PathVariable Long userId) {
        List<CustomerContact> customerContacts = customerContactService.getAllByUserAdmin(userId);
        List<CustomerContactResponseDto> customerContactResponseDtos = new ArrayList<>();
        for (CustomerContact customerContact : customerContacts) {
            CustomerContactResponseDto customerContactResponseDto = new CustomerContactResponseDto();
            mapper.map(customerContact, customerContactResponseDto);
            customerContactResponseDtos.add(customerContactResponseDto);
        }
        Response<List<CustomerContactResponseDto>> response = new Response<>(Constant.STATUS_CODE_200, customerContactResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/contact")
    public ResponseEntity<Response<List<ContactResponseDto>>> getAllContact() {
        List<Contact> contacts = contactService.getAll();
        List<ContactResponseDto> contactResponseDtos = new ArrayList<>();
        for (Contact contact : contacts) {
            ContactResponseDto contactResponseDto = new ContactResponseDto();
            mapper.map(contact, contactResponseDto);
            contactResponseDtos.add(contactResponseDto);
        }
        Response<List<ContactResponseDto>> response = new Response<>(Constant.STATUS_CODE_200, contactResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/contact/contact-id/{contactId}/status/{isReplied}")
    public ResponseEntity<Response<ContactResponseDto>> update(Long contactId,
            @PathVariable("isReplied") Boolean isReplied) {
        Contact contact = contactService.update(contactId);
        ContactResponseDto contactResponseDto = new ContactResponseDto();
        mapper.map(contact, contactResponseDto);
        Response<ContactResponseDto> response = new Response<>(Constant.STATUS_CODE_200, contactResponseDto, Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

}
