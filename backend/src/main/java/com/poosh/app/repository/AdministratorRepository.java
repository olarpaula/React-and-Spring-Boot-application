package com.poosh.app.repository;

import com.poosh.app.model.Administrator;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministratorRepository extends CrudRepository<Administrator, Long> {
    Administrator findFirstById(Long id);
}
