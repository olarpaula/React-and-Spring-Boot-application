package com.poosh.app.service.impl;

import com.poosh.app.dto.SupplementDto;
import com.poosh.app.model.Product;
import com.poosh.app.model.Supplement;
import com.poosh.app.repository.ProductRepository;
import com.poosh.app.repository.SupplementRepository;
import com.poosh.app.service.SupplementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class SupplementServiceImpl implements SupplementService {

    private final SupplementRepository supplementRepository;
    private final ProductRepository productRepository;

    @Autowired
    private SimpMessagingTemplate template;

    public SupplementServiceImpl (SupplementRepository supplementRepository, ProductRepository productRepository) {
        this.supplementRepository = supplementRepository;
        this.productRepository = productRepository;
    }


    @Override
    public Supplement addSupplement(SupplementDto supplementDto) {
        template.convertAndSend("/topic/socket/notification2", "Fresh products! Check " + supplementDto.getName() + " from " + supplementDto.getBrand() + "!");

        Supplement supplement = new Supplement();
        supplement.setBrand(supplementDto.getBrand());
        supplement.setName(supplementDto.getName());
        supplement.setPrice(supplementDto.getPrice());
        supplement.setSupplementForm(supplementDto.getSupplementForm());
        supplement.setSupplementFlavour((supplementDto.getSupplementFlavour()));
        supplement.setDescription(supplementDto.getDescription());
        supplement.setAvailability(true);
        productRepository.save(supplement);
        return supplementRepository.save(supplement);
    }

    @Override
    public Supplement findById(Long id) {

        Supplement supplement = supplementRepository.findFirstById(id);
        return supplement;
    }

    @Override
    public Supplement findByName(String name) {

        return supplementRepository.findFirstByName(name);
    }

    @Override
    public Supplement save(Supplement supplement) {
        productRepository.save(supplement);
        return supplementRepository.save(supplement);
    }

    @Override
    public List<Supplement> findAll(String sortBy) {

        List<Supplement> products =  (List<Supplement>) supplementRepository.findAll();

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
    public void updateSupplement(Supplement supplement) {
        Supplement new_supplement = supplementRepository.findById(supplement.getId()).orElseThrow();
        new_supplement.setName(supplement.getName());
        new_supplement.setBrand(supplement.getBrand());
        new_supplement.setPrice(supplement.getPrice());
        new_supplement.setQuantity(supplement.getQuantity());
        new_supplement.setSupplementFlavour(supplement.getSupplementFlavour());
        new_supplement.setSupplementForm(supplement.getSupplementForm());
        new_supplement.setDescription(supplement.getDescription());
        new_supplement.setAvailability(supplement.getAvailability());
        productRepository.save(supplement);
        supplementRepository.save(supplement);
    }

    @Override
    public Supplement deleteSupplement(Long id) {
        Supplement supplement = supplementRepository.findById(id).get();
        productRepository.delete(supplement);
        supplementRepository.delete(supplement);
        return supplement;
    }

}
