package com.poosh.app.service.impl;

import com.poosh.app.model.Basket;
import com.poosh.app.repository.BasketRepository;
import com.poosh.app.service.BasketService;
import org.springframework.stereotype.Service;

@Service
public class BasketServiceImpl implements BasketService {

    private final BasketRepository basketRepository;

    public BasketServiceImpl(BasketRepository basketRepository) {
        this.basketRepository = basketRepository;
    }

    @Override
    public void add(Basket basket) {
        basketRepository.save(basket);
    }
}
