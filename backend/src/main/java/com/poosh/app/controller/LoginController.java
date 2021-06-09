package com.poosh.app.controller;

import com.poosh.app.constants.UserRole;
import com.poosh.app.dto.CredentialsDto;
import com.poosh.app.dto.UserDetailsDto;
import com.poosh.app.exceptions.ApiExceptionResponse;
import com.poosh.app.model.Administrator;
import com.poosh.app.model.UserAuth;
import com.poosh.app.repository.UserAuthRepository;
import com.poosh.app.service.LoginService;
import com.poosh.app.service.SendEmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;
    private final SendEmailService sendEmailService;

    private final UserAuthRepository userAuthRepository;

    public LoginController(LoginService loginService, SendEmailService sendEmailService,  UserAuthRepository userAuthRepository) {
        this.loginService = loginService;
        this.sendEmailService = sendEmailService;
        this.userAuthRepository = userAuthRepository;
    }

    @PostMapping()
    public ResponseEntity loginReq(@RequestBody CredentialsDto dto) throws ApiExceptionResponse {
        return ResponseEntity.status(HttpStatus.OK).body(loginService.login(dto));
    }

   @PostMapping("/recover-password")
    public ResponseEntity recoverPass(@RequestBody String emailTo) throws ApiExceptionResponse {
       return ResponseEntity.status(HttpStatus.OK).body(sendEmailService.sendEmail(emailTo));

    }

}
