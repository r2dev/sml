import React, {useEffect, useRef, useImperativeHandle, forwardRef, createContext, useContext, useReducer} from 'react'

let accordionNextID = 0;

function Accordion({
    defaultExpandedIndex = [0],
    // allow open multiple entries at the same time
    multiple=false,

    // allow toggle the content
    toggle=false,
    children,
    ...props
}) {
    const internalAccordionID = useRef(accordionNextID++);
    const [state, dispatch] = useReducer(internalReducer, {count: 0, refs: {}, opened: defaultExpandedIndex});
    
    // handle search the next ref with next accordion index, allow dynamic add and remove accordion item
    function handleFocusKey(currentIndex, isNext) {
        if (isNext) {
            while (!state.refs[++currentIndex] && currentIndex < state.count) {}
        } else {
            while (!state.refs[--currentIndex] && currentIndex > state.count) {}
        }
        if (state.refs[currentIndex] && state.refs[currentIndex].current) {
            state.refs[currentIndex].current.focus()
        }
    }

    function handleExpand(accordionIndex) {
        if (state.opened.includes(accordionIndex)) {
            if (toggle) {
                dispatch({type: 'setExpandState', opened: state.opened.filter(v => v != accordionIndex)})
            }
        } else {
            if (multiple) {
                dispatch({type: 'setExpandState', opened: state.opened.concat([accordionIndex])})
            } else {
                dispatch({type: 'setExpandState', opened: [accordionIndex]})
            }
        }
    }

    return(
        <AccordionStateContext.Provider value={[state, internalAccordionID.current]}>
            <AccordionDispatchContext.Provider value={[dispatch, handleFocusKey, handleExpand]}>
                <div {...props}>
                    {children}
                </div>
            </AccordionDispatchContext.Provider>
        </AccordionStateContext.Provider>
    )
}

const AccordionStateContext = createContext();
const AccordionDispatchContext = createContext();

function useAccordionDispatch() {
    const context = useContext(AccordionDispatchContext);
    if (context === undefined) {
        throw new Error('useAccordionDispatch must be used within Accordion')
    }
    return context;
}
function useAccordionState() {
    const context = useContext(AccordionStateContext);
    if (context === undefined) {
        throw new Error('useAccordionState must be used within Accordion')
    }
    return context;
}

function internalReducer(state, action) {
    switch(action.type) {
        case 'addRef': {
            const tempRefs = {...state.refs}
            tempRefs[action.accordionIndex] = action.ref;
            return { ...state, count: state.count + 1, refs: tempRefs};
        }
        case 'removeRef': {
            const tempRefs = {...state.refs}
            delete tempRefs[action.accordionIndex];
            return { ...state, count: state.count - 1, refs: tempRefs};
        }
        case 'setExpandState': {
            return {...state, opened: action.opened}
        }

    }
}

function AccordionButton({accordionIndex, ...props}, ref) {
    const buttonRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            buttonRef.current.focus()
        }
    }))
    const [state, accordionID] = useAccordionState();
    const [dispatch, handleFocusKey, handleExpand] = useAccordionDispatch();
    useEffect(() => {
        dispatch({type: 'addRef', ref: buttonRef, accordionIndex})
        return () => {
            dispatch({type: 'removeRef', ref: buttonRef, accordionIndex})
        }
    }, [])

    function handleButtonTrigger() {
        handleExpand(accordionIndex);
    }

    // arrow key to focus different header, space or enter to expand
    function handleKeyDown(event) {
        const key = event.key;
        switch (key) {
            case 'ArrowLeft':
            case 'ArrowUp': {
                // focus on previous button
                handleFocusKey(accordionIndex, false)
            } break;
            case 'ArrowDown':
            case 'ArrowRight': {
                handleFocusKey(accordionIndex, true)
            } break;
            case ' ': {
                // @todo prevent button default space event
                event.preventDefault();
                handleButtonTrigger();
            } break;
        }
    }
    return (
        <button
            ref={buttonRef}
            onClick={handleButtonTrigger}
            onKeyDown={handleKeyDown}
            id={`accordion-button-${accordionID}-${accordionIndex}`}
            aria-controls={`accordion-content-${accordionID}-${accordionIndex}`}
            {...props}
        />
    )
}
AccordionButton = forwardRef(AccordionButton)

function AccordionContent({accordionIndex, ...props}) {
    const [state, accordionID] = useAccordionState();
    console.log(state)
    return (
        <div 
            role="region"
            id={`accordion-content-${accordionID}-${accordionIndex}`}
            aria-labelledby={`accordion-button-${accordionID}-${accordionIndex}`}
            hidden={state.opened.includes(accordionIndex)? undefined: true}
            {...props}
        />
    )
}

function AccordionDemo() {
    return (
        <Accordion>
            <AccordionButton accordionIndex={0} style={buttonStyle}>1</AccordionButton>
            <AccordionContent accordionIndex={0}>1 Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc sagittis nunc a nisi blandit, non blandit risus maximus. Maecenas laoreet est quam, ac sollicitudin sem consectetur nec. Aenean accumsan blandit felis quis interdum. Fusce pellentesque luctus pharetra. Nullam efficitur nulla sit amet pellentesque cursus. Ut blandit dictum neque, ut laoreet sem accumsan sit amet. Vestibulum imperdiet libero mi, hendrerit lacinia nunc euismod quis. Curabitur consequat, tortor ac tempor euismod, lacus mi vulputate libero, ac consequat lacus justo vitae ex. Vivamus eu orci non sem ultricies faucibus a vel libero. Ut purus orci, ultrices ut mi at, finibus bibendum nibh. Vivamus vulputate enim interdum dui tristique euismod. Donec quis lobortis sem, eget commodo lorem. Nunc sapien dolor, rhoncus et vehicula elementum, convallis sit amet turpis.</AccordionContent>

            <AccordionButton accordionIndex={1} style={buttonStyle}>2</AccordionButton>
            <AccordionContent accordionIndex={1}>2 Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc sagittis nunc a nisi blandit, non blandit risus maximus. Maecenas laoreet est quam, ac sollicitudin sem consectetur nec. Aenean accumsan blandit felis quis interdum. Fusce pellentesque luctus pharetra. Nullam efficitur nulla sit amet pellentesque cursus. Ut blandit dictum neque, ut laoreet sem accumsan sit amet. Vestibulum imperdiet libero mi, hendrerit lacinia nunc euismod quis. Curabitur consequat, tortor ac tempor euismod, lacus mi vulputate libero, ac consequat lacus justo vitae ex. Vivamus eu orci non sem ultricies faucibus a vel libero. Ut purus orci, ultrices ut mi at, finibus bibendum nibh. Vivamus vulputate enim interdum dui tristique euismod. Donec quis lobortis sem, eget commodo lorem. Nunc sapien dolor, rhoncus et vehicula elementum, convallis sit amet turpis.</AccordionContent>
            
            
        </Accordion>
    )
}

const buttonStyle = {
    border: 0,
    borderStyle: 'none',
}

export {Accordion, AccordionButton, AccordionContent, AccordionDemo};