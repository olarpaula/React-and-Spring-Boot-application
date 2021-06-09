package com.poosh.app.service.impl;

import com.poosh.app.constants.UserRole;
import com.poosh.app.dto.NewsDto;
import com.poosh.app.exceptions.ApiExceptionResponse;
import com.poosh.app.mapper.NewsMapper;
import com.poosh.app.model.Administrator;
import com.poosh.app.model.News;
import com.poosh.app.repository.AdministratorRepository;
import com.poosh.app.repository.NewsRepository;
import com.poosh.app.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class AdministratorServiceImpl implements AdministratorService {

    private final AdministratorRepository administratorRepository;
    private final NewsRepository newsRepository;

    @Autowired
    private SimpMessagingTemplate template;

    public AdministratorServiceImpl(AdministratorRepository administratorRepository, NewsRepository newsRepository) {
        this.administratorRepository = administratorRepository;
        this.newsRepository = newsRepository;
    }

    @Override
    public Administrator findById(Long id) throws ApiExceptionResponse {

        Administrator administrator = administratorRepository.findFirstById(id);

        if (administrator == null) {
            throw ApiExceptionResponse.builder().errors(Collections.singletonList("No administrator with id " + id))
                    .message("Entity not found").status(HttpStatus.NOT_FOUND).build();
        }

        return administrator;
    }


    @Override
    public void add(Administrator administrator) {
        administrator.setUserRole(UserRole.ADMINISTRATOR);
        administratorRepository.save(administrator);
    }

    @Override
    public void updateAdministrator(Administrator administrator) {
        Administrator new_administrator = administratorRepository.findById(administrator.getId()).orElseThrow();
        new_administrator.setFirstName(administrator.getFirstName());
        new_administrator.setLastName(administrator.getLastName());
        new_administrator.setEmail(administrator.getEmail());
        new_administrator.setPassword(administrator.getPassword());
        administratorRepository.save(administrator);
    }

    @Override
    public News addNews(NewsDto dto) {
        template.convertAndSend("/topic/socket/notification3", "Fresh News on Poosh!");

        News news = NewsMapper.mapDtoToModel(dto);
        return newsRepository.save(news);
    }

    @Override
    public List<News> findAllNews() {
        return newsRepository.findAll();
    }

}
