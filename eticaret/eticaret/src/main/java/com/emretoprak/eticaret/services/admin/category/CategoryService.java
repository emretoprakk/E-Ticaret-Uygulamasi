package com.emretoprak.eticaret.services.admin.category;

import com.emretoprak.eticaret.dto.CategoryDto;
import com.emretoprak.eticaret.entity.Category;

import java.util.List;

public interface CategoryService {

    Category createcategory(CategoryDto categoryDto);

    List<Category> getAllCategories();
}
