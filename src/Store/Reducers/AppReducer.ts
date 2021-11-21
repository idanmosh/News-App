import { HIDE_MODAL, SHOW_MODAL } from '../Actions/actionTypes';

export interface ModalProps {
  message?: string | string[];
  isVisible?: boolean;
  confirmText: string;
  onConfirm?: () => void;
  title?: string;
  onModalClose?: () => void;
}

export interface AppState {
  modalData: Partial<ModalProps>;
}

const INITIAL_STATE: AppState = {
  modalData: {
    isVisible: false,
  },
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        ...state,
        modalData: {
          ...action.payload,
          isVisible: true,
        },
      };
    }
    case HIDE_MODAL: {
      return {
        ...state,
        modalData: {
          ...state.modalData,
          isVisible: false,
        },
      };
    }
    default:
      return state;
  }
};
