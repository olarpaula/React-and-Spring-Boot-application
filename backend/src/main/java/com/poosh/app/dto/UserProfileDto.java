package com.poosh.app.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.poosh.app.constants.UserGender;
import com.poosh.app.constants.WorkoutFrequency;
import com.poosh.app.model.NutritionProfile;
import com.poosh.app.model.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserProfileDto {
    private Long id;
    private UserGender userGender;
    private int age;
    private Float weight;
    private int height;
    private WorkoutFrequency workoutFrequency;
    private int neck;
    private int waist;
    private int hip;
    //nu mai pun young
}

