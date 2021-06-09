package com.poosh.app.service.impl;

import com.poosh.app.constants.UserRole;
import com.poosh.app.dto.CredentialsDto;
import com.poosh.app.dto.LoginSuccessDto;
import com.poosh.app.exceptions.ApiExceptionResponse;
import com.poosh.app.model.UserAuth;
import com.poosh.app.repository.UserAuthRepository;
import com.poosh.app.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class LoginServiceImpl implements LoginService {

    private final UserAuthRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginServiceImpl(UserAuthRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public LoginSuccessDto login(CredentialsDto dto) throws ApiExceptionResponse {
        UserAuth user = userRepository.findFirstByEmail(dto.getEmail());

        if(user==null) {
            throw ApiExceptionResponse.builder().errors(Collections.singletonList("Bad credentials"))
                    .message("User not found").status(HttpStatus.NOT_FOUND).build();
        }



        LoginSuccessDto response;
        String role = user.getUserRole().toString();
        if(role.equals("USER")) {
            response = LoginSuccessDto.builder().id(user.getId()).role(user.getUserRole()).build();
        }
        else {
            response = LoginSuccessDto.builder().id(user.getId()).role(user.getUserRole()).build();
        }


        if(passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            return response;
        }

        //if(dto.getPassword().equals(user.getPassword())) {
          //  return response;
        //}

        throw ApiExceptionResponse.builder().errors(Collections.singletonList("Bad credentials"))
                .message("User not found").status(HttpStatus.NOT_FOUND).build();


    }

}
