package com.poosh.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
//@Data
@Setter
@Getter
@XmlTransient
public class Basket {

    @XmlTransient
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @XmlTransient
    @OneToOne(mappedBy = "basket")
    @JsonBackReference
    private User user;


    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "baskets_products",
            joinColumns = @JoinColumn(name="basket_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    List<Product> products;





    //@OneToMany(mappedBy="basket", orphanRemoval = true, cascade = CascadeType.PERSIST)
    //private List<Supplement> supplements;

}
