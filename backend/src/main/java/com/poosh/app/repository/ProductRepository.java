package com.poosh.app.repository;

import com.poosh.app.model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
    Product findFirstById(Long id);
}
