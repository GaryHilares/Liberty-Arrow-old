import ModalStyles from './Modal.module.css';

export function Modal(props) {
  return (
    <div className={ModalStyles.modal__wrapper}>
      <div className={ModalStyles.modal}>
        {props.children}
      </div>
    </div>);
}