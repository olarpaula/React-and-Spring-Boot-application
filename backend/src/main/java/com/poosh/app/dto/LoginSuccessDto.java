package com.poosh.app.dto;

import com.poosh.app.constants.UserRole;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginSuccessDto {
    private UserRole role;
    private Long id;
}
