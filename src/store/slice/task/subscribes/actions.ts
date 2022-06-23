import { TSubscribeReducer } from './entities';
import { initialState } from './slice';

export default {
  clear(state: TSubscribeReducer) {
    state = initialState;
    return state;
  },
};
