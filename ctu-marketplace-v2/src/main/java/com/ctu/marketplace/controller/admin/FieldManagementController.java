package com.ctu.marketplace.controller.admin;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.controller.common.FieldCommonController;
import com.ctu.marketplace.dto.request.FieldDto;
import com.ctu.marketplace.dto.response.FieldResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Field;
import com.ctu.marketplace.service.FieldService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/field-management")
public class FieldManagementController extends FieldCommonController {
	@Autowired
	private FieldService fieldService;
	@Autowired
	private ModelMapper mapper;

	@PostMapping
	public ResponseEntity<Response<FieldResponseDto>> create(@RequestBody FieldDto fieldDto) {
		Field field = fieldService.create(fieldDto);
		if (field != null) {
			FieldResponseDto fieldResponseDto = new FieldResponseDto();
			mapper.map(field, fieldResponseDto);
			Response<FieldResponseDto> response = new Response<>(Constant.STATUS_CODE_200, fieldResponseDto,
					Constant.SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<FieldResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@GetMapping("/{fieldId}")
	public ResponseEntity<Response<FieldResponseDto>> getById(@PathVariable Long fieldId) {
		Field field = fieldService.getById(fieldId);
		if (field != null) {
			FieldResponseDto fieldResponseDto = new FieldResponseDto();
			mapper.map(field, fieldResponseDto);
			Response<FieldResponseDto> response = new Response<>(Constant.STATUS_CODE_200, fieldResponseDto,
					Constant.SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<FieldResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PutMapping("/{fieldId}")
	public ResponseEntity<Response<FieldResponseDto>> update(@PathVariable Long fieldId,
			@RequestBody FieldDto fieldDto) {
		Field field = fieldService.update(fieldId, fieldDto);
		if (field != null) {
			FieldResponseDto fieldResponseDto = new FieldResponseDto();
			mapper.map(field, fieldResponseDto);
			Response<FieldResponseDto> response = new Response<>(Constant.STATUS_CODE_200, fieldResponseDto,
					Constant.SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<FieldResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@CrossOrigin
	@DeleteMapping("/{fieldId}")
	public ResponseEntity<Response<Boolean>> deleteById(@PathVariable Long fieldId) {
		boolean check = fieldService.deleteById(fieldId);
		if (check) {
			FieldResponseDto fieldResponseDto = new FieldResponseDto();
			mapper.map(check, fieldResponseDto);
			Response<Boolean> response = new Response<>(Constant.STATUS_CODE_200, true,
					Constant.DELETE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<Boolean> response = new Response<>(Constant.STATUS_CODE_400, false,
					Constant.DELETE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(response);
		}

	}

}
