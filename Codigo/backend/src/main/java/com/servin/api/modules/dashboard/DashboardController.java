package com.servin.api.modules.dashboard;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servin.api.modules.dashboard.services.TotalEvents;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private TotalEvents totalEvents;

    @GetMapping("/total-events")
    public ResponseEntity<Integer> getTotalEvents() {

        try {
            int response = totalEvents.execute();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}
