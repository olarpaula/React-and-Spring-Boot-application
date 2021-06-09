package com.poosh.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CaloriesDto {

    private int maintainWeightCal;

    private int mildweightLossCal;

    private int weightLossCal;

    private int extremeLossCal;
}
