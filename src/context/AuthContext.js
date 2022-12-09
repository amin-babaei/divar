import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useReducerAsync } from "use-reducer-async";
import http from "../services/httpService";

const AuthContext = createContext();
const AuthContextDispatch = createContext();

const initialState = {
    user: null,
    loading: false,
    error: null,
}
const reducer = (state, action) => {
    switch (action.type) {
        case "PENDING": return { user:null, loading: true, error:null };
        case "SUCCESS": return { user: action.payload, loading: false, error:null, }
        case "REJECT": return { user: null, loading: false, error: action.error, }
        default: return { ...state }
    }
}

const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const asyncActionHandlers = {
        SIGNIN: ({ dispatch }) => {
            return (action) => {
                dispatch({ type: 'PENDING' })
                http.post('/api/user/signin', action.payload)
                    .then(res => {
                        toast.success('با موفقیت وارد شدید')
                        dispatch({ type: 'SUCCESS', payload: res.data })
                    }).catch(err => {
                        toast.error(err?.response?.data?.message)
                        dispatch({ type: 'REJECT', error: err?.response?.data?.message })
                    })
            }
        },
        SIGNUP: ({dispatch}) => {
            return action => {
                dispatch({ type: 'PENDING' })
                http.post('/api/user/signup', action.payload)
                    .then(() => {
                        toast.success('با موفقیت ثبت نام کردید')
                        navigate('/signin')
                        dispatch({ type: 'SUCCESS'})
                    }).catch(err => {
                        toast.error(err?.response?.data?.message)
                        dispatch({ type: 'REJECT', error: err?.response?.data?.message })
                    })
            }
        },
        LOAD_USER: ({dispatch}) => {
            return () => {
                http.get('/api/user/load')
                    .then(res => {
                        dispatch({ type: 'SUCCESS', payload: res.data })
                    }).catch(err => {
                        dispatch({ type: 'REJECT', error: err?.response?.data?.message })
                    })
            }
        },
        SIGNOUT: ({dispatch}) => {
            return () => {
                http.get('/api/user/logout')
                    .then(() => {
                        window.location.href = '/'
                    }).catch(err => {
                        dispatch({ type: 'REJECT', error: err?.response?.data?.message })
                    })
            }
        }
    }
    const [user, dispatch] = useReducerAsync(reducer, initialState, asyncActionHandlers)
    useEffect(()=>{
        dispatch({type:"LOAD_USER"})
    },[])
    return (
        <AuthContext.Provider value={user}>
            <AuthContextDispatch.Provider value={dispatch}>
                {children}
            </AuthContextDispatch.Provider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext)
export const useAuthActions = () => useContext(AuthContextDispatch)