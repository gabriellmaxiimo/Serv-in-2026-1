package com.servin.api.modules.address.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ViaCepResponse(
        String cep,

        @JsonProperty("logradouro") String street,

        @JsonProperty("bairro") String neighboohood,

        @JsonProperty("localidade") String city,

        String uf) {
}