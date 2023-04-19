package com.ctu.marketplace.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserProfileResearchGroupResponseDto extends BaseResponse {
    private Long id;
    private String avatar;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String address;
    private String qualification;
    private String website;
    private String bio;
}
