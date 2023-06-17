import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const textStyles = cva(['block'], {
  variants: {
    intent: {
      primary: ['text-gray-900'],
      secondary: ['text-gray-500'],
      error: ['text-red-500'],
    },
    size: {
      base: ['text-base'],
      sm: ['text-sm'],
      xs: ['text-xs'],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'base',
  },
});

type Props = React.ComponentPropsWithoutRef<'p'> &
  VariantProps<typeof textStyles> & {
    children: React.ReactNode;
    tag?: React.ElementType;
  };

const Text = ({
  children,
  intent,
  size,
  tag = 'p',
  className,
  ...props
}: Props) => {
  const ElementTag = tag || size;
  return (
    <ElementTag
      className={twMerge(textStyles({ intent, size }), className)}
      {...props}
    >
      {children}
    </ElementTag>
  );
};

export default Text;
