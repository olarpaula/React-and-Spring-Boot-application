package com.poosh.app.service;

import com.poosh.app.dto.UserProfileDto;
import com.poosh.app.model.UserProfile;

public interface UserProfileService {

    UserProfile findById(Long id);
    UserProfile findByUserId(Long id);
    void add(UserProfile userProfile);
//    void updateUserProfile(UserProfile userProfile);
    void deleteById(Long id);
    int checkCompleted(Long id);
    UserProfile updateUserProfile(UserProfileDto dto);
}
