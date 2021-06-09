package com.poosh.app.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.poosh.app.constants.UserRole;
import lombok.*;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@XmlRootElement(name="user")
@XmlAccessorType(XmlAccessType.FIELD)
@ToString
public class User extends UserAuth{

    @XmlTransient
    @OneToOne(cascade = CascadeType.ALL)
    @JsonManagedReference
    @JoinColumn(name= "basket_id", referencedColumnName = "id")
    private Basket basket;


    @XmlTransient
    @OneToOne(cascade = CascadeType.ALL)
    @JsonManagedReference
    @JoinColumn(name= "user_profile_id", referencedColumnName = "id")
    private UserProfile userProfile;

    @XmlTransient
    @OneToOne(cascade = CascadeType.ALL)
    @JsonManagedReference
    @JoinColumn(name= "wishlist_id", referencedColumnName = "id")
    private WishList wishList;

    ///@XmlTransient
    //@OneToMany(mappedBy="user", orphanRemoval = false, cascade = CascadeType.PERSIST)
    //private List<Order> orders;

    private int profileCompleted;

    private int isSubscribed;

    private int isLogged;


    @Builder
    public User(Long id, UserRole userRole, String firstName, String lastName, String email, String password,
                Basket basket, UserProfile userProfile, WishList wishList, int profileCompleted, int isSubscribed, int isLogged, String username) {
        super(id, userRole, firstName, lastName, email, password, username);
        this.basket = basket;
        this.userProfile = userProfile;
        this.wishList = wishList;
        this.profileCompleted = profileCompleted;
        this.isSubscribed = isSubscribed;
        this.isLogged = isLogged;
    }

}
