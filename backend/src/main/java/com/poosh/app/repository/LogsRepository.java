package com.poosh.app.repository;

import com.poosh.app.model.Logs;
import com.poosh.app.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogsRepository extends CrudRepository<Logs, Long> {
//    Logs findFirstByOrderByUserIdDesc(Long id);
    List<Logs> findByUserIdOrderByIdDesc(Long id);
    Logs findFirstById(Long id);


}
