package com.poosh.app.model;

import com.poosh.app.constants.SupplementFlavour;
import com.poosh.app.constants.SupplementForm;
import lombok.*;

import javax.persistence.Entity;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
//@Data
@Setter
@Getter
//@Table(name = "supplements")
public class Supplement extends Product{

    /*@ManyToOne
    @JoinColumn(name="basket_id")
    private Basket supplementProductBasket;

    @ManyToMany
    private List<WishList> wishLists;*/

    private SupplementForm supplementForm;

    private String description;

    private SupplementFlavour supplementFlavour;

    @Builder
    public Supplement(Long id, List<Basket> baskets, List<WishList> wishLists, String brand, String name, Float price, int quantity, Boolean availability, String url, SupplementForm supplementForm, String description,
                      SupplementFlavour supplementFlavour) {
        super(id, baskets, wishLists, brand,name,price,quantity, availability, url);
        this.supplementForm = supplementForm;
        this.description = description;
        this.supplementFlavour = supplementFlavour;
        //this.supplementProductBasket = supplementProductBasket;
        //this.wishLists = wishLists;
    }

}
