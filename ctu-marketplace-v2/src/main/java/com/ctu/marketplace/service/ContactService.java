package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.ContactDto;
import com.ctu.marketplace.entity.Contact;

public interface ContactService {
    public Contact getById(Long contactId);
    public List<Contact> getAll();
    public Contact create(ContactDto contactDto);
    public Contact update(Long contactId);
    public Boolean deleteById(Long contactId);
}
