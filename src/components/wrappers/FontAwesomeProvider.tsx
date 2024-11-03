import { ReactNode } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../../lib/fontawesome';

config.autoAddCss = false;

interface FontAwesomeProviderProps {
  children: ReactNode;
}

const FontAwesomeProvider = ({ children }: FontAwesomeProviderProps) => {
  return <>{children}</>;
};

export default FontAwesomeProvider;