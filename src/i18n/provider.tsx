/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSX, ReactNode } from "react";
import { IntlProvider as NativeProvider } from "react-intl";
import type MessageMap from "./i18n.d";
import enUS from "./languages/en-US";
import ptBR from "./languages/pt-BR";

const DEFAULT_LANGUAGE = "pt-BR";
type IIntlProvider = {
  children: ReactNode;
};

export const messages: { [language: string]: MessageMap } = {
  "en-US": enUS,
  "pt-BR": ptBR,
};

export const flattenObject = (ob: any): any => {
  const toReturn: { [key: string]: any } = {};

  for (const i in ob) {
    if (typeof ob[i] === "object" && ob[i] !== null) {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        toReturn[`${i}.${x}`] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

export const mergeMessages = (
  messagesInput: MessageMap,
  selectedLocale: string
): any => {
  const defaultMessages = flattenObject(messagesInput[DEFAULT_LANGUAGE]);
  const localeMessages = flattenObject(messagesInput[selectedLocale]);
  return { ...defaultMessages, ...localeMessages };
};

export function IntlProvider({ children }: IIntlProvider): JSX.Element {
  const preferredLanguage = DEFAULT_LANGUAGE;

  const mergedMessages = mergeMessages(messages, preferredLanguage);

  return (
    <NativeProvider
      key={preferredLanguage}
      locale={preferredLanguage}
      defaultLocale={DEFAULT_LANGUAGE}
      messages={mergedMessages}
    >
      {children}
    </NativeProvider>
  );
}

export default IntlProvider;
