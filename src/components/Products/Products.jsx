import React, { useState, useEffect } from 'react';
import './Products.css';
import { IoIosHeartEmpty } from 'react-icons/io';
import { FiShoppingCart } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

const initialProducts = [
  { id: 1, title: 'Ручка дверная', price: 355, oldPrice: 400, promo: 'L422WH', discount: true, image: '/product1.png', material: 'Пластик', showCartIcon: true },
  { id: 2, title: 'Ручка дверная', price: 355, oldPrice: 400, promo: 'L422WH', discount: true, image: '/product2.png', material: 'Пластик', showCartIcon: true },
  { id: 3, title: 'Ручка, нержавеющ сталь', price: 99, oldPrice: 136, image: '/product3.png', material: 'Металл', showCartIcon: false },
  { id: 4, title: 'Стандартные петли', price: 75, image: '/product4.png', material: 'Металл', showCartIcon: false },
  { id: 5, title: 'Петля со стопором', price: 200, oldPrice: 270, image: '/product5.png', material: 'Металл', showCartIcon: false },
  { id: 6, title: 'Ручка дверная', price: 355, oldPrice: 400, image: '/product6.png', material: 'Пластик', showCartIcon: false },
  { id: 7, title: 'Стандартные петли', price: 75, image: '/product7.png', material: 'Металл', showCartIcon: false },
  { id: 8, title: 'Ручка, нержавеющ сталь', price: 99, oldPrice: 136, image: '/product8.png', material: 'Металл', showCartIcon: false },
  { id: 9, title: 'Ручка, нержавеющ сталь', price: 99, oldPrice: 136, image: '/product9.png', material: 'Металл', showCartIcon: false },
  { id: 10, title: 'Петля со стопором', price: 200, oldPrice: 270, image: '/product10.png', material: 'Металл', showCartIcon: false },
  { id: 11, title: 'Стандартные петли', price: 75, image: '/product11.png', material: 'Металл', showCartIcon: false },
  { id: 12, title: 'Ручка дверная', price: 355, oldPrice: 400, image: '/product12.png', material: 'Пластик', showCartIcon: false },
];

export default function Products() {
  const [products] = useState(initialProducts);
  const [sort, setSort] = useState('Все');
  const [material, setMaterial] = useState('Все');

  const [likedItems, setLikedItems] = useState(() => JSON.parse(localStorage.getItem('likedItems') || '{}'));
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cartItems') || '{}'));

  useEffect(() => {
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
  }, [likedItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Обработчики фильтров с консолью и URL
  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    console.log('Sort changed:', newSort);

    const params = new URLSearchParams(window.location.search);
    params.set('sort', newSort);
    params.set('material', material);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  };

  const handleMaterialChange = (e) => {
    const newMaterial = e.target.value;
    setMaterial(newMaterial);
    console.log('Material changed:', newMaterial);

    const params = new URLSearchParams(window.location.search);
    params.set('material', newMaterial);
    params.set('sort', sort);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  };

  const toggleLike = (id) => {
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCart = (id) => {
    setCartItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // фильтрация и сортировка карточек
  let filtered = products.filter(p => material === 'Все' || p.material === material);
  if (sort === 'Цена по возрастанию') filtered = [...filtered].sort((a,b) => a.price - b.price);
  if (sort === 'Цена по убыванию') filtered = [...filtered].sort((a,b) => b.price - a.price);

  return (
    <>
      <div className="filters">
        <div className="filter-select">
          <label>Сортировать по:</label>
          <select value={sort} onChange={handleSortChange}>
            <option>Все</option>
            <option>Цена по возрастанию</option>
            <option>Цена по убыванию</option>
          </select>
          <span className="select-arrow"></span>
        </div>

        <div className="filter-select">
          <label>Материал:</label>
          <select value={material} onChange={handleMaterialChange}>
            <option>Все</option>
            <option>Металл</option>
            <option>Пластик</option>
          </select>
          <span className="select-arrow"></span>
        </div>
      </div>

      <div className="products-grid">
        {filtered.map(p => (
          <div key={p.id} className="product-card">
            {p.discount && <div className="discount-badge">Скидка</div>}
            <img src={p.image} alt={p.title} className="product-image" />
            <div className="product-info">
              {p.promo && <p className="promo-code">{p.promo}</p>}
              <h3 className="product-title">{p.title}</h3>
              <div className="product-prices">
                {p.oldPrice && <span className="old-price">{p.oldPrice} ₽</span>}
                <span className="current-price">{p.price} ₽</span>
              </div>
            </div>

            <div className="product-icons">
              {p.showCartIcon && (
                <div className="cart-wrapper" onClick={() => toggleCart(p.id)}>
                  {!cartItems[p.id] ? <FiShoppingCart className="icon cart-icon" /> :
                    <div className="cart-added"><FaCheck className="check-icon" /></div>
                  }
                </div>
              )}
              <div className="heart-wrapper" onClick={() => toggleLike(p.id)}>
                <IoIosHeartEmpty className={`icon heart-icon ${likedItems[p.id] ? 'liked' : ''}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}