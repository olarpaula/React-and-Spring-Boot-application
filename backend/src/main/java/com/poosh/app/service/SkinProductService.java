package com.poosh.app.service;

import com.poosh.app.dto.SkinProductDto;
import com.poosh.app.model.SkinProduct;

import java.util.List;

public interface SkinProductService {

    SkinProduct findById(Long id);
    SkinProduct save(SkinProduct skinProduct);
    List<SkinProduct> findAll(String sortBy);
    void updateSkinProduct(SkinProduct skinProduct);
    SkinProduct deleteSkinProduct(Long id);
    SkinProduct findByName(String name);

    SkinProduct addSkinProduct(SkinProductDto skinProductDto);
}
