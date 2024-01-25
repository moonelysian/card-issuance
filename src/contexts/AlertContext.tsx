import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
} from "react";
import { createPortal } from "react-dom";

import Alert from "@shared/Alert";

type AlertProps = ComponentProps<typeof Alert>;
type AlertOptions = Omit<AlertProps, "open">;

interface AlertContextValue {
  open: (options: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

const defaultValues: AlertProps = {
  open: false,
  title: null,
  description: null,
  onButtonClick: () => {},
};

export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alertState, setAlertState] = useState(defaultValues);
  const $portal = document.getElementById("root-portal");

  const close = useCallback(() => {
    setAlertState(defaultValues);
  }, []);

  const open = useCallback(
    ({ onButtonClick, ...options }: AlertOptions) => {
      setAlertState({
        ...options,
        open: true,
        onButtonClick: () => {
          close();
          onButtonClick();
        },
      });
    },
    [close],
  );

  const values = useMemo(() => ({ open }), [open]);

  return (
    <AlertContext.Provider value={values}>
      {children}
      {$portal && createPortal(<Alert {...alertState} />, $portal)}
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  const values = useContext(AlertContext);
  if (values == null) {
    throw new Error("Alert Context 내부에서 사용해주세요");
  }
  return values;
}
