package com.emretoprak.eticaret.services.admin.adminOrder;

import com.emretoprak.eticaret.dto.AnalyticsResponse;
import com.emretoprak.eticaret.dto.OrderDto;

import java.util.List;

public interface AdminOrderService {

    List<OrderDto> getAllPlacedOrders();

    OrderDto changeOrderStatus(Long orderId, String status);

    AnalyticsResponse calculateAnalytics();
}
