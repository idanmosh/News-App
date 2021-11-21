import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/Reducers';
import { hideModal } from '../../Store/Actions/actionCreators';
import { InteractionManager } from 'react-native';
import Modal from 'react-native-modal';
import ModalContent from './ModalContent';

const GeneralModal = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const { isVisible, onModalClose, ...generalModalData } = useSelector(
    (state: RootState) => state.AppReducer.modalData,
  );

  const [localVisible, setLocalVisible] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      InteractionManager.runAfterInteractions(() => {
        setLocalVisible(isVisible);
      });
    } else {
      onModalClose?.();
      setLocalVisible(isVisible);
    }
  }, [isVisible]);

  return (
    <Modal
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      isVisible={localVisible}>
      <ModalContent onClose={closeModal} {...generalModalData} />
    </Modal>
  );
};

export default GeneralModal;
