package com.poosh.app.service.impl;

import com.poosh.app.constants.FileType;
import com.poosh.app.constants.UserRole;
import com.poosh.app.dto.*;
import com.poosh.app.exceptions.ApiExceptionResponse;
import com.poosh.app.mapper.UserMapper;
import com.poosh.app.model.*;
import com.poosh.app.repository.*;
import com.poosh.app.service.UserService;
import com.poosh.app.utils.FileExporter;
import com.poosh.app.utils.TXTFileExporter;
import com.poosh.app.utils.XMLFileExporter;
import io.swagger.v3.oas.models.media.XML;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserAuthRepository userAuthRepository;
    private final BasketRepository basketRepository;
    private final WishListRepository wishListRepository;
    private final NutritionProfileRepository nutritionProfileRepository;
    private final SkinProductRepository skinProductRepository;
    private final ProductRepository productRepository;
    private final LogsRepository logsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, BasketRepository basketRepository, WishListRepository wishListRepository,
                           NutritionProfileRepository nutritionProfileRepository, UserAuthRepository userAuthRepository, SkinProductRepository skinProductRepository, ProductRepository productRepository, LogsRepository logsRepository) {
        this.userRepository = userRepository;
        this.basketRepository = basketRepository;
        this.wishListRepository = wishListRepository;
        this.nutritionProfileRepository = nutritionProfileRepository;
        this.userAuthRepository = userAuthRepository;
        this.skinProductRepository = skinProductRepository;
        this.productRepository = productRepository;
        this.logsRepository = logsRepository;
    }


    @Override
    public User findById(Long id) { return userRepository.findFirstById(id); }

    @Override
    public User findByEmail(String email) { return userRepository.findFirstByEmail(email); }


    public List<User> findAll() {
        List<User> users = (List<User>) userRepository.findAll();
        return users;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User addUser(UserDetailsDto userDetailsDto) {
        User user = new User();
        user.setUserRole(UserRole.USER);
        user.setFirstName(userDetailsDto.getFirstName());
        user.setLastName(userDetailsDto.getLastName());
        user.setEmail(userDetailsDto.getEmail());
        //user.setPassword(userDetailsDto.getPassword());
        user.setProfileCompleted(0);
        user.setIsSubscribed(0);
        user.setIsLogged(0);
        user.setUsername(user.getEmail());

        String encoded_pass = passwordEncoder.encode(userDetailsDto.getPassword());
        user.setPassword(encoded_pass);

        Basket basket = new Basket(null, user, null);
        user.setBasket(basket);
        WishList wishList = new WishList(null, user, null);
        user.setWishList(wishList);
        UserProfile userProfile = new UserProfile(null, user, null, 0, null, 0, null, 0, 0, 0, null, null);
        user.setUserProfile(userProfile);
        NutritionProfile nutritionProfile = new NutritionProfile(null, userProfile, null, 0, 0, 0, 0, null, 0, null, null, null, null);
        userProfile.setNutritionProfile(nutritionProfile);

        nutritionProfileRepository.save(nutritionProfile);
        basketRepository.save(basket);
        wishListRepository.save(wishList);
        nutritionProfileRepository.save(nutritionProfile);
        userAuthRepository.save(user);

        return userRepository.save(user);
    }

    @Override
    public CredentialsDto updatePassword(CredentialsDto userCredentials) {
        User user = userRepository.findFirstByEmail(userCredentials.getEmail());
        user.setPassword(userCredentials.getPassword());
        userRepository.save(user);

        CredentialsDto credentials = CredentialsDto.builder().email(user.getEmail()).password(user.getPassword()).build();
        return credentials;
    }

    @Override
    public UserInfoDto findDtoById(Long id) {
        User user = userRepository.findFirstById(id);
        UserInfoDto dto = UserMapper.mapModelToInfoDto(user);
        return dto;
    }

    @Override
    public AdministratorDto findAdmDtoById(Long id) {
        UserAuth user = userAuthRepository.findFirstById(id);
        AdministratorDto dto = UserMapper.mapModelToAdmDto(user);
        return dto;
    }

    @Override
    public User updateAccountInfo(UserInfoDto dto) {
        User user = userRepository.findFirstById(dto.getId());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPassword(dto.getPassword());
        return userRepository.save(user);
    }

    @Override
    public User addProductToBasket(ProductDto dto) {
        Long user_id = dto.getUser_id();
        Long product_id = dto.getProduct_id();

        User user = userRepository.findFirstById(user_id);
        Basket basket = user.getBasket();
        List<Product> productList = basket.getProducts();

        Product product = productRepository.findFirstById(product_id);

        productList.add(product);
        basket.setProducts(productList);
        user.setBasket(basket);

        return userRepository.save(user);
    }

    @Override
    public int checkCompletedProfile(Long id) {
        User user = userRepository.findFirstById(id);

        return user.getProfileCompleted();
    }

    @Override
    public List<Product> findMyWishList(Long id) {
        User user = userRepository.findFirstById(id);
        WishList wishList = user.getWishList();

        return wishList.getProducts();
    }

    @Override
    public List<Product> findMyBasket(Long id) {
        User user = userRepository.findFirstById(id);
        Basket basket = user.getBasket();

        return basket.getProducts();
    }

    @Override
    public User deleteProductFromBasket(ProductDto dto) {
        User user = userRepository.findFirstById(dto.getUser_id());

        Basket basket = user.getBasket();
        List<Product> products = basket.getProducts();

        for(int i=0; i<products.size(); i++) {
            if (products.get(i).getId() == dto.getProduct_id().longValue()) {
                products.remove(products.get(i));
            }
        }

        basket.setProducts(products);
        user.setBasket(basket);
        return userRepository.save(user);
    }

    @Override
    public User deleteProductFromWishlist(ProductDto dto) {
        User user = userRepository.findFirstById(dto.getUser_id());

        WishList wishList = user.getWishList();
        List<Product> products = wishList.getProducts();

        for(int i=0; i<products.size(); i++) {
            if (products.get(i).getId() == dto.getProduct_id().longValue()) {
                products.remove(products.get(i));
            }
        }

        wishList.setProducts(products);
        user.setWishList(wishList);
        return userRepository.save(user);
    }

    @Override
    public User updateSubscription(SubscrbtionDto dto) {
        User user = userRepository.findFirstById(dto.getId());
        user.setIsSubscribed(dto.getIsSubscribed());
        return user;
    }

    @Override
    public Logs addLog(LogDto dto) {
        Logs logs = new Logs();
        logs.setUserId(dto.getId());
        logs.setLoggedIn(dto.getLoggedIn());
        logs.setLoggedOut(dto.getLoggedOut());

        logsRepository.save(logs);

        User user = userRepository.findFirstById(dto.getId());
        user.setIsLogged(1);
        userRepository.save(user);

        return logsRepository.save(logs);
    }

    @Override
    public Logs addLogOut(LogDto dto) {
        List<Logs> logsList = logsRepository.findByUserIdOrderByIdDesc(dto.getId());
        Logs logs = logsList.get(0);

        logs.setLoggedOut(dto.getLoggedOut());

        User user = userRepository.findFirstById(dto.getId());
        user.setIsLogged(0);
        userRepository.save(user);

        return logsRepository.save(logs);
    }

    @Override
    public List<Logs> findAllLogs() {
        List<Logs> logs = (List<Logs>) logsRepository.findAll();
        return logs;
    }

    @Override
    public UserStatusDto userStatus() {
        List<User> users = (List<User>) userRepository.findAll();

        int activeUsers = 0;

        UserStatusDto dto = new UserStatusDto();
        dto.setTotalUsers(users.size());

        for(int i=0; i<users.size(); i++) {
            User user = users.get(i);
            if(user.getIsLogged() == 1) {
                activeUsers++;
            }
        }

        dto.setActiveUsers(activeUsers);
        dto.setNotActiveUsers(dto.getTotalUsers()-dto.getActiveUsers());

        return dto;
    }

    @Override
    public String exportUserDetails(Long userID, String fileType) {
        User user = userRepository.findFirstById(userID);
        FileExporter fileExporter;
        if(fileType.equals(FileType.XML)) {
            fileExporter = new XMLFileExporter();
            return fileExporter.exportData(user);
        }
        else if(fileType.equals(FileType.TXT)) {
            fileExporter = new TXTFileExporter();
            return fileExporter.exportData(user);
        }
        return null;
    }

    @Override
    public User addProductToWishList(ProductDto dto) {
        Long user_id = dto.getUser_id();
        Long product_id = dto.getProduct_id();

        User user = userRepository.findFirstById(user_id);
        WishList wishList = user.getWishList();
        List<Product> productList = wishList.getProducts();

        Product product = productRepository.findFirstById(product_id);

        productList.add(product);
        wishList.setProducts(productList);
        user.setWishList(wishList);

        return userRepository.save(user);
    }

    @Override
    public List<User> findAllByFirsAndLastName(String firstName, String lastName) throws ApiExceptionResponse {
        List<User> users = (List<User>) userRepository.findAllByFirstNameAndLastName(firstName, lastName);
        if(users == null) {
            ArrayList<String> errors = new ArrayList<>();
            errors.add("Might not exist with first name " + firstName);
            errors.add("Might not exist with last name " + lastName);
            errors.add("Might not find by the pair provided");
            throw ApiExceptionResponse.builder().errors(errors)
                    .message("Entity not found").status(HttpStatus.NOT_FOUND).build();
        }
        return users;
    }

    @Override
    public User deleteUser(Long id) {
        User user = userRepository.findById(id).get();
        userRepository.delete(user);
        return user;
    }
}
