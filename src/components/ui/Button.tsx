import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonStyles = cva(
  [
    'flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400',
  ],
  {
    variants: {
      intent: {
        primary: ['bg-indigo-600'],
        secondary: ['bg-gray-600'],
        error: ['bg-red-600'],
      },
      fullWidth: {
        true: ['w-full'],
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
);

// export type ButtonProps = VariantProps<typeof button>;

interface Props
  extends React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonStyles> {
  children: React.ReactNode;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  intent,
  fullWidth,
  children,
  loading,
  ...rest
}) => {
  return (
    <button {...rest} className={buttonStyles({ intent, fullWidth })}>
      {loading && <span>Loading...</span>}
      {!loading && children}
    </button>
  );
};

{
  /* <svg
className="mr-3 h-5 w-5 animate-spin text-white"
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
>
<circle
  className="opacity-25"
  cx="12"
  cy="12"
  r="10"
  stroke="currentColor"
  strokeWidth="4"
></circle>
<path
  className="opacity-75"
  fill="currentColor"
  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
></path>
</svg> */
}

export default Button;
