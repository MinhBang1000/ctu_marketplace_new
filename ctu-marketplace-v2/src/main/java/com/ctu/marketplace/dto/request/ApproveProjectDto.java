package com.ctu.marketplace.dto.request;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApproveProjectDto implements Serializable {
    private Long approverId;
    private Long projectId;
    private Long statusId;
    private String reason;
}
