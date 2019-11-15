import { createStore } from 'redux';

const newRoutine = (state, action) => {
    switch (action.type) {
        case 'NEW':
            return {
                list:  [ ...action.payload ]
            };
        default:
            return state;
    }
};

const initState = {
    list: null,
};

export const store = createStore(newRoutine, initState);

store.subscribe(() => console.log(store.getState()));
