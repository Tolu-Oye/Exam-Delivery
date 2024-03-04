package com.system.exam.database;

import org.springframework.data.jpa.repository.JpaRepository;
import com.system.exam.database.Question;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface QuestionRepository extends PagingAndSortingRepository<Question, Long> {
}
