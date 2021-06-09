package com.poosh.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CredentialsDto {

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;
}
