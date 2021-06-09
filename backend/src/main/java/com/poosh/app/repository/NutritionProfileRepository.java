package com.poosh.app.repository;

import com.poosh.app.model.NutritionProfile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutritionProfileRepository extends CrudRepository<NutritionProfile, Long> {
    NutritionProfile findFirstById(Long id);
}
