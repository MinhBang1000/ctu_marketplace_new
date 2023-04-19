package com.ctu.marketplace.dto.request;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseDto {
    private Timestamp createdDate;
    private Timestamp updatedDate;
    private Boolean isDeleted;

}
