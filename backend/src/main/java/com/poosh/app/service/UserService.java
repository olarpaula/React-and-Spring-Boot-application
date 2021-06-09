package com.poosh.app.service;

import com.poosh.app.dto.*;
import com.poosh.app.exceptions.ApiExceptionResponse;
import com.poosh.app.model.Logs;
import com.poosh.app.model.Product;
import com.poosh.app.model.User;
import com.poosh.app.model.WishList;

import java.util.List;

public interface UserService {
    User findById(Long id);
    User findByEmail(String email);
    List<User> findAll();
    User save(User user);
    List<User> findAllByFirsAndLastName(String firstName, String lastName) throws ApiExceptionResponse;

    User deleteUser(Long id);
    //Boolean userTest(String email);

    User addUser(UserDetailsDto userDetailsDto);

    CredentialsDto updatePassword(CredentialsDto userCredentials);
    UserInfoDto findDtoById(Long id);
    AdministratorDto findAdmDtoById(Long id);

    User updateAccountInfo(UserInfoDto dto);
    User addProductToWishList(ProductDto dto);
    User addProductToBasket(ProductDto dto);
    int checkCompletedProfile(Long id);

    List<Product> findMyWishList(Long id);
    List<Product> findMyBasket(Long id);

    User deleteProductFromBasket(ProductDto dto);
    User deleteProductFromWishlist(ProductDto dto);

    User updateSubscription(SubscrbtionDto dto);

    Logs addLog(LogDto dto);
    Logs addLogOut(LogDto dto);
    List<Logs> findAllLogs();

    UserStatusDto userStatus();

    String exportUserDetails(Long userID, String fileType);
}
