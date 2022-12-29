import { cva } from 'class-variance-authority';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const textStyles = cva(['flex'], {
  variants: {
    bold: {
      true: ['font-bold'],
    },
  },
});

const Text: React.FC<Props> = ({ children, bold, ...rest }) => {
  return (
    <span className={textStyles(bold)} {...rest}>
      {children}
    </span>
  );
};

export default Text;
