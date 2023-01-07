import ModalStyles from './Modal.module.css';
import React from 'react';

export function Modal(props) {
  return (
    <div className={ModalStyles.modal__wrapper}>
      <div className={ModalStyles.modal}>
        {props.children}
      </div>
    </div>);
}