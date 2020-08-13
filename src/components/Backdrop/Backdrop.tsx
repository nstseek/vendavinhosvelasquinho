import React from 'react';
import './Backdrop.scss';
import { CSSTransition } from 'react-transition-group';

interface Props {
  show: boolean;
  zIndex?: number;
  onExit?: () => any;
}

interface State {
  render: boolean;
}

export default class Backdrop extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      render: this.props.show
    };
  }
  render() {
    return this.state.render ? (
      <CSSTransition
        in={this.props.show}
        timeout={500}
        classNames='animate'
        onExited={() => {
          this.setState({ render: false });
          if (this.props.onExit) {
            this.props.onExit();
          }
        }}
        unmountOnExit>
        <div
          className='Backdrop'
          style={this.props.zIndex ? { zIndex: this.props.zIndex } : {}}>
          {this.props.children}
        </div>
      </CSSTransition>
    ) : (
      ''
    );
  }
  static getDerivedStateFromProps(props: Props) {
    return props.show ? { render: props.show } : null;
  }
}
