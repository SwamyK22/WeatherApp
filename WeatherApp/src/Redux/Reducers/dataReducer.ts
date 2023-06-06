

const initState = {
    weatherData:[],
    userInput:'Bangalore'
}

const dataReducer = (state = initState, {type, payload}) => {

    if(type === 'FETCH_DATA'){
        return {
            ...state,
            weatherData: payload
        }
    
    } else if(type === 'USER_INPUT'){
        return {
            ...state,
            userInput: payload
        }
    }
    else {
        return state;
    }

};

export default dataReducer;