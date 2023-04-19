package com.ctu.marketplace.dto.request;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFunctionDto implements Serializable {
    private Long functionId;
    private Long userProfileId;
    private Boolean isEnabled;
}
