export interface IIndexable {
  [key: string]: any;
};

export type TChildNode = React.ReactNode | React.ReactElement;

export interface IGenericElementProps {
  children: TChildNode;
  className?: string;
  elementType?: string;
};

export interface IJustChildrenProps {
  children: TChildNode;
};