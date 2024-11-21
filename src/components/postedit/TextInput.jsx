import { InputContainer, Label, Input } from '../../styles/PostEditStyle';

const TextInput = ({ label, placeholder, value, onChange }) => (
  <InputContainer>
    <Label>{label}</Label>
    <Input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
  </InputContainer>
);

export default TextInput;
