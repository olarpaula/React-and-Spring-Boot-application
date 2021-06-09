package com.poosh.app.repository;

import com.poosh.app.model.SkinProduct;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkinProductRepository extends CrudRepository<SkinProduct, Long> {

    SkinProduct findFirstById(Long id);
    SkinProduct findFirstByName(String name);
}
