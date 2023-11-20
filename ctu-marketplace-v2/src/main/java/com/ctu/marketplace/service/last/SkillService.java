package com.ctu.marketplace.service.last;

import com.ctu.marketplace.entity.Skill;
import com.ctu.marketplace.repository.ISkillRepository;
import com.ctu.marketplace.service.ISkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService implements ISkillService {
    @Autowired
    private ISkillRepository skillRepository;

    @Override
    public List<Skill> list() {
        return skillRepository.findAll();
    }

    @Override
    public Skill retrieve(Long id) {
        Optional<Skill> skill = skillRepository.findById(id);
        if (!skill.isPresent()) {
            throw new IllegalArgumentException("Doesn't match any instance by ID");
        }
        return skill.get();
    }

    @Override
    public Skill create(Skill skill) {
        return skillRepository.save(skill);
    }

    @Override
    public void delete(Long id) {
        skillRepository.deleteById(id);
    }

    @Override
    public Skill update(Skill skill) {
        return skillRepository.save(skill);
    }
}
