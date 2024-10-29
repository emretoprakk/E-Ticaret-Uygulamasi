package com.emretoprak.eticaret.services.admin.faq;

import com.emretoprak.eticaret.dto.FAQDto;

public interface FAQService {

    FAQDto postFAQ(Long productId, FAQDto faqDto);
}
