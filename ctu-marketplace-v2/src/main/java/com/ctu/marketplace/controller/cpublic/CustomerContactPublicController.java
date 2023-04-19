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
import com.ctu.marketplace.dto.request.CustomerContactDto;
import com.ctu.marketplace.dto.response.CustomerContactResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.CustomerContact;
import com.ctu.marketplace.service.CustomerContactService;

@RestController
@RequestMapping(BaseURL.PUBLIC)
public class CustomerContactPublicController {
    @Autowired
    private CustomerContactService customerContactService;
    @Autowired
    private ModelMapper mapper;

    @CrossOrigin
    @PostMapping("customer-contact")
    public ResponseEntity<Response<CustomerContactResponseDto>> create(
            @RequestBody CustomerContactDto customerContactDto) {
        CustomerContact customerContact = customerContactService.create(customerContactDto);
        CustomerContactResponseDto customerContactResponseDto = new CustomerContactResponseDto();
        mapper.map(customerContact, customerContactResponseDto);
        Response<CustomerContactResponseDto> response = new Response<>(Constant.STATUS_CODE_200, customerContactResponseDto,
                Constant.CREATE_SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }
}
