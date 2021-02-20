import React, {createContext, cloneElement, useState, useContext, useReducer} from 'react'

const FormStateContext = createContext();
const FormDispatchContext = createContext();

function useFormDispatch() {
    const context = useContext(FormDispatchContext);
    if (context === undefined) {
        throw new Error('useFormDispatch must be used within Form')
    }
    return context;
}
function useFormState() {
    const context = useContext(FormStateContext);
    if (context === undefined) {
        throw new Error('useFormState must be used within Form')
    }
    return context;
}

function internalFormReducer(state, action) {
	switch(action.type) {
		case 'changeValue': {
			return({
				...state,
				[action.name]: {
					...state[action.name],
					value: action.value,
					touched: action.touched,
				}
			});
		}
	}
}

function Form({children, initialValue, onSubmit, ...props}) {
	function initializeValue(value) {
		const result = {};
		for (const [key, value] of Object.entries(initialValue)) {
			result[key] = {
				value,
				touched: false,
				dirty: false,
			}
		}
		return result;
	}
	const [state, dispatch] = useReducer(internalFormReducer, initializeValue(initialValue));
	
	function handleChange(name, value, touched) {
		dispatch({type: 'changeValue', name, value, touched})
	}

	function handleChangeWithTransform(name, value, transformer=(value)=>value) {
		dispatch({type: 'changeValue', name, value: transformer(value)})
	}

	function handleSubmit(event) {
		onSubmit(state);
		event.preventDefault();
	}

	return (
		<FormStateContext.Provider value={state}>
			<FormDispatchContext.Provider value={{handleChange, handleChangeWithTransform}}>
				<form {...props} onSubmit={handleSubmit}>
					{children}
				</form>
			</FormDispatchContext.Provider>
		</FormStateContext.Provider>
	)
}

function InputField({name, children, ...props}) {
	const formState = useFormState();
	const {handleChange} = useFormDispatch();
	const [touched, setTouched] = useState(false);
	function handleFocus() {
		setTouched(true)
	}
	function handleChangeEvent(event) {
		handleChange(name, event.target.value, touched)
	}
	return (<input onFocus={handleFocus} value={formState[name].value} onChange={handleChangeEvent} {...props}/>)
}

function FieldError() {
// @todo	
}

function FormError() {
// @todo
}


function FormDemo(props) {
	return(
		<Form onSubmit={event => console.log(event)} initialValue={{firstname: '', lastname: ''}}>
			<div>
				<label htmlFor="firstname">First Name</label>
				<InputField name="firstname" id="firstname" type="text"></InputField>
			</div>
			<div>
				<label htmlFor="lastname">Last Name</label>
				<InputField name="lastname" id="lastname" type="text"></InputField>
			</div>
		
			<button>submit</button>
		</Form>
	)
}


export {
	Form, InputField, FormDemo
}