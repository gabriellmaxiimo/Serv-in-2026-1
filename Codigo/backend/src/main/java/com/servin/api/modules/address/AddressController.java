package com.servin.api.modules.address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servin.api.modules.address.services.CepService;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private CepService cepService;

    @GetMapping("/cep/{cep}")
    public ResponseEntity<?> getAddressByCep(@PathVariable String cep) {
        try {
            var address = cepService.execute(cep);
            return ResponseEntity.ok(address);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}