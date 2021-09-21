import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}
// ...rest pra dar pra estilizar de qualquer format, passando varias propriedades
const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
  return (
    // da pra deixar mt melhor usando a biblioteca react select
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        {/* disabled nao deixa enviar com essa seleção, hidden nao aparece nas opções */}
        <option value=""  disabled hidden>Selecione uma opção</option>
        {options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })}
      </select>
    </div>
  );
}

export default Select;