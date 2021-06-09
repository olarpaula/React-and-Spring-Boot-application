package com.poosh.app.model;

import com.poosh.app.constants.UserRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Administrator extends UserAuth{

    @Builder
    public Administrator(Long id, UserRole userRole, String firstName, String lastName, String email, String password, String username) {
        super(id, userRole, firstName, lastName, email, password, username);
    }
}
