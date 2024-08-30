import { render } from "@testing-library/react";
import { ReactElement } from "react";

import { Context, gameContext } from "..";

interface ProviderProps {
  children: React.ReactNode;
  customContext: Context;
}

const Provider = ({ children, customContext }: ProviderProps) => {
  return <gameContext.Provider value={customContext}>{children}</gameContext.Provider>;
};

const customRender = (ui: ReactElement, customContext: Context) =>
  render(ui, {
    wrapper: ({ children }) => <Provider customContext={customContext}>{children}</Provider>,
  });

export * from "@testing-library/react";
export { customRender as render };