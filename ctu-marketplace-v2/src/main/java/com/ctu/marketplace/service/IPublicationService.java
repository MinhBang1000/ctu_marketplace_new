package com.ctu.marketplace.service;

import com.ctu.marketplace.entity.Publication;

import java.util.List;

public interface IPublicationService {
    List<Publication> list();
    Publication retrieve(Long id);
    Publication create(Publication Publication);
    void delete(Long id);
    Publication update(Publication Publication);
}
