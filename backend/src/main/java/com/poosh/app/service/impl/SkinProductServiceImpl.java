package com.poosh.app.service.impl;

import com.poosh.app.dto.SkinProductDto;
import com.poosh.app.model.Product;
import com.poosh.app.model.SkinProduct;
import com.poosh.app.repository.ProductRepository;
import com.poosh.app.repository.SkinProductRepository;
import com.poosh.app.service.SkinProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;


@Service
public class SkinProductServiceImpl implements SkinProductService {

    private final SkinProductRepository skinProductRepository;
    private final ProductRepository productRepository;

    @Autowired
    private SimpMessagingTemplate template;

    public SkinProductServiceImpl(SkinProductRepository skinProductRepository, ProductRepository productRepository) {
        this.skinProductRepository = skinProductRepository;
        this.productRepository = productRepository;
    }

//    @Override
//    public SkinProduct findById(Long id) throws ApiExceptionResponse {
//
//        SkinProduct skinProduct = skinProductRepository.findFirstById(id);
//
//        if (skinProduct == null) {
//            throw ApiExceptionResponse.builder().errors(Collections.singletonList("No skinProduct with id " + id))
//                    .message("Entity not found").status(HttpStatus.NOT_FOUND).build();
//        }
//
//        return skinProduct;
//    }

    public SkinProduct addSkinProduct(SkinProductDto skinProductDto) {

        template.convertAndSend("/topic/socket/notification", "Fresh products! Check " + skinProductDto.getName() + " from " + skinProductDto.getBrand() + "!");

        SkinProduct skinProduct = new SkinProduct();
        skinProduct.setBrand(skinProductDto.getBrand());
        skinProduct.setName(skinProductDto.getName());
        skinProduct.setPrice(skinProductDto.getPrice());
        skinProduct.setAvailability(true);
        skinProduct.setIngredients(skinProductDto.getIngredients());
        skinProduct.setHow_to_use(skinProductDto.getHow_to_use());
        skinProduct.setBenefits(skinProductDto.getBenefits());
        productRepository.save(skinProduct);
        return skinProductRepository.save(skinProduct);
    }


    @Override
    public SkinProduct findById(Long id)  {
        return  skinProductRepository.findFirstById(id);
    }

    @Override
    public SkinProduct save(SkinProduct skinProduct) {
        productRepository.save(skinProduct);
        return skinProductRepository.save(skinProduct);
    }

    @Override
    public List<SkinProduct> findAll(String sortBy) {

//        return (List<SkinProduct>) skinProductRepository.findAll();

        List<SkinProduct> products =  (List<SkinProduct>) skinProductRepository.findAll();

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
    public void updateSkinProduct(SkinProduct skinProduct) {
        SkinProduct new_skinProduct = skinProductRepository.findById(skinProduct.getId()).orElseThrow();
        new_skinProduct.setName(skinProduct.getName());
        new_skinProduct.setBrand(skinProduct.getBrand());
        new_skinProduct.setPrice(skinProduct.getPrice());
        new_skinProduct.setQuantity(skinProduct.getQuantity());
        new_skinProduct.setAvailability(skinProduct.getAvailability());
        new_skinProduct.setBenefits(skinProduct.getBenefits());
        new_skinProduct.setHow_to_use(skinProduct.getHow_to_use());
        productRepository.save(skinProduct);
        skinProductRepository.save(new_skinProduct);
    }

    @Override
    public SkinProduct deleteSkinProduct(Long id) {
        SkinProduct skinProduct = skinProductRepository.findById(id).get();
        productRepository.delete(skinProduct);
        skinProductRepository.delete(skinProduct);
        return skinProduct;
    }

    @Override
    public SkinProduct findByName(String name) {
        return skinProductRepository.findFirstByName(name);
    }
}
