import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  id: string;
  register: any;
  type?: string;
}

const Input = ({ id, register, type = 'text', ...props }: Props) => {
  return (
    <div>
      <div className="mt-1">
        <input
          id={id}
          name={id}
          type={type}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
          {...props}
          {...register(id)}
        />
      </div>
    </div>
  );
};

export default Input;
