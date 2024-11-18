import { InputContainer, Label, CategoryContainer, CategoryItem } from '../../styles/PostEditStyle';

const CategorySelector = ({ categories, selectedCategory, onCategoryClick }) => (
  <InputContainer>
    <Label>종류</Label>
    <CategoryContainer>
      {categories.map((category) => (
        <CategoryItem key={category} selected={category === selectedCategory} onClick={() => onCategoryClick(category)}>
          {category}
        </CategoryItem>
      ))}
    </CategoryContainer>
  </InputContainer>
);

export default CategorySelector;
