package com.ctu.marketplace.service.last;

import com.ctu.marketplace.entity.StrongGroup;
import com.ctu.marketplace.repository.IStrongGroupRepository;
import com.ctu.marketplace.service.IStrongGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StrongGroupService implements IStrongGroupService {
    @Autowired
    private IStrongGroupRepository strongGroupRepository;

    @Override
    public List<StrongGroup> list() {
        return strongGroupRepository.findAll();
    }

    @Override
    public StrongGroup retrieve(Long id) {
        Optional<StrongGroup> strongGroup = strongGroupRepository.findById(id);
        if (!strongGroup.isPresent()) {
            throw new IllegalArgumentException("Doesn't match any instance by ID");
        }
        return strongGroup.get();
    }

    @Override
    public StrongGroup create(StrongGroup strongGroup) {
        return strongGroupRepository.save(strongGroup);
    }

    @Override
    public void delete(Long id) {
        strongGroupRepository.deleteById(id);
    }

    @Override
    public StrongGroup update(StrongGroup strongGroup, Long id) {
        strongGroup.setId(id);
        return strongGroupRepository.save(strongGroup);
    }
}

