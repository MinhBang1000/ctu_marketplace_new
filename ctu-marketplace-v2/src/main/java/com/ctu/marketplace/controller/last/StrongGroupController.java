package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.dto.last.request.CreateStrongGroupReqDTO;
import com.ctu.marketplace.dto.last.request.UpdateStrongGroupReqDTO;
import com.ctu.marketplace.dto.last.response.RetrieveStrongGroupResDTO;
import com.ctu.marketplace.entity.StrongGroup;
import com.ctu.marketplace.service.IStrongGroupService;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v3/strong-groups")
public class StrongGroupController {
    @Autowired
    private IStrongGroupService strongGroupService;
    @Autowired
    private IMapper<CreateStrongGroupReqDTO, StrongGroup> createMapper;
    @Autowired
    private IMapper<UpdateStrongGroupReqDTO, StrongGroup> updateMapper;
    @Autowired
    private IMapper<StrongGroup, RetrieveStrongGroupResDTO> retrieveMapper;

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody CreateStrongGroupReqDTO createStrongGroupReqDTO) {
        strongGroupService.create(createMapper.mapping(createStrongGroupReqDTO));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<RetrieveStrongGroupResDTO>> list(@RequestParam(name = "leaderId", required = false) String leaderId) {
        return new ResponseEntity<>(
                strongGroupService.list().stream()
                        .filter(
                                strongGroup -> {
                                    if (Objects.nonNull(leaderId)) {
                                        return strongGroup.getUserProfile().getId() == Long.parseLong(leaderId);
                                    }
                                    return true;
                                }
                        )
                        .map(
                            strongGroup -> retrieveMapper.mapping(strongGroup)).collect(Collectors.toList())
                , HttpStatus.OK
        );
    }

    @PatchMapping("/{strongGroupId}")
    public ResponseEntity<Void> update(@RequestBody UpdateStrongGroupReqDTO updateStrongGroupReqDTO, @PathVariable Long strongGroupId) {
        updateStrongGroupReqDTO.setId(strongGroupId);
        strongGroupService.update(updateMapper.mapping(updateStrongGroupReqDTO));
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/{strongGroupId}")
    public ResponseEntity<RetrieveStrongGroupResDTO> retrieve(@PathVariable Long strongGroupId) {
        return new ResponseEntity<>(retrieveMapper.mapping(strongGroupService.retrieve(strongGroupId)), HttpStatus.OK);
    }

    @DeleteMapping("/{strongGroupId}")
    public ResponseEntity<Void> delete(@PathVariable Long strongGroupId) {
        strongGroupService.delete(strongGroupId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
