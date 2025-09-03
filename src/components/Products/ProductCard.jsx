import React, { useState, useEffect } from 'react';
import './Products.css';
import { IoIosHeartEmpty } from 'react-icons/io';
import { FiShoppingCart } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

export default function ProductCard({ id, title, price, oldPrice, image, promo, discount, showCartIcon = false }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '{}');
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
    setLiked(!!likedItems[id]);
    setAdded(!!cartItems[id]);
  }, [id]);

  const toggleLike = () => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '{}');
    likedItems[id] = !liked;
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    setLiked(!liked);
  };

  const toggleCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
    cartItems[id] = !added;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setAdded(!added);
  };

  return (
    <div className="product-card">
      {discount && <div className="discount-badge">Скидка</div>}

      <img src={image} alt={title} className="product-image" />

      <div className="product-info">
        {promo && <p className="promo-code">{promo}</p>}
        <h3 className="product-title">{title}</h3>
        <div className="product-prices">
          {oldPrice && <span className="old-price">{oldPrice} ₽</span>}
          <span className="current-price">{price} ₽</span>
        </div>
      </div>

      <div className="product-icons">
        {showCartIcon && (
          <div className="cart-wrapper" onClick={toggleCart}>
            {!added ? <FiShoppingCart className="icon cart-icon" /> : (
              <div className="cart-added"><FaCheck className="check-icon" /></div>
            )}
          </div>
        )}
        <div className="heart-wrapper" onClick={toggleLike}>
          <IoIosHeartEmpty className={`icon heart-icon ${liked ? 'liked' : ''}`} />
        </div>
      </div>
    </div>
  );
}