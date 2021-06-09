package com.poosh.app.dto;

import com.poosh.app.model.Basket;
import com.poosh.app.model.UserProfile;
import com.poosh.app.model.WishList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    private Basket basket;
    private UserProfile userProfile;
    private WishList wishList;

}
