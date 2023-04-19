package com.ctu.marketplace.dto.response;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseResponse {
    private Timestamp createdDate;
    private Timestamp updatedDate;
    private Boolean isDeleted;
}
