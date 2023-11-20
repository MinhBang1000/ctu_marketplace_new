package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.dto.last.request.CreateSkillReqDTO;
import com.ctu.marketplace.dto.last.request.UpdateSkillReqDTO;
import com.ctu.marketplace.dto.last.response.RetrieveSkillResDTO;
import com.ctu.marketplace.entity.Skill;
import com.ctu.marketplace.service.ISkillService;
import com.ctu.marketplace.tools.mapper.IMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v3/skills")
public class SkillController {
    @Autowired
    private ISkillService skillService;
    @Autowired
    private IMapper<CreateSkillReqDTO, Skill> createMapper;
    @Autowired
    private IMapper<UpdateSkillReqDTO, Skill> updateMapper;
    @Autowired
    private IMapper<Skill, RetrieveSkillResDTO> retrieveMapper;

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody CreateSkillReqDTO createSkillReqDTO) {
        skillService.create(createMapper.mapping(createSkillReqDTO));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{skillId}")
    public ResponseEntity<Void> update(@RequestBody UpdateSkillReqDTO updateSkillReqDTO, @PathVariable Long skillId) {
        updateSkillReqDTO.setId(skillId);
        skillService.update(updateMapper.mapping(updateSkillReqDTO));
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping
    public ResponseEntity<List<RetrieveSkillResDTO>> list() {
        return new ResponseEntity(
                skillService.list().stream().map(
                        skill -> {
                            return retrieveMapper.mapping(skill);
                        }
                ).collect(Collectors.toList()),
                HttpStatus.OK
        );
    }

    @GetMapping("/{skillId}")
    public ResponseEntity<RetrieveSkillResDTO> retrieve(@PathVariable Long skillId) {
        return new ResponseEntity<>(retrieveMapper.mapping(skillService.retrieve(skillId)), HttpStatus.OK);
    }

    @DeleteMapping("/{skillId}")
    public ResponseEntity<Void> delete(@PathVariable Long skillId) {
        skillService.delete(skillId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
