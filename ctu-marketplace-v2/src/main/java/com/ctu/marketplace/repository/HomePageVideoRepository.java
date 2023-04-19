package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.HomePageVideo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomePageVideoRepository extends JpaRepository<HomePageVideo,Long> {
}
