type FieldProps = {
  as?: 'input' | 'textarea';
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  rows?: number;
};

export function Field({
  as = 'input',
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  rows,
}: FieldProps) {
  const id = `field-${name}`;
  const className = `field ${as === 'textarea' ? 'field--textarea' : ''} ${
    error ? 'field--invalid' : ''
  }`.trim();

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={rows ?? 4}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
          aria-invalid={error || undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
          aria-invalid={error || undefined}
        />
      )}
    </div>
  );
}
