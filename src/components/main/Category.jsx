import React from 'react';
import { FoodCategory } from '../../styles/MainStyle';

const Category = ({ onCategoryClick, selectedCategory }) => {
  const categories = ['전체', '한식', '중식', '양식', '일식', '분식', '카페 / 베이커리'];

  return (
    <FoodCategory>
      {categories.map((category) => (
        <li key={category}>
          <button
            onClick={() => onCategoryClick(category)}
            style={{
              textDecoration: selectedCategory === category ? 'underline' : 'none',
              fontWeight: selectedCategory === category ? '700' : '400'
            }}
          >
            {category}
          </button>
        </li>
      ))}
    </FoodCategory>
  );
};

export default Category;
