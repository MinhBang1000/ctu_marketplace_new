package com.ctu.marketplace.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.HomePageVideoDto;
import com.ctu.marketplace.entity.HomePageVideo;
import com.ctu.marketplace.repository.HomePageVideoRepository;
import com.ctu.marketplace.service.HomePageVideoService;

@Service
public class HomePageVideoServiceImpl implements HomePageVideoService {

    @Autowired
    private HomePageVideoRepository homePageVideoRepository;

    @Override
    public HomePageVideo getById(Long homePageVideoId) {
        return homePageVideoRepository.findById(homePageVideoId).orElse(null);
    }

    @Override
    public HomePageVideo update(Long homePageVideoId, HomePageVideoDto homePageVideoDto) {
        try {
            HomePageVideo homePageVideo = homePageVideoRepository.findById(homePageVideoId).orElse(null);
            if (homePageVideo == null)
                return null;
            homePageVideo.setName(homePageVideoDto.getName());
            homePageVideo.setUrl(homePageVideoDto.getUrl());
            return homePageVideoRepository.save(homePageVideo);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
