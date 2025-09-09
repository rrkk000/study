import React, { useState, useEffect } from 'react';
import './Products.css';
import { IoIosHeartEmpty } from 'react-icons/io';
import { FiShoppingCart } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

export default function ProductCard({
  id,
  title,
  price,
  oldPrice,
  image,
  promo,
  discount,
  showCartIcon = false
}) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);


  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '{}');
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
    setLiked(!!likedItems[id]);
    setAdded(!!cartItems[id]);
  }, [id]);

  // переключение лайка
  const toggleLike = () => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '{}');
    likedItems[id] = !liked;
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    setLiked(!liked);
  };

  // переключение корзины
  const toggleCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
    cartItems[id] = !added;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setAdded(!added);
  };

  return (
    <div className="product-card">
      {discount && <div className="product-card__discount">Скидка</div>}

      <img src={image} alt={title} className="product-card__image" />

      <div className="product-card__info">
        {promo && <p className="product-card__promo">{promo}</p>}
        <h3 className="product-card__title">{title}</h3>
        <div className="product-card__prices">
          {oldPrice && <span className="product-card__old-price">{oldPrice} ₽</span>}
          <span className="product-card__current-price">{price} ₽</span>
        </div>
      </div>

      <div className="product-card__icons">
        {showCartIcon && (
          <div className="product-card__cart" onClick={toggleCart}>
            {!added ? (
              <FiShoppingCart className="icon product-card__cart-icon" />
            ) : (
              <div className="product-card__cart-added">
                <FaCheck className="product-card__check-icon" />
              </div>
            )}
          </div>
        )}
        <div className="product-card__heart" onClick={toggleLike}>
          <IoIosHeartEmpty
            className={`icon product-card__heart-icon ${liked ? 'liked' : ''}`}
          />
        </div>
      </div>
    </div>
  );
}