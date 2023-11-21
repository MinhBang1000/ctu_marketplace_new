package com.ctu.marketplace.service.last;

import com.ctu.marketplace.entity.StrongGroupMember;
import com.ctu.marketplace.repository.IStrongGroupMemberRepository;
import com.ctu.marketplace.service.IStrongGroupMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StrongGroupMemberService implements IStrongGroupMemberService {
    @Autowired
    private IStrongGroupMemberRepository strongGroupMemberRepository;

    @Override
    public List<StrongGroupMember> list() {
        return strongGroupMemberRepository.findAll();
    }

    @Override
    public StrongGroupMember retrieve(Long id) {
        Optional<StrongGroupMember> strongGroupMember = strongGroupMemberRepository.findById(id);
        if (!strongGroupMember.isPresent()) {
            throw new IllegalArgumentException("Doesn't match any instance by ID");
        }
        return strongGroupMember.get();
    }

    @Override
    public StrongGroupMember create(StrongGroupMember strongGroupMember) {
        return strongGroupMemberRepository.save(strongGroupMember);
    }

    @Override
    public void delete(Long id) {
        strongGroupMemberRepository.deleteById(id);
    }

    @Override
    public StrongGroupMember update(StrongGroupMember strongGroupMember) {
        return strongGroupMemberRepository.save(strongGroupMember);
    }
}
