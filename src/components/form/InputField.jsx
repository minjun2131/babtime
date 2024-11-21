import { Input, InputDiv, InputName } from '../../styles/SignUpStyle.jsx';

const InputField = ({ label, type, name, value, onChange }) => {
  return (
    <InputDiv>
      <InputName>{label}</InputName>
      <Input type={type} name={name} value={value} onChange={onChange} />
    </InputDiv>
  );
};

export default InputField;
