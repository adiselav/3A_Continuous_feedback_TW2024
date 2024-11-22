package com.example.servertw;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class FeedbackController {
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private ActivityRepository activityRepository;

    @PostMapping("/feedback")
    public Feedback createFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        Activity activity = activityRepository.findById(feedbackDTO.getActivityId())
                .orElseThrow(() -> new RuntimeException("Activity not found"));;
        Feedback feedback = new Feedback();
        feedback.setType(feedbackDTO.getType());
        feedback.setDate(feedbackDTO.getDate());
        feedback.setGrade(feedbackDTO.getGrade());
        feedback.setActivity(activity);

        return feedbackRepository.save(feedback);
    }

    @GetMapping("/feedbacks/{activityId}")
    public List<Feedback> getFeedbackByActivityId(@PathVariable Long activityId) {
        return feedbackRepository.findAll().stream()
                .filter(f -> f.getActivity().getId().equals(activityId))
                .collect(Collectors.toList());
    }
}