package com.poosh.app.controller;

import com.poosh.app.dto.*;
import com.poosh.app.exceptions.ApiExceptionResponse;
import com.poosh.app.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {

        this.userService = userService;
    }


    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @ApiOperation(value = "Returns a list of all users.")
    @GetMapping
    public ResponseEntity findAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAll());
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @ApiOperation(value = "Returns a list of all users log activity.")
    @GetMapping("/findLogs")
    public ResponseEntity findAllLogs() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAllLogs());
    }

    @ApiOperation(value = "Saves new user to repository.")
    @PutMapping("/createAcc")
    public ResponseEntity saveNewUser(@RequestBody UserDetailsDto user) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.addUser(user));}

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @ApiOperation(value = "Returns user account info details.")
    @GetMapping("/account-info")
    public ResponseEntity findUser(@RequestParam("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findDtoById(id));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @GetMapping("/account-info/adm")
    public ResponseEntity findAdmUser(@RequestParam("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAdmDtoById(id));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @ApiOperation(value = "Returns boolean value coresponding to users completing their nutrition profile.")
    @GetMapping("/completedProfile")
    public ResponseEntity completedProfile(@RequestParam("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.checkCompletedProfile(id));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @ApiOperation(value = "Returns a user wishlist.")
    @GetMapping("/myWishList")
    public ResponseEntity findMyWishList(@RequestParam("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findMyWishList(id));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @GetMapping("/myBasket")
    public ResponseEntity findMyBasket(@RequestParam("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findMyBasket(id));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @PutMapping("/account-update")
    public ResponseEntity updateInfo(@RequestBody UserInfoDto dto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateAccountInfo(dto));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @PostMapping("/addProductToWishlist")
    public ResponseEntity addProductToWishList(@RequestBody ProductDto dto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.addProductToWishList(dto));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR')")
    @PostMapping("/addProductToBasket")
    public ResponseEntity addProductToBasket(@RequestBody ProductDto dto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.addProductToBasket(dto));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @PutMapping("/deleteProductFromBasket")
    public ResponseEntity deleteProductFromBasket(@RequestBody ProductDto dto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteProductFromBasket(dto));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @PutMapping("/deleteProductFromWishlist")
    public ResponseEntity deleteProductFromWishlist(@RequestBody ProductDto dto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteProductFromWishlist(dto));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @PostMapping("/deleteUser")
    public ResponseEntity deleteUser(@RequestParam("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUser(id));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @PutMapping("/passwordupdate")
    public ResponseEntity passwordupdate(@RequestBody CredentialsDto dto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updatePassword(dto));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @PostMapping("/updateSubscription")
    public ResponseEntity updateSubscription(@RequestBody SubscrbtionDto dto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateSubscription(dto));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @PostMapping("/addLog")
    public ResponseEntity addLog(@RequestBody LogDto logDto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.addLog(logDto));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @PostMapping("/addLogOut")
    public ResponseEntity addLogOut(@RequestBody LogDto logDto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.addLogOut(logDto));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @GetMapping("/userStatus")
    public ResponseEntity userStatus() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.userStatus());
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR')")
    @GetMapping("/export/{userID}")
    public ResponseEntity exportUserDetails(@PathVariable Long userID, @RequestParam String fileType) {
        return ResponseEntity.ok(userService.exportUserDetails(userID, fileType));
    }

}