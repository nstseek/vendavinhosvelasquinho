import React from 'react';
import './Loading.scss';
import { ReactComponent as LoadingSvg } from '../../assets/icons/loading.svg';
import Backdrop from '../Backdrop/Backdrop';

interface Props {
  loading: boolean;
}

const Loading: React.FC<Props> = (props) => (
  <Backdrop show={props.loading} zIndex={1000}>
    <LoadingSvg />
  </Backdrop>
);

export default Loading;
