import { InputContainer, Label, RatingContainer, Star } from '../../styles/PostEditStyle';

const RatingSelector = ({ rating, onRatingClick }) => (
  <InputContainer>
    <Label>평점</Label>
    <RatingContainer>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} selected={index < rating} onClick={() => onRatingClick(index + 1)}>
          ★
        </Star>
      ))}
    </RatingContainer>
  </InputContainer>
);

export default RatingSelector;
