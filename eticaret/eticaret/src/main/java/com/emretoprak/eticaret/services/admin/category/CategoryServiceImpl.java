package com.emretoprak.eticaret.services.admin.category;

import com.emretoprak.eticaret.dto.CategoryDto;
import com.emretoprak.eticaret.entity.Category;
import com.emretoprak.eticaret.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;

    public Category createcategory(CategoryDto categoryDto){

        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());

        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
