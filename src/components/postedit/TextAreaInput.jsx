import { InputContainer, Label, TextArea } from '../../styles/PostEditStyle';

const TextAreaInput = ({ label, placeholder, value, onChange }) => (
  <InputContainer>
    <Label>{label}</Label>
    <TextArea placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
  </InputContainer>
);

export default TextAreaInput;
