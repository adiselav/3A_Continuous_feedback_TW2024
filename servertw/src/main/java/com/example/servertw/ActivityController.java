package com.example.servertw;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ActivityController {
    @Autowired
    private ActivityRepository activityRepository;
    @Autowired
    private FeedbackRepository feedbackRepository;

    @PostMapping("/activity")
    public Activity createActivity(@RequestBody Activity activity) {
        return activityRepository.save(activity);
    }

    @GetMapping("/activities")
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    @DeleteMapping("/activity/{id}")
    public void deleteActivity(@PathVariable Long id) {
        feedbackRepository.deleteAllByActivityId(id);
        activityRepository.deleteById(id);
    }
}
