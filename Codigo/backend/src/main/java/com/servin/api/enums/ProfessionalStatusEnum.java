package com.servin.api.enums;

public enum ProfessionalStatusEnum {
   AVALIABLE, // Profissional disponível para ser alocado em eventos
   INACTIVE, // Profissional já alocado em um evento
   ALLOCATED, // Profissional inativo no sistema (não pode ser usado em eventos)
   PENDING_CONFIRMATION, // Profissional aguardando confirmação via e-mail (link com token enviado)
}
