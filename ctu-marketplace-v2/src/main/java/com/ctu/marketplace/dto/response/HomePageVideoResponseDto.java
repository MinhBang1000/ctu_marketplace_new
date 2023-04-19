package com.ctu.marketplace.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomePageVideoResponseDto{
    private Long id;
    private String name;
    private String url;
}
