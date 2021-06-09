package com.poosh.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.poosh.app.constants.BmiRange;
import com.poosh.app.constants.BodyFatRange;
import lombok.*;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name="nutrition_profile")
public class NutritionProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @JsonBackReference
    @OneToOne(mappedBy = "nutritionProfile")
    private UserProfile userProfile;

    //BMI: age gender height weight
    private Float bmi;

    //calorie calculator: age gender height weight activity -> Calories:mantain weight,mildweightloss,weightloss,extreme loss
    private int maintainWeightCal;

    private int mildweightLossCal;

    private int weightLossCal;

    private int extremeLossCal;

    //body fat: age gender weight height neck waist
    private Float bodyFat;

    //bmr basal metabolic rate
    private int bmr;

    //ideal weight
    private Float idealWeight;

    //lean body mass
    private Float lbm;

    private BmiRange bmiRange;

    private BodyFatRange bodyFatRange;
}
