import { ReactNode } from 'react';

export type WithChildren<Props = {}> = Props & {
  children: ReactNode;
};

export type WithOptionalChildren<Props = {}> = Props & {
  children?: ReactNode;
};
