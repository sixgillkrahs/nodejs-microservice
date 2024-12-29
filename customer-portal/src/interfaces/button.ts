export interface ButtonProps {
  title: string;
  brandColor?:
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "ghost"
    | "link"
    | "default";
  stateColor?: "info" | "success" | "warning" | "error";
  onClick?: () => void;
  outLine?: boolean;
  active?: boolean;
  size?: "lg" | "normal" | "sm" | "xs";
}
