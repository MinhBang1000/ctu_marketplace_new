package com.ctu.marketplace.service;

import com.ctu.marketplace.entity.StrongGroupMember;

import java.util.List;

public interface IStrongGroupMemberService {
    List<StrongGroupMember> list();
    StrongGroupMember retrieve(Long id);
    StrongGroupMember create(StrongGroupMember StrongGroupMember);
    void delete(Long id);
    StrongGroupMember update(StrongGroupMember StrongGroupMember);
}
