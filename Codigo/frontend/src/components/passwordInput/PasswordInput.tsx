import React from 'react';
import { Input } from 'antd';

const PasswordInput: React.FC = () => {
  return (
      <Input.Password placeholder="Insira a senha" />
  );
};

export default PasswordInput;