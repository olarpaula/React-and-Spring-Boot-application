package com.poosh.app.repository;

import com.poosh.app.model.User;
import com.poosh.app.model.UserAuth;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    //User findFirstByLastName(String lastName);
    User findFirstByFirstName(String firstName);
    User findFirstByLastName(String firstName);
    List<User> findAllByFirstName(String firstName);
    List<User> findAllByLastName(String lastName);
    List<User> findAllByFirstNameAndLastName(String firstName, String lastName);
    User findFirstByEmail(String email);
    User findFirstByUserProfileId(Long id);
    User findFirstById(Long id);

}
