package com.ctu.marketplace.exception;

import lombok.Getter;

@Getter
public class CException extends Exception {
    private int statusCode;
    private String message;

    public CException(int statusCode, String message){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }


}
