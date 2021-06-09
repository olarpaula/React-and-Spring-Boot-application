package com.poosh.app.repository;

import com.poosh.app.model.Supplement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplementRepository  extends CrudRepository<Supplement, Long> {
    Supplement findFirstByName(String Name);

    Supplement findFirstById(Long id);
}
