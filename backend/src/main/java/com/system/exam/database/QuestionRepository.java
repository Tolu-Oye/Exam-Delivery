package com.system.exam.database;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.system.exam.database.Question;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface QuestionRepository extends PagingAndSortingRepository<Question, Long> {

    @Cacheable("questionCache") // Use a meaningful cache name, like "questionCache"
    Page<Question> findAll(Pageable pageable);
}
