package com.poosh.app.model;

import com.poosh.app.constants.UserRole;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class UserAuth {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private UserRole userRole;

    //@NotEmpty(message = "First Name may not be empty")
    private String firstName;

    //@NotEmpty(message = "Last Name may not be empty")
    private String lastName;

    //@NotEmpty(message = "Email may not be empty")
    //@Email(message = "Email should be valid")
    private String email;

    //@Size(max=20, message = "Size must be less than {max}")
    //@Pattern(regexp="[a-z]{5,}[A-Z]+[0-9]+[\\W]")
    private String password;

    private String username;
}
