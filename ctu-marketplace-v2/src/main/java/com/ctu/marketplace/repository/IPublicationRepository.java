package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPublicationRepository extends JpaRepository<Publication, Long> {
}
