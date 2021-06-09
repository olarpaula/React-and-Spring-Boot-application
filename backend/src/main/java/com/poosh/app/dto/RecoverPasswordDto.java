package com.poosh.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RecoverPasswordDto {
    private String email;
    private int givenCode;
}
