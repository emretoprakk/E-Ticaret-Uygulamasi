package com.emretoprak.eticaret.services.customer;

import com.emretoprak.eticaret.dto.ProductDetailDto;
import com.emretoprak.eticaret.dto.ProductDto;

import java.util.List;

public interface CustomerProductService {

    List<ProductDto> searchProductByTitle(String title);

    List<ProductDto> getAllProducts();

    ProductDetailDto getProductDetailById(Long productId);


}
