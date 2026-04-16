package com.servin.api.modules.professional.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.professional.repository.ProfessionalRepository;
import com.servin.api.model.Professional;

@Service
public class ProfessionalService {

    @Autowired
    private ProfessionalRepository repository;

}
