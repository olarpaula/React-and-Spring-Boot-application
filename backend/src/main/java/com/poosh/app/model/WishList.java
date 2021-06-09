package com.poosh.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class WishList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @OneToOne(mappedBy = "wishList")
    @JsonBackReference
    private User user;

    /*@ManyToMany
    List<SkinProduct> skinProducts;

    @ManyToMany
    List<Supplement> supplements;*/

    @ManyToMany
    @JsonManagedReference
    @JoinTable(
        name = "wishlists_products",
        joinColumns = @JoinColumn(name="wishlist_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id"))
    List<Product> products;
}
