package com.poosh.app.controller;

import com.poosh.app.dto.SupplementDto;
import com.poosh.app.service.SupplementService;
import com.poosh.app.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/supplements")

public class SupplementController {

    private final SupplementService supplementService;
    private final UserService userService;

    public SupplementController(SupplementService supplementService, UserService userService) {
        this.supplementService = supplementService;
        this.userService = userService;
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    @ApiOperation(value = "Returns a list of all supplements.")
    @GetMapping("/{sortBy}")
    public ResponseEntity findAllSupplements(@PathVariable String sortBy) {
        return ResponseEntity.status(HttpStatus.OK).body(supplementService.findAll(sortBy));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR')")
    @ApiOperation(value = "Saves a new supplement to repository.")
    @PutMapping
    public ResponseEntity saveNewSupplement(@RequestBody SupplementDto supplement) {
        return ResponseEntity.status(HttpStatus.OK).body(supplementService.addSupplement(supplement));
    }

}
