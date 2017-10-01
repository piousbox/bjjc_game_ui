import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  ITEMS_UPDATED,
  ITEMS_GET_SUCCESS,

  SET_API_URL,
} from '../constants/AppConstants';

class ItemsStore extends BaseStore {
  emitChange() {
    this.emit(ITEMS_UPDATED);
  }

  addChangeListener(callback) {
    this.on(ITEMS_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(ITEMS_UPDATED, callback);
  }
}

let store = new ItemsStore();

AppDispatcher.register((action) => {
  console.log('+++ +++ ItemsStore reducer is called:', action)

  switch(action.actionType) {
    case ITEMS_GET_SUCCESS:
      // store.setAll(action.items);
      return action.items
    case SET_API_URL:
      // store.set({ apiUrl: action.apiUrl })
      return action.apiUrl
    default:
  }
});

export default store;
