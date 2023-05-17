package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.NewField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewFieldRepository extends JpaRepository<NewField, Long> {
}
