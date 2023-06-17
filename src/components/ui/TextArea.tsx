import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'textarea'> {
  id: string;
  register: any;
}

const TextArea = ({ id, register, ...props }: Props) => {
  return (
    <textarea
      id={id}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
      {...props}
      {...register(id)}
    />
  );
};

export default TextArea;
