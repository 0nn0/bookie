import { cva } from 'class-variance-authority';
import React, { ElementType } from 'react';

const headlineStyles = cva(['flex'], {
  variants: {
    h1: {
      true: ['text-4xl'],
    },
    h2: {
      true: ['text-3xl'],
    },
    h3: {
      true: ['text-2xl'],
    },
    h4: {
      true: ['text-xl'],
    },
    h5: {
      true: ['text-lg'],
    },
    h6: {
      true: ['text-md'],
    },
    bold: {
      true: ['font-bold'],
    },
  },
});

interface Props {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  bold?: boolean;
}

const Headline: React.FC<Props> = ({
  level,
  children,
  bold,
  ...otherProps
}) => {
  const HeadingTag = `h${level}` as ElementType;
  return (
    <HeadingTag
      className={headlineStyles({ [`h${level}`]: true })}
      {...otherProps}
    >
      {children}
    </HeadingTag>
  );
};

export default Headline;
