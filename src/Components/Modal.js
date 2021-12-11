import ModalStyles from './Modal.module.css';

function Modal(props)
{
  return (
    <div className={ModalStyles.modal__wrapper}>
      <div className={ModalStyles.modal}>
        {props.children}
      </div>
    </div>);
}

export default Modal;
export {Modal};