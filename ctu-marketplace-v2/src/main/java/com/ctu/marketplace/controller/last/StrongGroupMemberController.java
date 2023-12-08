package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.dto.last.request.AnsweringStrongGroupDTO;
import com.ctu.marketplace.dto.last.request.AskingStrongGroupDTO;
import com.ctu.marketplace.dto.last.response.RetrieveStrongGroupMemberResDTO;
import com.ctu.marketplace.entity.StrongGroupMember;
import com.ctu.marketplace.service.IStrongGroupMemberService;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v3/invitations")
public class StrongGroupMemberController {
    @Autowired
    private IStrongGroupMemberService strongGroupMemberService;
    @Autowired
    private IMapper<AskingStrongGroupDTO, StrongGroupMember> askMapper;
    @Autowired
    private IMapper<AnsweringStrongGroupDTO, StrongGroupMember> answerMapper;
    @Autowired
    private IMapper<StrongGroupMember, RetrieveStrongGroupMemberResDTO> invitationMapper;

    @PostMapping("/asking")
    public ResponseEntity<Void> asking(@RequestBody AskingStrongGroupDTO askingStrongGroupDTO) {
        strongGroupMemberService.create(askMapper.mapping(askingStrongGroupDTO));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/answering")
    public ResponseEntity<Void> answering(@RequestBody AnsweringStrongGroupDTO answeringStrongGroupDTO) {
        StrongGroupMember strongGroupMember = answerMapper.mapping(answeringStrongGroupDTO);
        strongGroupMemberService.update(strongGroupMember);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<RetrieveStrongGroupMemberResDTO>> list(@RequestParam(name = "strongGroupId", required = false) String strongGroupId, @RequestParam(name = "memberId", required = false) String memberId, @RequestParam(name = "decision", required = false) String decision) {
        List<StrongGroupMember> invitationStronGroupFilteredList = Objects.isNull(strongGroupId) ? strongGroupMemberService.list() : strongGroupMemberService.list().stream().filter(strongGroupMember -> strongGroupMember.getStrongGroup().getId() == Long.parseLong(strongGroupId)).collect(Collectors.toList());
        List<StrongGroupMember> invitationMemberFilteredList = Objects.isNull(memberId) ? invitationStronGroupFilteredList : invitationStronGroupFilteredList.stream().filter(strongGroupMember -> strongGroupMember.getMember().getId() == Long.parseLong(memberId)).collect(Collectors.toList());
        List<StrongGroupMember> invitationDecisionFilteredList = Objects.isNull(decision) ? invitationMemberFilteredList : invitationMemberFilteredList.stream().filter(strongGroupMember -> strongGroupMember.getDecision().equals(decision)).collect(Collectors.toList());
        return new ResponseEntity<>(invitationDecisionFilteredList.stream().map(invitation -> invitationMapper.mapping(invitation)).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/hello")
    public void hello() {
        StrongGroupMember strongGroupMember = strongGroupMemberService.retrieve(1L);
        System.out.println(strongGroupMember.getStrongGroup());
        System.out.println(strongGroupMember.getMember());
    }
}
