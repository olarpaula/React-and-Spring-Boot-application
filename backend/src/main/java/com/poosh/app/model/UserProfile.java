package com.poosh.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.poosh.app.constants.UserGender;
import com.poosh.app.constants.WorkoutFrequency;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
//@ToString
@Table(name="user_profile")
public class UserProfile<userProfile> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @JsonBackReference
    @OneToOne(mappedBy = "userProfile")
    private User user;

    @Enumerated(EnumType.ORDINAL)
    private UserGender userGender;

    private int age;

    private Float weight;

    private int height;

    @Enumerated(EnumType.ORDINAL)
    private WorkoutFrequency workoutFrequency;

    // pt body fat calc: neck, waist
    private int Neck;


    private int waist;

    //pt femei pt body fat calc
    private int hip;

    //younger than 24 pt lbm lean body mass
    private Boolean young;

    @JsonManagedReference
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name= "nutrition_profile_id", referencedColumnName = "id")
    private NutritionProfile nutritionProfile;

}

