package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.last.request.IntroductionRequestDTO;
import com.ctu.marketplace.dto.last.response.IntroductionInfoResponseDTO;
import com.ctu.marketplace.dto.last.response.IntroductionResponseDTO;
import com.ctu.marketplace.dto.response.DomainResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Introduction;
import com.ctu.marketplace.service.last.IntroductionService;
import com.ctu.marketplace.service.last.NewFooterService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v3/introductions")
public class IntroductionController {
    private final IntroductionService introductionService;
    private final ModelMapper modelMapper;
    private IntroductionResponseDTO mapping(Introduction introduction) {
        List<IntroductionInfoResponseDTO> introductionInfoResponseDTOS = introduction.getIntroductionInfos().stream()
                .map(item -> {
                    return IntroductionInfoResponseDTO.builder()
                            .id(item.getId())
                            .introductionKey(item.getIntroductionKey())
                            .introductionValue(item.getIntroductionValue())
                            .build();
                }).collect(Collectors.toList());
        return IntroductionResponseDTO.builder()
                .name(introduction.getName())
                .id(introduction.getId())
                .domain(modelMapper.map(introduction.getDomain(), DomainResponseDto.class))
                .introductionInfos(introductionInfoResponseDTOS)
                .build();
    }
    @PostMapping()
    public ResponseEntity<Response<String>> create(@RequestBody IntroductionRequestDTO introductionRequestDTO) {
        String msg = "";
        try {
            this.introductionService.create(introductionRequestDTO);
            return new ResponseEntity<>(
                    new Response<>(Constant.STATUS_CODE_200, "Create Successfully !", Constant.CREATE_SUCCESS_MESSAGE),
                    HttpStatus.CREATED
            );
        } catch (Exception ex) {
            msg = ex.getMessage();
        }
        return new ResponseEntity<>(
                new Response<>(Constant.STATUS_CODE_404, "Created Failed !", msg),
                HttpStatus.BAD_REQUEST
        );
    }

    @GetMapping()
    public ResponseEntity<Response<List<IntroductionResponseDTO>>> list() {
        List<IntroductionResponseDTO> introductionResponseDTOs = this.introductionService.list().stream().map(item -> {
            return this.mapping(item);
        }).collect(Collectors.toList());
        return new ResponseEntity<>(
                new Response<>(Constant.STATUS_CODE_200, introductionResponseDTOs , Constant.SUCCESS_MESSAGE),
                HttpStatus.OK
        );
    }

    @GetMapping("/{introductionId}")
    public ResponseEntity<Response<IntroductionResponseDTO>> retrieve(@PathVariable(name = "introductionId") Long id) {
        String msg = "";
        try {
            return new ResponseEntity<>(
                    new Response<>(Constant.STATUS_CODE_200, this.mapping(this.introductionService.retrieve(id)), Constant.SUCCESS_MESSAGE),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            msg = e.getMessage();
        }
        return new ResponseEntity<>(
                new Response<>(Constant.STATUS_CODE_404, null, msg),
                HttpStatus.BAD_REQUEST
        );
    }

    @PutMapping("/{introductionId}")
    public ResponseEntity<Response<String>> update(@NonNull @PathVariable(name = "introductionId") Long id, @RequestBody IntroductionRequestDTO introductionRequestDTO) {
        String msg = "";
        try {
            this.introductionService.update(id, introductionRequestDTO);
            return new ResponseEntity<>(
                    new Response<>(Constant.STATUS_CODE_200, "Updated Successfully !", Constant.UPDATE_SUCCESS_MESSAGE),
                    HttpStatus.OK
            );
        } catch (Exception ex) {
            msg = ex.getMessage();
        }
        return new ResponseEntity<>(
                new Response<>(Constant.STATUS_CODE_404, "Updated Failed !", msg),
                HttpStatus.BAD_REQUEST
        );
    }

    @DeleteMapping("/{introductionId}")
    public ResponseEntity<Response<String>> delete(@NonNull @PathVariable(name = "introductionId") Long id) {
        String msg = "";
        try {
            this.introductionService.delete(id);
            return new ResponseEntity<>(
                    new Response<>(Constant.STATUS_CODE_204, "Deleted!", Constant.DELETE_SUCCESS_MESSAGE),
                    HttpStatus.NO_CONTENT
            );
        } catch (Exception ex) {
            msg = ex.getMessage();
        }
        return new ResponseEntity<>(
                new Response<>(Constant.STATUS_CODE_400, "Can not delete!", msg),
                HttpStatus.BAD_REQUEST
        );
    }
}
