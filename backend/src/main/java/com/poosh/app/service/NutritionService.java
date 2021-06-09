package com.poosh.app.service;

import com.poosh.app.dto.UserProfileDto;
import com.poosh.app.model.NutritionProfile;
import org.springframework.stereotype.Component;

@Component
public interface NutritionService {
    NutritionProfile createProfile(UserProfileDto dto);
}
