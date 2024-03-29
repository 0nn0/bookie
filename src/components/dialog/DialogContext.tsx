import { Dialog, Transition } from '@headlessui/react';
import {
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

export const DialogContext = createContext<{
  setDialog: Dispatch<SetStateAction<ReactNode>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export function DialogProvider(props: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState<React.ReactNode | undefined>(undefined);

  // TODO: Fix this
  // const cancelButtonRef = useRef(null);

  return (
    <DialogContext.Provider value={{ setDialog, setOpen }}>
      {props.children}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          // initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center px-4 py-20 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative flex-1 transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  {dialog}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </DialogContext.Provider>
  );
}
