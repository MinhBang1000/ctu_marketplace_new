package com.ctu.marketplace.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ctu.marketplace.entity.Field;

@Repository
public interface FieldRepository extends JpaRepository<Field,Long>{
    List<Field> findByChildOfFieldIdIsNull();
}
