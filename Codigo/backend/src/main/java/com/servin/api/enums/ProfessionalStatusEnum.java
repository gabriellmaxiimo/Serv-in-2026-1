package com.servin.api.enums;

public enum ProfessionalStatusEnum {
   AVALIABLE, // Profissional disponível para ser alocado em eventos
   INACTIVE, // Profissional inativo no sistema (não pode ser usado em eventos)
   ALLOCATED, // Profissional já alocado em um evento
   PENDING_CONFIRMATION, // Profissional aguardando confirmação via e-mail (link com token enviado)
}
