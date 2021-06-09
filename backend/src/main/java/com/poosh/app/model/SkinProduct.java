package com.poosh.app.model;

import lombok.*;

import javax.persistence.Entity;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
//@Table(name = "skin_products")
public class SkinProduct extends Product {
    /*@ManyToOne
    @JoinColumn(name="basket_id")
    private Basket skinProductBasket;

    @ManyToMany
    private List<WishList> wishLists;*/

    private String ingredients;

    private String how_to_use;

    private String benefits;

    @Builder
    public SkinProduct(Long id,  List<Basket> baskets, List<WishList> wishLists, String brand, String name, Float price, int quantity, Boolean availability, String url, String ingredients, String how_to_use, String benefits) {
        super(id, baskets, wishLists, brand,name,price,quantity, availability, url);
        this.ingredients = ingredients;
        this.how_to_use = how_to_use;
        this.benefits = benefits;
        //this.skinProductBasket = skinProductBasket;
        //this.wishLists = wishLists;
    }
}





