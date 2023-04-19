package com.ctu.marketplace.service;

import com.ctu.marketplace.dto.request.HomePageVideoDto;
import com.ctu.marketplace.entity.HomePageVideo;

public interface HomePageVideoService {
    HomePageVideo getById(Long homePageVideoId);

    HomePageVideo update(Long homePageVideoId, HomePageVideoDto homePageVideoDto);
}
