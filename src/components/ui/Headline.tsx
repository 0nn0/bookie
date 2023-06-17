import { VariantProps, cva } from 'class-variance-authority';
import React, { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

const headlineStyles = cva([''], {
  variants: {
    size: {
      h1: ['text-2xl font-semibold'],
      h2: ['text-xl font-semibold'],
      h3: ['text-base font-semibold'],
    },
  },
});

type Props = VariantProps<typeof headlineStyles> & {
  children: React.ReactNode;
  tag?: ElementType;
  className?: string;
};

const Headline = ({
  size,
  children,
  tag = 'h1',
  className = '',
  ...props
}: Props) => {
  const ElementTag = tag || size;
  return (
    <ElementTag
      className={twMerge(headlineStyles({ size }), className)}
      {...props}
    >
      {children}
    </ElementTag>
  );
};

export default Headline;
