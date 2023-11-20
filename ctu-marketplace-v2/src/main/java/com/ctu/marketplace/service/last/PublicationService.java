package com.ctu.marketplace.service.last;

import com.ctu.marketplace.entity.Publication;
import com.ctu.marketplace.repository.IPublicationRepository;
import com.ctu.marketplace.service.IPublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PublicationService implements IPublicationService {
    @Autowired
    private IPublicationRepository publicationRepository;

    @Override
    public List<Publication> list() {
        return publicationRepository.findAll();
    }

    @Override
    public Publication retrieve(Long id) {
        Optional<Publication> publication = publicationRepository.findById(id);
        if (!publication.isPresent()) {
            throw new IllegalArgumentException("Doesn't match any instance by this ID");
        }
        return publication.get();
    }

    @Override
    public Publication create(Publication publication) {
        return publicationRepository.save(publication);
    }

    @Override
    public void delete(Long id) {
        publicationRepository.deleteById(id);
    }

    @Override
    public Publication update(Publication publication) {
        return publicationRepository.save(publication);
    }
}
