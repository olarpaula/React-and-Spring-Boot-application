package com.poosh.app.service;

import com.poosh.app.model.Product;
import com.poosh.app.model.SkinProduct;

import java.util.List;

public interface ProductService {

    List<Product> findAll(String sortBy);
    Product removeProduct(Long id);
}
