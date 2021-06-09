package com.poosh.app.security;


import com.poosh.app.model.UserAuth;
import com.poosh.app.repository.UserAuthRepository;
import com.poosh.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final UserAuth userAuthFromDB = userAuthRepository.findByUsername(username);
        if (userAuthFromDB == null) {
            throw new UsernameNotFoundException(username);
        }

        UserDetails userDetails=User.withUsername(userAuthFromDB.getUsername()).password(userAuthFromDB.getPassword()).roles(userAuthFromDB.getClass().getSimpleName().toUpperCase()).build();
        //userDetails.getAuthorities().forEach(auth->{
        //   System.out.println(userDetails.getPassword()+"  " +auth.toString());
        //});
        return userDetails;
    }
}
