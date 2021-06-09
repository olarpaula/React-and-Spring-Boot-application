package com.poosh.app.service.impl;

import com.poosh.app.constants.BmiRange;
import com.poosh.app.constants.BodyFatRange;
import com.poosh.app.constants.UserGender;
import com.poosh.app.constants.WorkoutFrequency;
import com.poosh.app.dto.CaloriesDto;
import com.poosh.app.dto.UserProfileDto;
import com.poosh.app.model.NutritionProfile;
import com.poosh.app.model.User;
import com.poosh.app.model.UserProfile;
import com.poosh.app.repository.NutritionProfileRepository;
import com.poosh.app.repository.UserProfileRepository;
import com.poosh.app.repository.UserRepository;
import com.poosh.app.service.NutritionService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class NutritionServiceImpl implements NutritionService {

    private final NutritionProfileRepository nutritionRepository;
    private final UserRepository userRepository;

    public NutritionServiceImpl(NutritionProfileRepository nutritionRepository, UserRepository userRepository) {
        this.nutritionRepository = nutritionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public NutritionProfile createProfile(UserProfileDto dto) {
        User user = userRepository.findFirstById(dto.getId());
        Long id = user.getUserProfile().getNutritionProfile().getId();
        NutritionProfile profile = nutritionRepository.findFirstById(id);

        profile.setBmi(computeBMI(dto));
        profile.setBodyFat(computeBFP(dto));
        profile.setBmr(computeBMR(dto));
        profile.setIdealWeight(computeIdealWeight(dto));

        CaloriesDto calories = computeCalories(dto);

        profile.setMaintainWeightCal(calories.getMaintainWeightCal());
        profile.setMildweightLossCal(calories.getMildweightLossCal());
        profile.setWeightLossCal(calories.getWeightLossCal());
        profile.setExtremeLossCal(calories.getExtremeLossCal());

        profile.setLbm(computeLBM(dto));

        profile.setBmiRange(computeBmiRange(profile.getBmi()));
        profile.setBodyFatRange(computeBodyFatRange(dto.getUserGender(), profile.getBodyFat()));

        return nutritionRepository.save(profile);
    }

    double roundAvoid(double value, int places) {
        double scale = Math.pow(10, places);
        return Math.round(value * scale) / scale;
    }

    Float computeBMI(UserProfileDto dto) {

        double bmi = dto.getWeight()/((dto.getHeight()/100.0f)*(dto.getHeight()/100.0f));
        bmi = roundAvoid(bmi, 1);

        return (float) bmi;
    }

    Float computeBFP(UserProfileDto dto) {
        double bfp;
        if (dto.getUserGender() == UserGender.MALE) {
            bfp = 495/(1.0324 - 0.19077*Math.log10(dto.getWaist()-dto.getNeck()) + 0.15456*Math.log10(dto.getHeight())) - 450.0f;
        }
        else {
            bfp = 495/(1.29579 - 0.35004*Math.log10(dto.getWaist()+dto.getHip()-dto.getNeck()) + 0.22100*Math.log10(dto.getHeight())) - 450.0f;
        }
        bfp = roundAvoid(bfp, 1);
        return Float.valueOf(Double.toString(bfp));
    }

    int computeBMR(UserProfileDto dto) {
        int bmr = (int) (10*dto.getWeight() + 6.25*dto.getHeight() - 5*dto.getAge());
        //System.out.println("BMR " + bmr);
        if (dto.getUserGender() == UserGender.MALE) {
            bmr += 5;
        }
        else {
            bmr -= 161;
        }
        return bmr;
    }

    float computeFeet(int height) {
        double inch = height/2.54;
        inch = roundAvoid(inch, 2) - 60;

         return (float) inch;
    }

    Float computeIdealWeight(UserProfileDto dto) { //Devine formula
        float feet = computeFeet((dto.getHeight()));
        double ideal;

        if(dto.getUserGender() == UserGender.MALE) {
            ideal = 50F;
        }
        else {
            ideal = 45.5F;
        }

        if(dto.getHeight() > 152.4) {
            ideal += (float) (2.3 * feet);
        }

        return (float)roundAvoid(ideal, 1);
    }

    CaloriesDto computeCalories(UserProfileDto userDto) {
        CaloriesDto dto = new CaloriesDto();

        //    SEDENTARY, LIGHT, MODERATE, ACTIVE, VERY_ACTIVE
        int workoutFreq = userDto.getWorkoutFrequency().ordinal();
        int calories = computeBMR(userDto);

        double[] maintainWeightArr = new double[]{1.2, 1.37, 1.46, 1.55, 1.72};
        double[] mildWeightLossArr = new double[]{0.84, 0.86, 0.87, 0.88, 0.89};
        double[] weightLossArr = new double[]{0.68, 0.72, 0.74, 0.75, 0.78};
        double[] extremeWeighLosstArr = new double[]{0.36, 0.44, 0.48, 0.51, 0.56};

        dto.setMaintainWeightCal((int) (calories * maintainWeightArr[workoutFreq]));
        dto.setMildweightLossCal((int) (mildWeightLossArr[workoutFreq] * dto.getMaintainWeightCal()));
        dto.setWeightLossCal((int) (weightLossArr[workoutFreq] * dto.getMaintainWeightCal()));
        dto.setExtremeLossCal((int) (extremeWeighLosstArr[workoutFreq] * dto.getMaintainWeightCal()));

        return dto;
    }

    Float computeLBM(UserProfileDto dto) {
        float lbm;

        if(dto.getUserGender() == UserGender.MALE) {
            lbm = (float) (0.407 * dto.getWeight() + 0.267 * dto.getHeight() - 19.2);
        }
        else {
            lbm = (float) (0.252 * dto.getHeight() + 0.473 * dto.getHeight() - 48.3);
        }

        lbm = (float) roundAvoid((double)lbm, 1);
        return lbm;
    }

    private BmiRange computeBmiRange(Float bmi) {
        if (bmi< 16) {
            return BmiRange.SEVERE_THINNESS;
        }
        else if (bmi<17) {
            return BmiRange.MODERATE_THINESS;
        }
        else if (bmi<18.5) {
            return BmiRange.MILD_THINESS;
        }
        else if (bmi<25) {
            return BmiRange.NORMAL;
        }
        else if (bmi<30) {
            return BmiRange.OVERWEIGHT;
        }
        else if (bmi<35) {
            return BmiRange.OBESE_CLASS_1;
        }
        else if (bmi<40) {
            return BmiRange.OBESE_CLASS_2;
        }
        else {
            return BmiRange.OBESE_CLASS_3;
        }
    }

    private BodyFatRange computeBodyFatRange(UserGender userGender, float bodyFat) {
        if(userGender == UserGender.MALE) {
            if (bodyFat < 5) {
                return BodyFatRange.ESSENTIAL_FAT;
            }
            else if (bodyFat < 13) {
                return BodyFatRange.ATHLETES;
            }
            else if (bodyFat < 17) {
                return BodyFatRange.FITNESS;
            }
            else if (bodyFat < 25) {
                return BodyFatRange.AVERAGE;
            }
            else {
                return BodyFatRange.OBESE;
            }
        }
        else {
            if (bodyFat < 13) {
                return BodyFatRange.ESSENTIAL_FAT;
            }
            else if (bodyFat < 20) {
                return BodyFatRange.ATHLETES;
            }
            else if (bodyFat < 24) {
                return BodyFatRange.FITNESS;
            }
            else if (bodyFat < 31) {
                return BodyFatRange.AVERAGE;
            }
            else {
                return BodyFatRange.OBESE;
            }
        }
    }
}
