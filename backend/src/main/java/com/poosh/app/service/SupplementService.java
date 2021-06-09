package com.poosh.app.service;

import com.poosh.app.dto.SupplementDto;
import com.poosh.app.model.Supplement;

import java.util.List;

public interface SupplementService {

    Supplement findById(Long id) ;
    Supplement findByName(String name);
    Supplement save(Supplement supplement);
    void updateSupplement(Supplement supplement);
    Supplement deleteSupplement(Long id);
    List<Supplement> findAll(String sortBy);
    Supplement addSupplement(SupplementDto supplementDto);

}
