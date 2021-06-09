package com.poosh.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserStatusDto {
    int totalUsers;
    int activeUsers;
    int notActiveUsers;
}
