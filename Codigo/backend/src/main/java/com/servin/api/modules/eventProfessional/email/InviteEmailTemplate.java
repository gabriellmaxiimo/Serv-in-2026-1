package com.servin.api.modules.eventProfessional.email;

import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.professional.model.Professional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class InviteEmailTemplate {

    private InviteEmailTemplate() {
    }

    public static String subject(Event event) {
        return "Convite para " + event.getName();
    }

    public static String body(Event event, Professional professional, String invitationPageLink) {

        String roleName = professional.getRole() != null
                ? professional.getRole().getName()
                : "profissional";

        return """
        <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">

            <!-- CONTAINER -->
            <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;">

                <!-- HEADER (EMPRESA) -->
                <div style="background:#1f3c88;color:#fff;padding:20px;text-align:center;">
                    <h2 style="margin:0;">ServIn</h2>
                    <p style="margin:5px 0 0;font-size:14px;">Sistema de Convites de Eventos</p>
                </div>

                <!-- BODY -->
                <div style="padding:25px;color:#333;">

                    <p style="font-size:16px;">Olá, <strong>%s</strong>!</p>

                    <p style="font-size:14px;line-height:1.5;">
                        Você foi convidado para atuar como <strong>%s</strong> no evento abaixo.
                    </p>

                    <!-- CARD DO EVENTO -->
                    <div style="border:1px solid #ddd;border-radius:8px;padding:15px;background:#fafafa;margin:20px 0;">

                        <h3 style="margin-top:0;color:#1f3c88;">%s</h3>

                        <p style="margin:6px 0;"><strong>Local:</strong> %s, %s, %s</p>
                        <p style="margin:6px 0;"><strong>Início:</strong> %s</p>
                        <p style="margin:6px 0;"><strong>Encerramento:</strong> %s</p>

                    </div>

                    <!-- BOTÃO -->
                    <div style="text-align:center;margin:25px 0;">
                        <a href="%s"
                           style="background:#27ae60;color:#fff;padding:12px 22px;
                           text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
                            Abrir convite
                        </a>
                    </div>

                    <p style="font-size:12px;color:#777;line-height:1.4;">
                        Ao acessar o sistema, você poderá confirmar ou recusar sua participação.
                        Caso não haja resposta, o convite será considerado ignorado.
                    </p>

                </div>

                <!-- FOOTER -->
                <div style="background:#f0f0f0;text-align:center;padding:12px;font-size:12px;color:#777;">
                    © ServIn - Todos os direitos reservados
                </div>

            </div>
        </div>
        """.formatted(
                professional.getName(),
                roleName,
                event.getName(),
                event.getStreet(),
                event.getNeighborhood(),
                event.getCity(),
                formatDateTime(event.getInitialDate()),
                formatDateTime(event.getFinalDate()),
                invitationPageLink
        );
    }

    private static String formatDateTime(LocalDateTime dt) {
        if (dt == null) return "";
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yy 'às' HH:mm");
        return dt.format(fmt);
    }
}