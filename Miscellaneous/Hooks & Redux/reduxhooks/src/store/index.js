import {createStore} from 'redux';

const INITIAL_STATE = {
    data: [
        'React Native',
        'ReactJS',
        'NodeJS,'
    ],
};

// state = INITIAL_STATE sintaxe para valor default, depois o estado vai ser mudado
function courses(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_COURSE':
            // ...state eh soh pra garantir 
            return {...state, data: [...state.data, action.title]};
        default:
            return state;
    }
}

// como só  temos um reducer vamo pegar data desse jeito:
// state.data 
// se tivessemos mais de um seria state.courses.data

const store = createStore(courses);

export default store;