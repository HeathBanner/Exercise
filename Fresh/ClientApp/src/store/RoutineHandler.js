import { createStore } from 'redux';

const newRoutine = (state, action) => {
    switch (action.type) {
        case 'NEW':
            return {
                ...state,
                list: [...action.payload],
                loaded: true,
                empty: false,
            };
        case 'EMPTY':
            return {
                ...state,
                empty: true,
                loaded: true,
            };
        case 'UPDATE':
            return {
                ...state,
                loaded: false,
            };
        case "LOGIN":
            return {
                ...state,
                loggedIn: true
            };
        default:
            return state;
    }
};

const initState = {
    list: null,
    empty: true,
    loaded: false,
    loggedIn: false,
};

export const store = createStore(newRoutine, initState);

store.subscribe(() => console.log(store.getState()));
