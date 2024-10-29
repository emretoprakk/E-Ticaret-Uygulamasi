package com.emretoprak.eticaret.repository;

import com.emretoprak.eticaret.entity.FAQ;
import com.emretoprak.eticaret.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByProductId(Long productsId);

}
