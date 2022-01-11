import React from 'react';

interface GenericElementProps {
  children: React.ReactNode;
  className: string;
  elementType?: string;
}

export function Element({ children, className, elementType: ElementType = 'div', ...rest }: GenericElementProps): JSX.Element {
  return React.createElement(ElementType, Object.assign({ className: className }, rest), children);
}

export function Container(props: any) {
  let classNames = [];
  let dataAttributes = {} as any;
  if (typeof props.className === 'string') {
    classNames.push(props.className);
  } else if (Array.isArray(props.className)) {
    classNames = props.className.filter((cn: string) => cn);
  }

  if (props.loading === true) {
    classNames.push('pc__loading');
  }

  if (Array.isArray(props.states)) {
    props.states.filter((s: any) => {
      return typeof s === 'object';
    }).filter((s: any) => {
      if (Object.keys(s).includes('className')) {
        return s.className.length > 0;
      }

      return true;
    }).forEach((s: any) => {
      const resolveCondition = (attr: string | Function, condition: boolean) => {
        if (typeof attr === 'function') {
          return attr(condition);
        }

        if (condition === true) {
          return attr;
        }

        return '';
      };
      if (s.className) {
        if (typeof s.condition === 'boolean'
          || typeof s.condition === 'function'
        ) {
          const rc = resolveCondition(
            s.className,
            typeof s.condition === 'function' ? s.condition() : s.condition
          );

          if (rc) {
            classNames.push(rc);
          }
        } else if (typeof s.condition === 'undefined' && s.className && s.className.length > 0) {
          classNames.push(s.className);
        }
      }
      if (s.attr && s.value) {
        if (typeof s.condition === 'boolean' && s.condition === true) {
          dataAttributes[s.attr] = s.value;
        } else if (typeof s.condition === 'undefined') {
          dataAttributes[s.attr] = s.value;
        }
      }
    });
  }

  const invalidKeys = [
    'elementType',
    'states',
    'classNames',
    'className',
    'emptyCondition',
    'loading'
  ];
  const rest = Object.fromEntries(
    Object.entries(
      props
    ).filter(
      ([key]) => {
        return !invalidKeys.includes(key)
      }
    )
  );

  let ElementType = 'div';
  if (typeof props.elementType === 'string') {
    ElementType = props.elementType;
  } else if (props.href) {
    ElementType = 'a';

    if (props.href.substr(0, 4) === 'http' || props.href.substr(0, 2) === '//') {
      rest.target = '_blank';
    }
  }

  if (props.emptyCondition) {
    return <>{ props.children }</>;
  }

  return (
    <Element elementType={ ElementType } className={ classNames.join(' ') } {...rest} {...dataAttributes}>
      { props.children }
    </Element>
  );
}

export default Container;