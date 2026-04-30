package com.servin.api.modules.address.services;

import com.servin.api.modules.address.dto.ViaCepResponse;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CepService {

    private final RestTemplate restTemplate = new RestTemplate();

    public ViaCepResponse execute(String cep) {
        String cepLimpo = cep.replaceAll("\\D", "");
        String url = "https://viacep.com.br/ws/" + cepLimpo + "/json/";

        ViaCepResponse response = restTemplate.getForObject(url, ViaCepResponse.class);

        if (response == null) {
            throw new RuntimeException("CEP não encontrado");
        }

        return response;
    }
}