package com.poosh.app.mapper;

import com.poosh.app.dto.NewsDto;
import com.poosh.app.dto.UserDto;
import com.poosh.app.model.News;
import com.poosh.app.model.User;

import java.text.SimpleDateFormat;
import java.util.Date;

public class NewsMapper {

    public static News mapDtoToModel(NewsDto dto) {
        News news = new News();
        news.setTopic(dto.getTopic());
        news.setNews(dto.getNews());

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date();

        news.setDate(date.toString());

        return news;
    }
}
