import css from './FormGroup.module.css';

interface FormGroupProps {
  label: string;
  id: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  error?: string;
}

export default function FormGroup (
  {
    label,
    id,
    value,
    placeholder,
    onChange,
    type,
    error,
  }: FormGroupProps
) {
  return (
    <div className={css.formGroup}>
      <label htmlFor={id}>{label}</label>
      <input 
        type={type} 
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
      />
      {error && (
        <ul className={css.errors}>
          <li className={css.error}>{error}</li>
        </ul>
      )}
    </div>
  );
}