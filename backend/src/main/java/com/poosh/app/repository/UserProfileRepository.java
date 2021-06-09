package com.poosh.app.repository;

import com.poosh.app.model.UserProfile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends CrudRepository<UserProfile, Long> {

    UserProfile findFirstById(Long id);
}
