package com.example.servertw;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FeedbackDTO {
    private String type;
    private LocalDateTime date;
    private int grade;
    private Long activityId;

    public String getType() {
        return type;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public int getGrade() {
        return grade;
    }

    public Long getActivityId() {
        return activityId;
    }
}
