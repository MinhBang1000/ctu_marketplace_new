package com.ctu.marketplace.exception;

import com.ctu.marketplace.dto.response.ErrorResponseDto;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = GlobalException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody ErrorResponseDto handleException(GlobalException ex) {
        ex.printStackTrace();
        return new ErrorResponseDto(ex.getStatusCode(), ex.getMessage());
    }
}
