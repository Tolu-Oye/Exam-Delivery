package com.system.exam.controller;

import com.system.exam.database.Question;
import com.system.exam.database.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Collections;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/exam")
public class ExamController {

    @Autowired
    private QuestionRepository questionRepository;

//    @GetMapping("/questions")
//    public List<Question> getAllQuestions() {
//        return questionRepository.findAll();
//    }

    @GetMapping("/questions")
    public Page<Question> getQuestions(Pageable pageable) {
        // Replace this with your actual service method
//        return questionRepository.findAll(pageable);

        try {
            return questionRepository.findAll(pageable);
        } catch (EmptyResultDataAccessException e) {
            // Handle cache miss gracefully, e.g., log the issue or return a default response.
            return new PageImpl<>(Collections.emptyList(), pageable, 0);
        }
    }
}
