package com.emretoprak.eticaret.services.customer.review;

import com.emretoprak.eticaret.dto.OrderedProductsResponseDto;
import com.emretoprak.eticaret.dto.ReviewDto;

import java.io.IOException;

public interface ReviewService {

    OrderedProductsResponseDto getOrderedProductsDetailsByOrderId(Long orderId);

    ReviewDto giveReview(ReviewDto reviewDto) throws IOException;
}
