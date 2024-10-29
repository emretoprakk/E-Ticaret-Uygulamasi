package com.emretoprak.eticaret.services.admin.coupon;

import com.emretoprak.eticaret.entity.Coupon;

import java.util.List;

public interface AdminCouponService {

    Coupon createCoupon(Coupon coupon);

    List<Coupon> getAllCoupons();
}
