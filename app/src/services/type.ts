import React from "react";

export type ComponentJSX = React.JSX.Element;
export type ComponentProps<P> = React.FC<P>;
export type EventCHangeHandler = React.ChangeEventHandler<HTMLInputElement>;
export type EventChangeType = React.ChangeEvent<HTMLInputElement>;
export type EventClickType =  React.MouseEvent<HTMLDivElement, MouseEvent>;
export type InputModeType = "none" | "decimal" | "email" | "numeric" | "search" | "tel" | "text" | "url"