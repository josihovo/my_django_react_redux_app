import {combineReducers} from 'redux'

import errors from './errors' 
import messages from './messages'
import auth from './auth'

import medidas from './medidasReducer'
import grupos from './gruposReducer'
import departamentos from './departamentosReducer'

export default combineReducers({
    auth,
    errors,
    messages,
    
    medidas,
    grupos,
    departamentos,
});