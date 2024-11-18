import styled from 'styled-components';

// 컨테이너
export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 150px; /* Header 높이만큼 상단 여백 */
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: Arial, sans-serif;
`;

// 이미지 업로드 영역
export const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 350px;
  background-color: #f5f5f5;
  border: 1px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

// 버튼
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #ffb879;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  text-align: center;
  &:hover {
    background-color: #e09c67;
  }
`;

export const SubmitButton = styled(Button)`
  background-color: #ffb879;
`;

export const CancelButton = styled(Button)`
  background-color: #fff;
  color: #ffb879;
  border: 1px solid #ffb879;
  &:hover {
    background-color: #ffe3cc;
  }
`;

// 입력 필드
export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Label = styled.label`
  width: 50px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
`;

// 카테고리
export const CategoryContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const CategoryItem = styled.div`
  cursor: pointer;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')}; /* 선택된 글씨는 볼드 처리 */
  &:hover {
    font-weight: bold;
  }
  text-align: center;
`;

// 평점
export const RatingContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const Star = styled.span`
  font-size: 24px;
  color: ${(props) => (props.selected ? '#FFCC00' : '#d9d9d9')};
  cursor: pointer;
  &:hover {
    color: '#FFCC00';
  }
`;
