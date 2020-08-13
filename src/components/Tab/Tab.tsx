import React, { useState, useEffect } from 'react';
import './Tab.scss';
import { CSSTransition } from 'react-transition-group';

interface Props {
  active: boolean;
  title: string;
  click: () => any;
}

const Tab: React.FC<Props> = (props) => {
  const [render, setRender] = useState<boolean>(props.active);

  useEffect(() => {
    if (props.active && !render) {
      setRender(props.active);
    }
  }, [props.active, render]);

  return (
    <div className='Tab'>
      <div className='title' onClick={props.click}>{props.title}</div>
      {render ? (
        <CSSTransition
          in={props.active}
          timeout={1000}
          classNames='animate'
          onExited={() => {
            setRender(false);
          }}
          unmountOnExit>
          <div className='content'>{props.children}</div>
        </CSSTransition>
      ) : null}
    </div>
  );
};

export default Tab;
