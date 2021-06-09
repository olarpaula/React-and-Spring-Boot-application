package com.poosh.app.dto;

import com.poosh.app.constants.SupplementFlavour;
import com.poosh.app.constants.SupplementForm;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class SupplementDto {
    private String brand;
    private String name;
    private Float price;
    private SupplementForm supplementForm;
    private String description;
    private SupplementFlavour supplementFlavour;
}
