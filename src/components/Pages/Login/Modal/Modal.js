import React from 'react';
import './Modal.scss';
import Button from "../../../UI/Button/Button";

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
          {this.props.children}
          <Button className={'btn-main'}
                  onClick={this.props.onClose}>
            Close
          </Button>
        </div>
      </div>
    );
  }
}

export default Modal;