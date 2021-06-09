package com.poosh.app.repository;

import com.poosh.app.model.UserAuth;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAuthRepository extends CrudRepository<UserAuth, Long> {
    UserAuth findFirstByEmail(String email);
    UserAuth findFirstById(Long id);
    UserAuth findByUsername(String username);
}
