package com.poosh.app.service.impl;

import com.poosh.app.model.Product;
import com.poosh.app.model.SkinProduct;
import com.poosh.app.model.Supplement;
import com.poosh.app.repository.ProductRepository;
import com.poosh.app.repository.SkinProductRepository;
import com.poosh.app.repository.SupplementRepository;
import com.poosh.app.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final SkinProductRepository skinProductRepository;
    private final SupplementRepository supplementRepository;

    public ProductServiceImpl(ProductRepository productRepository, SkinProductRepository skinProductRepository, SupplementRepository supplementRepository) {
        this.productRepository = productRepository;
        this.skinProductRepository = skinProductRepository;
        this.supplementRepository = supplementRepository;
    }

    @Override
    public List<Product> findAll(String sortBy) {

        List<Product> products =  (List<Product>) productRepository.findAll();

        if(sortBy.equals("highToLow")) {
            Collections.sort(products, Comparator.comparing(Product::getPrice));
            Collections.reverse(products);
        }

        else if (sortBy.equals("lowToHigh")) {
            Collections.sort(products, Comparator.comparing(Product::getPrice));
        }

        return products;
    }

    @Override
    public Product removeProduct(Long id) {
        Product product = productRepository.findFirstById(id);
        if(product instanceof SkinProduct) {
            skinProductRepository.delete((SkinProduct) product);
        }
        else {
            supplementRepository.delete((Supplement) product);
        }
        productRepository.delete(product);
        return product;
    }
}
