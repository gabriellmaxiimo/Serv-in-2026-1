package com.servin.api.modules.dashboard;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servin.api.modules.dashboard.services.EventsByDateService;
import com.servin.api.modules.dashboard.services.ProfessionalByEventService;
import com.servin.api.modules.dashboard.services.TotalEmployeesService;
import com.servin.api.modules.dashboard.services.TotalEventsService;
import com.servin.api.modules.dashboard.services.TotalProfessionalsService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private TotalEventsService totalEventsService;

    @Autowired
    private TotalEmployeesService totalEmployeesService;

    @Autowired
    private TotalProfessionalsService totalProfessionalsService;

    @Autowired
    private ProfessionalByEventService professionalByEventService;

    @Autowired
    private EventsByDateService eventsByDateService;

    @GetMapping("/total-events")
    public ResponseEntity<Integer> getTotalEvents() {
        try {
            int totalEvents = totalEventsService.execute();
            return ResponseEntity.ok(totalEvents);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/total-employees")
    public ResponseEntity<Integer> getTotalEmployees() {
        try {
            int totalEmployees = totalEmployeesService.execute();
            return ResponseEntity.ok(totalEmployees);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/total-professionals")
    public ResponseEntity<Integer> getTotalProfessionals() {
        try {
            int totalProfessionals = totalProfessionalsService.execute();
            return ResponseEntity.ok(totalProfessionals);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/professionals-by-event")
    public ResponseEntity<List<Map<String, Object>>> getProfessionalsByEvent() {
        try {
            List<Map<String, Object>> professionalsPerEvent = professionalByEventService.execute();
            return ResponseEntity.ok(professionalsPerEvent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/events-by-date")
    public ResponseEntity<List<Map<String, Object>>> getEventsByDate() {
        try {
            List<Map<String, Object>> eventsByDate = eventsByDateService.execute();
            return ResponseEntity.ok(eventsByDate);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
