package com.poosh.app.service;

import com.poosh.app.dto.RecoverPasswordDto;
import com.poosh.app.exceptions.ApiExceptionResponse;

public interface SendEmailService {
    RecoverPasswordDto sendEmail(String to) throws ApiExceptionResponse;
}
