package com.ctu.marketplace.tools.mapper.impls;

import com.ctu.marketplace.dto.last.response.RetrieveStrongGroupResDTO;
import com.ctu.marketplace.entity.StrongGroup;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.stereotype.Component;

@Component
public class RetrieveStrongGroupMapper implements IMapper<StrongGroup, RetrieveStrongGroupResDTO> {
    @Override
    public RetrieveStrongGroupResDTO mapping(StrongGroup source) {
        return RetrieveStrongGroupResDTO.builder()
                .id(source.getId())
                .topic(source.getTopic())
                .name(source.getName())
                .introduction(source.getIntroduction())
                .vision(source.getVision())
                .mission(source.getMission())
                .leaderId(source.getUserProfile().getId())
                .build();
    }
}
