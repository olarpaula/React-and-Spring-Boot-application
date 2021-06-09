package com.poosh.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserInfoDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String password;
    private int profileCompleted;
    private int isSubscribed;
}
