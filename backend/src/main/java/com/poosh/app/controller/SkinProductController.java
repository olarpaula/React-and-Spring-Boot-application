package com.poosh.app.controller;

import com.poosh.app.dto.SkinProductDto;
import com.poosh.app.service.SkinProductService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/skinproducts")
@PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
public class SkinProductController {
    private final SkinProductService skinProductService;

    public SkinProductController(SkinProductService skinProductService) {
        this.skinProductService = skinProductService;
    }

    @ApiOperation(value = "Returns a list of all skin products.")
    @GetMapping("/{sortBy}")
    public ResponseEntity findAllSkinProducts(@PathVariable String sortBy) {
        return ResponseEntity.status(HttpStatus.OK).body(skinProductService.findAll(sortBy));
    }

    @ApiOperation(value = "Saves a new skin product to repository.")
    @PutMapping
    public ResponseEntity saveNewSkinProduct(@RequestBody SkinProductDto skinProduct) {
        return ResponseEntity.status(HttpStatus.OK).body(skinProductService.addSkinProduct(skinProduct));
    }

}


