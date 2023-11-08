package com.ctu.marketplace.service;

import com.ctu.marketplace.entity.Skill;

import java.util.List;

public interface ISkillService {
    List<Skill> list();
    Skill retrieve(Long id);
    Skill create(Skill Skill);
    void delete(Long id);
    Skill update(Skill Skill, Long id);
}
