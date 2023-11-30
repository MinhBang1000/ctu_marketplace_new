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
        if (strongGroupMember.getDecision()) {
            strongGroupMemberService.update(strongGroupMember);
        }else {
            strongGroupMemberService.delete(strongGroupMember.getId());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<RetrieveStrongGroupMemberResDTO>> list(@RequestParam(name = "strongGroupId", required = false) String strongGroupId, @RequestParam(name = "memberId", required = false) String memberId) {
        return new ResponseEntity<>(
                strongGroupMemberService.list().stream().filter(
                            strongGroupMember -> {
                                if (Objects.nonNull(strongGroupId) && Objects.nonNull(memberId)) {
                                    return strongGroupMember.getStrongGroup().getId() == Long.parseLong(strongGroupId) && strongGroupMember.getMember().getId() == Long.parseLong(memberId);
                                } else if (Objects.nonNull(strongGroupId)) {
                                    return strongGroupMember.getStrongGroup().getId() == Long.parseLong(strongGroupId);
                                } else if (Objects.nonNull(memberId)) {
                                    return strongGroupMember.getMember().getId() == Long.parseLong(memberId);
                                }
                                return true;
                            }
                        ).map(
                            strongGroupMember -> invitationMapper.mapping(strongGroupMember))
                        .collect(Collectors.toList())
                , HttpStatus.OK);
    }

    @GetMapping("/hello")
    public void hello() {
        StrongGroupMember strongGroupMember = strongGroupMemberService.retrieve(1L);
        System.out.println(strongGroupMember.getStrongGroup());
        System.out.println(strongGroupMember.getMember());
    }
}
