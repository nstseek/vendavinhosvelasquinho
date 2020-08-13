import React from 'react';
import './ModalWarning.scss';
import Backdrop from '../Backdrop/Backdrop';

export interface WarningState {
  open: boolean;
  title: string;
  text: string;
}

interface Props {
  warning: WarningState;
  closeWarning: () => any;
  clearWarning: () => any;
}

const ModalWarning: React.FC<Props> = (props) => (
  <Backdrop
    show={!!props.warning.open}
    zIndex={500}
    onExit={props.clearWarning}>
    <div className='modal-warning'>
      <h3>{props.warning?.title}</h3>
      <h6>{props.warning?.text}</h6>
      <button onClick={props.closeWarning}>OK</button>
    </div>
  </Backdrop>
);

export default ModalWarning;
