package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.last.request.NewFooterRequestDTO;
import com.ctu.marketplace.dto.last.response.NewFooterInfoResponseDTO;
import com.ctu.marketplace.dto.last.response.NewFooterResponseDTO;
import com.ctu.marketplace.dto.response.DomainResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.NewFooter;
import com.ctu.marketplace.entity.NewFooterInfo;
import com.ctu.marketplace.service.last.NewFooterInfoService;
import com.ctu.marketplace.service.last.NewFooterService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.bcel.Const;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v3/footers")
@RequiredArgsConstructor
public class NewFooterController {
    private final NewFooterService newFooterService;
    private final NewFooterInfoService newFooterInfoService;
    private String errorMsg = "";
    private final ModelMapper modelMapper;

    private NewFooterInfoResponseDTO mapping(NewFooterInfo newFooterInfo) {
        return NewFooterInfoResponseDTO.builder()
                .id(newFooterInfo.getId())
                .footerKey(newFooterInfo.getFooterKey())
                .footerValue(newFooterInfo.getFooterValue())
                .build();
    }

    @PostMapping
    public ResponseEntity<Response<String>> create(@RequestBody NewFooterRequestDTO newFooterRequestDTO) {
        try {
            this.newFooterService.create(newFooterRequestDTO);
            return new ResponseEntity<>(
                    new Response<>(Constant.STATUS_CODE_200, "Created Successfully !", Constant.CREATE_SUCCESS_MESSAGE),
                    HttpStatus.CREATED
            );
        } catch (Exception ex) {
            this.errorMsg = ex.getMessage();
        }
        return new ResponseEntity<>(
                new Response<>(Constant.STATUS_CODE_400, "Created Failed !", this.errorMsg),
                HttpStatus.BAD_REQUEST
        );
    }

    @GetMapping
    public ResponseEntity<Response<List<NewFooterResponseDTO>>> list() {
        return new ResponseEntity<>(
                new Response<>(
                        Constant.STATUS_CODE_200,
                        this.newFooterService.list().stream().map(item -> {
                            return NewFooterResponseDTO.builder()
                                    .id(item.getId())
                                    .name(item.getName())
                                    .domain(this.modelMapper.map(item.getDomain(), DomainResponseDto.class))
                                    .newFooterInfos(
                                            item.getNewFooterInfos().stream().map(newFooterInfo -> {
                                                return this.mapping(newFooterInfo);
                                            }).collect(Collectors.toList())
                                    )
                                    .build();
                        }).collect(Collectors.toList()),
                        Constant.SUCCESS_MESSAGE),
                HttpStatus.OK
        );
    }

    @GetMapping("/{footerId}")
    public ResponseEntity<Response<NewFooterResponseDTO>> retrieve(@PathVariable(name = "footerId") Long id) {
        try {
            NewFooter newFooter = this.newFooterService.retrieve(id);
            return new ResponseEntity<>(
                    new Response<>(
                            Constant.STATUS_CODE_200,
                            NewFooterResponseDTO.builder()
                                    .id(newFooter.getId())
                                    .domain(this.modelMapper.map(newFooter.getDomain(), DomainResponseDto.class))
                                    .name(newFooter.getName())
                                    .newFooterInfos(newFooter.getNewFooterInfos().stream().map(newFooterInfo -> this.mapping(newFooterInfo)).collect(Collectors.toList()))
                                    .build(),
                            Constant.SUCCESS_MESSAGE
                    ),
                    HttpStatus.OK
            );
        } catch (Exception ex) {
            this.errorMsg = ex.getMessage();
        }
        return new ResponseEntity<>(
                new Response<>(
                        Constant.STATUS_CODE_400,
                        null,
                        this.errorMsg
                ),
                HttpStatus.BAD_REQUEST
        );
    }

    @PutMapping("/{footerId}")
    public ResponseEntity<Response<String>> update(@NonNull @PathVariable(name = "footerId") Long id, @RequestBody NewFooterRequestDTO newFooterRequestDTO) {
        try {
            this.newFooterService.update(id, newFooterRequestDTO);
            return new ResponseEntity<>(
                    new Response<>(
                            Constant.STATUS_CODE_200,
                            "Updated Successfully !",
                            Constant.UPDATE_SUCCESS_MESSAGE
                    ),
                    HttpStatus.OK
            );
        } catch (Exception ex) {
            this.errorMsg = ex.getMessage();
        }
        return new ResponseEntity<>(
                new Response<>(
                        Constant.STATUS_CODE_400,
                        "Updated Failed !",
                        this.errorMsg
                ),
                HttpStatus.BAD_REQUEST
        );
    }

    @DeleteMapping("/{footerId}")
    public ResponseEntity<Response<String>> delete(@NonNull @PathVariable(name = "footerId") Long id) {
        try {
            this.newFooterService.delete(id);
            return new ResponseEntity<>(
                    new Response<>(Constant.STATUS_CODE_204,"Deleted!", Constant.DELETE_SUCCESS_MESSAGE),
                    HttpStatus.NO_CONTENT
            );
        } catch (Exception ex) {
           this.errorMsg = ex.getMessage();
        }
        return new ResponseEntity<>(
                new Response<>(Constant.STATUS_CODE_404,"Can not delete!", errorMsg),
                HttpStatus.BAD_REQUEST
        );
    }
}
