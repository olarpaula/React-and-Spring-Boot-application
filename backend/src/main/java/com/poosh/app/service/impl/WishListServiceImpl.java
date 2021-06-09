package com.poosh.app.service.impl;

import com.poosh.app.model.WishList;
import com.poosh.app.repository.WishListRepository;
import com.poosh.app.service.WishListService;
import org.springframework.stereotype.Service;

@Service
public class WishListServiceImpl implements WishListService {

    private final WishListRepository wishListRepository;

    public WishListServiceImpl (WishListRepository wishListRepository) {
        this.wishListRepository = wishListRepository;
    }

    @Override
    public void saveWishList(WishList wishList) {
        wishListRepository.save(wishList);
    }
}
