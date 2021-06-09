package com.poosh.app.service.impl;

import com.poosh.app.dto.UserProfileDto;
import com.poosh.app.model.User;
import com.poosh.app.model.UserProfile;
import com.poosh.app.repository.UserProfileRepository;
import com.poosh.app.repository.UserRepository;
import com.poosh.app.service.UserProfileService;
import org.springframework.stereotype.Service;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;

    public UserProfileServiceImpl(UserProfileRepository userProfileRepository, UserRepository userRepository) {
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
    }

    @Override
    public UserProfile findById(Long id) {
        return  userProfileRepository.findFirstById(id);

    }

    @Override
    public UserProfile findByUserId(Long id) {
        User user = userRepository.findFirstById(id);
        return userProfileRepository.findFirstById(user.getUserProfile().getId());
    }

    @Override
    public void add(UserProfile userProfile) {
        userProfileRepository.save(userProfile);
    }

    @Override
    public void deleteById(Long id) {
        userProfileRepository.deleteById(id);
    }

    @Override
    public int checkCompleted(Long id) {
        //System.out.println("in service");
        User user = userRepository.findFirstById(id);
        Long profileId = user.getUserProfile().getId();

        UserProfile userProfile = userProfileRepository.findFirstById(profileId);

        if(userProfile.getAge() == 0)
            return 0;

        return 1;
    }

    @Override
    public UserProfile updateUserProfile(UserProfileDto dto) {
        User user = userRepository.findFirstById(dto.getId());
        user.setProfileCompleted(1);
        userRepository.save(user);
        Long userProfileId = user.getUserProfile().getId();

        UserProfile profile = userProfileRepository.findFirstById(userProfileId);
        profile.setUserGender(dto.getUserGender());
        profile.setAge(dto.getAge());
        profile.setWeight(dto.getWeight());
        profile.setHeight(dto.getHeight());
        profile.setWorkoutFrequency(dto.getWorkoutFrequency());
        profile.setNeck(dto.getNeck());
        profile.setHip(dto.getHip());

        return userProfileRepository.save(profile);
    }

}
