package com.emretoprak.eticaret.services.customer.wishlist;

import com.emretoprak.eticaret.dto.WishlistDto;

import java.util.List;

public interface WishlistService {

    WishlistDto addProductToWishlist(WishlistDto wishlistDto);

    List<WishlistDto> getWishlistByUserId(Long userId);

    void removeProductFromWishlist(Long userId, Long productId);

}
