package com.poosh.app.service;

import com.poosh.app.dto.NewsDto;
import com.poosh.app.exceptions.ApiExceptionResponse;
import com.poosh.app.model.Administrator;
import com.poosh.app.model.News;

import java.util.List;

public interface AdministratorService {

    Administrator findById(Long id) throws ApiExceptionResponse;
    void add(Administrator administrator);
    void updateAdministrator(Administrator administrator);
    News addNews(NewsDto dto);
    List<News> findAllNews();
}
