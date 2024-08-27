type RenderLetterState = {
    show: boolean,
    correct: boolean,
    error: boolean,
}

type RenderLetterAction = {type: 'show'} | {type: 'correct'} | {type: 'error'};

export const initialRenderLetterState = {
    show: true,
    correct: false,
    error: false, 
}

export function renderLetterReducer(state: RenderLetterState, action: RenderLetterAction) {
    switch(action.type) {
        case 'show':
            return {...state, show: !state.show};
        case "correct":
            return {...state, correct: !state.correct};
        case "error":
            return {...state, error: !state.error};
        default:
            return state;
    }
}