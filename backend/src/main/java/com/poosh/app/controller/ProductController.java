package com.poosh.app.controller;

import com.poosh.app.service.ProductService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @ApiOperation(value = "Returns a list of all products.")
    @GetMapping("/{sortBy}")
    public ResponseEntity findAllProducts(@PathVariable String sortBy) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.findAll(sortBy));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR')")
    @PostMapping("/removeProduct")
    public ResponseEntity removeProduct(@RequestParam("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.removeProduct(id));
    }
}
