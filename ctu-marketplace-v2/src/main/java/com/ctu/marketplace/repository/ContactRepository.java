package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import com.ctu.marketplace.entity.Contact;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
  Optional<Contact> findByIdAndIsDeleted(Long contactId, Boolean isDeleted);

  List<Contact> findAllByIsDeleted(Boolean isDeleted);
}