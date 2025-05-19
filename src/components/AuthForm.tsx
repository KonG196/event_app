import React, { FormEvent } from 'react';

interface Field {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

interface Props {
  title: string;
  fields: Field[];
  onSubmit: (e: FormEvent) => void;
  footer?: React.ReactNode;
}

export default function AuthForm({ title, fields, onSubmit, footer }: Props) {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map((f, i) => (
          <div key={i}>
            <label className="block text-sm font-medium mb-1">{f.label}</label>
            <input
              type={f.type}
              value={f.value}
              onChange={f.onChange}
              required={f.required}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          ОК
        </button>
      </form>
      {footer && <div className="mt-4 text-center text-sm">{footer}</div>}
    </div>
  );
}
