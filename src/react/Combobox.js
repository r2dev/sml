import React, { createContext, useState, useContext } from 'react'

let comboboxNextID = 0;

const ComboboxStateContext = createContext();
const ComboboxDispatchContext = createContext();

function useComboboxDispatch() {
    const context = useContext(ComboboxDispatchContext);
    if (context === undefined) {
        throw new Error('useComboboxDispatch must be used within Combobox')
    }
    return context;
}
function useComboboxState() {
    const context = useContext(ComboboxStateContext);
    if (context === undefined) {
        throw new Error('useComboboxState must be used within Combobox')
    }
    return context;
}

function useCombobox() {
    
}

function Combobox({children}) {
    // const internalComboboxID = useRef(comboboxNextID++);
    const [searchValue, setSearchValue] = useState('');
    function handleComboboxChange(event) {
        setSearchValue(event.target.value);
    }
    return (
    <ComboboxStateContext.Provider value={[searchValue]}>
        <ComboboxDispatchContext.Provider value={[handleComboboxChange]}>
            {children}
        </ComboboxDispatchContext.Provider>
    </ComboboxStateContext.Provider>
    );
}

function ComboboxInput(props) {
    const [inputValue] = useComboboxState();
    const [handleInputChange] = useComboboxDispatch();
    return <input type="text" onChange={handleInputChange} value={inputValue} {...props}/>
}

function Demo() {
    return <Combobox>
        <ComboboxInput></ComboboxInput>
    </Combobox>
}

export {Combobox, Demo}