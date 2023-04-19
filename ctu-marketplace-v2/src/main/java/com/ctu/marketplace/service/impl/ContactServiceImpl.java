package com.ctu.marketplace.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.ContactDto;
import com.ctu.marketplace.entity.Contact;
import com.ctu.marketplace.repository.ContactRepository;
import com.ctu.marketplace.service.ContactService;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public Contact getById(Long id) {
        return contactRepository.findByIdAndIsDeleted(id, false).orElse(null);
    }

    @Override
    public List<Contact> getAll() {
        return contactRepository.findAllByIsDeleted(false);
    }

    @Override
    public Contact create(ContactDto contactDto) {
        try {
            Contact contact = new Contact();
            mapper.map(contactDto, contact);
            contact.setIsReplied(false);
            contact.setIsDeleted(false);
            Contact created = contactRepository.save(contact);
            return created;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Contact update(Long contactId) {
        try {
            Contact contact = contactRepository.findByIdAndIsDeleted(contactId, false).orElse(null);
            if (contact == null)
                return null;
            contact.setIsReplied(true);
            return contactRepository.save(contact);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean deleteById(Long contactId) {
        try {
            Contact contact = contactRepository.findByIdAndIsDeleted(contactId, false).orElse(null);
            if (contact == null)
                return null;
            contact.setIsDeleted(true);
            contactRepository.save(contact);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
