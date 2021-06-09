package com.poosh.app.mapper;

import com.poosh.app.dto.AdministratorDto;
import com.poosh.app.dto.UserDetailsDto;
import com.poosh.app.dto.UserDto;
import com.poosh.app.dto.UserInfoDto;
import com.poosh.app.exceptions.ApiExceptionResponse;
import com.poosh.app.model.User;
import com.poosh.app.model.UserAuth;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class UserMapper {

    public static UserDto mapModelToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getLastName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setBasket(user.getBasket());
        userDto.setUserProfile(user.getUserProfile());
        userDto.setWishList(user.getWishList());
        //orders
        return userDto;
    }

    public static User mapDtoToModel(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setBasket(userDto.getBasket());
        user.setUserProfile(userDto.getUserProfile());
        user.setWishList(userDto.getWishList());
        return user;
    }

    public static List<UserDetailsDto> mapUserToDetails(List<User> users) throws ApiExceptionResponse {
        List<UserDetailsDto> dtos = new LinkedList<>();
        for(User user: users) {
            if(user.getEmail() == null) {
                throw ApiExceptionResponse.builder().status(HttpStatus.NOT_FOUND).message("No contact for user: " + user.getFirstName() + " " + user.getLastName()).errors(Collections.singletonList("error.email.not_found")).build();
            }
            dtos.add(UserDetailsDto.builder().firstName(user.getFirstName()).lastName(user.getLastName()).email(user.getEmail()).build());
        }
        return dtos;
    }

    public static UserInfoDto mapModelToInfoDto(User user) {
        UserInfoDto dto = new UserInfoDto();
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPassword(user.getPassword());
        dto.setProfileCompleted(user.getProfileCompleted());
        dto.setIsSubscribed(user.getIsSubscribed());
        return dto;
    }

    public static AdministratorDto mapModelToAdmDto(UserAuth user) {
        AdministratorDto dto = new AdministratorDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        return dto;
    }

}
