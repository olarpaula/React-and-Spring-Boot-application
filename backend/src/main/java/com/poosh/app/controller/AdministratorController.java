package com.poosh.app.controller;

import com.poosh.app.dto.CredentialsDto;
import com.poosh.app.dto.NewsDto;
import com.poosh.app.exceptions.ApiExceptionResponse;
import com.poosh.app.model.Administrator;
import com.poosh.app.service.AdministratorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/administrator")
public class AdministratorController {

    private final AdministratorService administratorService;

    public AdministratorController(AdministratorService administratorService) {
        this.administratorService = administratorService;
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR')")
    @PostMapping("/addNews")
    public ResponseEntity addNews(@RequestBody NewsDto dto)  {
        return ResponseEntity.status(HttpStatus.OK).body(administratorService.addNews(dto));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @GetMapping("/findAllNews")
    public ResponseEntity findAll()  {
        return ResponseEntity.status(HttpStatus.OK).body(administratorService.findAllNews());
    }
}
