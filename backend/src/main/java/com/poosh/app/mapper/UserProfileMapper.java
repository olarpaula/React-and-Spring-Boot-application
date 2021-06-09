package com.poosh.app.mapper;

import com.poosh.app.dto.UserDto;
import com.poosh.app.dto.UserProfileDto;
import com.poosh.app.model.User;
import com.poosh.app.model.UserProfile;

public class UserProfileMapper {

    public static UserProfileDto mapModelToDto(UserProfile profile) {
        UserProfileDto dto = new UserProfileDto();

        Long idUser = profile.getUser().getId();

        dto.setId(idUser);
        dto.setAge(profile.getAge());
        dto.setHeight(profile.getHeight());
        dto.setUserGender(profile.getUserGender());
        dto.setHip(profile.getHip());
        dto.setNeck(profile.getNeck());
        dto.setWeight(profile.getWeight());
        dto.setWaist(profile.getWaist());
        dto.setWorkoutFrequency(profile.getWorkoutFrequency());
        return dto;
    }
}
