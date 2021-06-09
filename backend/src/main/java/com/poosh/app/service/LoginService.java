package com.poosh.app.service;

import com.poosh.app.dto.CredentialsDto;
import com.poosh.app.dto.LoginSuccessDto;
import com.poosh.app.exceptions.ApiExceptionResponse;
import org.springframework.stereotype.Component;

@Component
public interface LoginService {
    LoginSuccessDto login(CredentialsDto dto) throws ApiExceptionResponse;

}
