package com.poosh.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToMany(mappedBy = "products")
    @JsonBackReference
    private List<Basket> basketList;

    @ManyToMany(mappedBy = "products")
    @JsonBackReference
    private List<WishList> wishLists;

    @NotEmpty(message = "Brand may not be empty")
    private String brand;

    @NotEmpty(message = "Name may not be empty")
    private String name;

    @NotNull(message = "Price may not be empty")
    private Float price;

    private int quantity;

    private Boolean availability;

    private String url;
}
