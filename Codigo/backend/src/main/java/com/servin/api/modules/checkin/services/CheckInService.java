package com.servin.api.modules.checkin.services;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import java.util.UUID;
import java.util.function.Supplier;
import java.time.LocalDateTime;

import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.event.repository.EventRepository;
import com.servin.api.modules.eventProfessional.model.EventProfessional;
import com.servin.api.modules.eventProfessional.repository.EventProfessionalRepository;
import com.servin.api.modules.checkin.repository.CheckInRepository;
import com.servin.api.modules.checkin.dto.CheckInRequestDTO;
import com.servin.api.modules.checkin.dto.CheckInResponseDTO;
import com.servin.api.modules.checkin.model.CheckIn;
import com.servin.api.modules.eventProfessional.enums.EventProfessionalStatusEnum;

@Service
@RequiredArgsConstructor

public class CheckInService {
    private final EventRepository eventRepository;
    private final EventProfessionalRepository eventProfessionalRepository;
    private final CheckInRepository checkInRepository;

    public CheckInResponseDTO realizarCheckIn(UUID eventId, UUID professionalId, CheckInRequestDTO dto ){
        if(dto == null){
            throw new RuntimeException("Dados do check-in não informados");
        }

        Event event = eventRepository.findByIdAndDeletedAtIsNull(eventId).orElseThrow(new Supplier<RuntimeException>() {
            @Override
            public RuntimeException get(){
                return new RuntimeException("Evento não encontrado");
            }
        });


        EventProfessional eventProfessional = eventProfessionalRepository.findByEventIdAndProfessionalId(eventId, professionalId).orElseThrow(() ->
            new RuntimeException("Profissional não vinculado ao evento")
        );

        LocalDateTime agora = LocalDateTime.now();
        LocalDateTime inicioJanela = event.getInitialDate().minusHours(2);

        if(eventProfessional.getStatus() != EventProfessionalStatusEnum.CONFIRMED){
            throw new RuntimeException("Profissional não confirmou presença");
        }

        if(dto.getCredentialNumber() == null || dto.getCredentialNumber().trim().isBlank()){
            throw new RuntimeException("Número da credencial é obrigatório");
        }

        String credentialNumber = dto.getCredentialNumber().trim();

        if(checkInRepository.existsByEventProfessional(eventProfessional)){
            throw new RuntimeException("Check-in já realizado");
        }

        if(agora.isBefore(inicioJanela)){
            throw new RuntimeException("Check-in disponivel apenas 2 horas antes do inicio do evento");
        }

        if(event.getFinalDate() != null && agora.isAfter(event.getFinalDate())){
            throw new RuntimeException("Evento já encerrado");
        }

        CheckIn checkIn = new CheckIn();

        checkIn.setEventProfessional(eventProfessional);
        checkIn.setCredentialNumber(credentialNumber);
        checkIn.setCheckInAt(LocalDateTime.now());
        checkIn.setCheckOutAt(null);

        CheckIn savedCheckIn = checkInRepository.save(checkIn);

        return new CheckInResponseDTO(
            savedCheckIn.getId(),
            savedCheckIn.getCredentialNumber(),
            savedCheckIn.getCheckInAt(),
            savedCheckIn.getCheckOutAt()
        );
    }

    public CheckInResponseDTO realizarCheckOut(UUID eventId, UUID professionalId){
        Event event = eventRepository.findByIdAndDeletedAtIsNull(eventId).orElseThrow(new Supplier<RuntimeException>() {
            @Override
            public RuntimeException get(){
                return new RuntimeException("Evento não encontrado");
            }
        });

        EventProfessional eventProfessional = eventProfessionalRepository.findByEventIdAndProfessionalId(eventId, professionalId).orElseThrow(() ->
            new RuntimeException("Profissional não vinculado ao evento")
        );

        if(Boolean.FALSE.equals(event.getRequiresCheckout())){
            throw new RuntimeException("Este evento não exige checkout");
        }
        
        CheckIn checkIn = checkInRepository.findByEventProfessional(eventProfessional).orElseThrow(() -> new RuntimeException("Check-in não encontrado"));

        if(checkIn.getCheckOutAt() != null){
            throw new RuntimeException("Checkout já realizado");
        }

        checkIn.setCheckOutAt(LocalDateTime.now());

        CheckIn savedCheckIn = checkInRepository.save(checkIn);

        return new CheckInResponseDTO(
            savedCheckIn.getId(),
            savedCheckIn.getCredentialNumber(),
            savedCheckIn.getCheckInAt(),
            savedCheckIn.getCheckOutAt()
        );
    }
}
