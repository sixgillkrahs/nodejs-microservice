import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface BaseEventProps {
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface Radio {
  value: string;
  label: string | lang;
}

export interface lang {
  vi: string;
  en: string;
}
