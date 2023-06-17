import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import Text from '@/components/ui/Text';

import Button from '../ui/Button';
import Headline from '../ui/Headline';

type Button = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const Dialog = ({
  title,
  body,
  error,
  confirmButton,
  cancelButton,
}: {
  title: string;
  body: React.ReactNode;
  error?: string;
  confirmButton: Button;
  cancelButton: Button;
}) => {
  return (
    <>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 sm:ml-4 sm:mt-0 md:text-left">
          <Headline className="text-center md:text-left" size="h3">
            {title}
          </Headline>
          <Text
            intent="secondary"
            size="sm"
            className="text-center md:text-left"
          >
            {body}
          </Text>
          {error && (
            <Text
              intent="error"
              size="sm"
              className="mt-2 text-center md:text-left"
            >
              {error}
            </Text>
          )}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex sm:flex-row-reverse">
        <Button
          disabled={confirmButton.disabled}
          intent="error"
          className="w-full justify-center sm:w-auto sm:justify-start"
          onClick={confirmButton.onClick}
          loading={confirmButton.loading}
        >
          {confirmButton.label}
        </Button>
        <Button
          className="w-full justify-center sm:w-auto sm:justify-start"
          disabled={cancelButton.disabled}
          intent="secondary"
          onClick={cancelButton.onClick}
        >
          {cancelButton.label}
        </Button>
      </div>
    </>
  );
};

export default Dialog;
