package com.ctu.marketplace.service;

import com.ctu.marketplace.entity.StrongGroup;

import java.util.List;

public interface IStrongGroupService {
    List<StrongGroup> list();
    StrongGroup retrieve(Long id);
    StrongGroup create(StrongGroup StrongGroup);
    void delete(Long id);
    StrongGroup update(StrongGroup StrongGroup);
}
