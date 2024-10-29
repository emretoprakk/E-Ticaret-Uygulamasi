package com.emretoprak.eticaret.services.customer.review;

import com.emretoprak.eticaret.dto.OrderedProductsResponseDto;
import com.emretoprak.eticaret.dto.ProductDto;
import com.emretoprak.eticaret.dto.ReviewDto;
import com.emretoprak.eticaret.entity.*;
import com.emretoprak.eticaret.repository.OrderRepository;
import com.emretoprak.eticaret.repository.ProductRepository;
import com.emretoprak.eticaret.repository.ReviewRepository;
import com.emretoprak.eticaret.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    private final ReviewRepository reviewRepository;


    public OrderedProductsResponseDto getOrderedProductsDetailsByOrderId(Long orderId){
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        OrderedProductsResponseDto orderedProductsResponseDto = new OrderedProductsResponseDto();
        if(optionalOrder.isPresent()){
            orderedProductsResponseDto.setOrderAmount(optionalOrder.get().getAmount());

            List<ProductDto> productDtoList = new ArrayList<>();
            for(CartItems cartItems: optionalOrder.get().getCartItems()){
                ProductDto productDto = new ProductDto();

                productDto.setId(cartItems.getProduct().getId());
                productDto.setName(cartItems.getProduct().getName());
                productDto.setPrice(cartItems.getPrice());
                productDto.setQuantity(cartItems.getQuantity());

                productDto.setByteImg(cartItems.getProduct().getImg());

                productDtoList.add(productDto);
            }
            orderedProductsResponseDto.setProductDtoList(productDtoList);
        }
        return orderedProductsResponseDto;
    }

    public ReviewDto giveReview(ReviewDto reviewDto) throws IOException {
        Optional<Product> optionalProduct = productRepository.findById(reviewDto.getProductId());
        Optional<User> optionalUser = userRepository.findById(reviewDto.getUserId());

        if(optionalProduct.isPresent() && optionalUser.isPresent()){
            Review review = new Review();

            review.setRating(reviewDto.getRating());
            review.setDescription(reviewDto.getDescription());
            review.setUser(optionalUser.get());
            review.setProduct(optionalProduct.get());
            review.setImg(reviewDto.getImg().getBytes());

            return reviewRepository.save(review).getDto();
        }
        return null;
    }
}
