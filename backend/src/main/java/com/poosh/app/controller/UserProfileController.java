package com.poosh.app.controller;

import com.poosh.app.dto.UserDetailsDto;
import com.poosh.app.dto.UserProfileDto;
import com.poosh.app.exceptions.ApiExceptionResponse;
import com.poosh.app.mapper.UserProfileMapper;
import com.poosh.app.model.User;
import com.poosh.app.model.UserProfile;
import com.poosh.app.repository.UserRepository;
import com.poosh.app.service.NutritionService;
import com.poosh.app.service.UserProfileService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/profile")
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final NutritionService nutritionService;

    public UserProfileController(UserProfileService userProfileService, NutritionService nutritionService) {
        this.userProfileService = userProfileService;
        this.nutritionService = nutritionService;
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @GetMapping("/deleteProfile/{id}")
    public String deleteProfile(@PathVariable(value = "id") Long id) {
        //call delete method from service
        userProfileService.deleteById(id);
        return "redirect:/userManagement";
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @PostMapping("/completedProfile")
    public ResponseEntity completedProfile(@RequestBody Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(userProfileService.checkCompleted(userId));}

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @PutMapping("/updateProfile")
    public ResponseEntity updateProfile(@RequestBody UserProfileDto userProfileDto) {
        return ResponseEntity.status(HttpStatus.OK).body(userProfileService.updateUserProfile(userProfileDto));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @PostMapping("/nutritionProfile")
    public ResponseEntity findNutritionProfile(@RequestBody Long id) {
        UserProfileDto dto = UserProfileMapper.mapModelToDto(userProfileService.findByUserId(id));
        return ResponseEntity.status(HttpStatus.OK).body(nutritionService.createProfile(dto));
    }
}
