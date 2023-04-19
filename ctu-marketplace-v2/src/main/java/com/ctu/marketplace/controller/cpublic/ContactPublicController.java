package com.ctu.marketplace.controller.cpublic;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.request.ContactDto;
import com.ctu.marketplace.dto.response.ContactResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Contact;
import com.ctu.marketplace.service.ContactService;

@RestController
@RequestMapping(BaseURL.PUBLIC)
public class ContactPublicController {
    @Autowired
    private ContactService contactService;
    @Autowired
    private ModelMapper mapper;

    @CrossOrigin
    @PostMapping("/contact")
    public ResponseEntity<Response<ContactResponseDto>> create(@RequestBody ContactDto contactDto) {
        Contact contact = contactService.create(contactDto);
        ContactResponseDto contactResponseDto = new ContactResponseDto();
        mapper.map(contact, contactResponseDto);
        Response<ContactResponseDto> response = new Response<>(Constant.STATUS_CODE_200, contactResponseDto,
                Constant.CREATE_SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }
}
