package com.poosh.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LogDto {
    private Long id;
    private String loggedIn;
    private String loggedOut;
}
