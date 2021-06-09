package com.poosh.app.repository;

import com.poosh.app.model.News;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NewsRepository extends CrudRepository<News, Long> {

    List<News> findAll();
}
