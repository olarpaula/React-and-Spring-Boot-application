package com.poosh.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class SkinProductDto {
    private String name;
    private String brand;
    private Float price;
    private String ingredients;
    private String how_to_use;
    private String benefits;
}
