package com.servin.api.modules.eventProfessional.enums;

public enum EventProfessionalStatusEnum {
    PENDING_CONFIRMATION,    // email enviado, aguardando resposta
    CONFIRMED,               // confirmou presença
    REJECTED,                 // recusou
    CANCELED
}
