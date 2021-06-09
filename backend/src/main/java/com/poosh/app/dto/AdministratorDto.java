package com.poosh.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdministratorDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
