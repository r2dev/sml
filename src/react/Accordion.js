import React, { useEffect, useRef, createContext, useContext, useReducer } from 'react'

/**
 * accordionNextID is used to assign a global unique id for accordion children component
 */
let accordionNextID = 0;

/**
 * next and previous are flags to identify user's arrow key action,
 * first and last are flags to identify when user press __home__ and __end__ on keyboard
 */
const FocusFlag_Next = 1;
const FocusFlag_Previous = 2;
const FocusFlag_First = 3;
const FocusFlag_Last = 4;

function Accordion({
    // this value is for initializing only, change value after render will not take effects
    defaultExpandedIndex = [],

    // allow users to open multiple accordion at the same time
    multiple=false,

    // allow users to click the opened button to close the accordion
    toggle=false,
    children,
}) {
    const internalAccordionID = useRef(accordionNextID++);

    const [state, dispatch] = useReducer(internalAccordionReducer, {
        // count is how many accordion buttons in this accordion
        count: 0,
        // refs will look like this when finished {1: button1ref, 2: button2Ref, 4: button4ref}
        refs: {},
        // opened will hold the opened accordion index in a array
        opened: defaultExpandedIndex
    });
    

    function handleFocusKey(currentIndex, focusFlag) {
        const initialIndex = currentIndex
        switch (focusFlag) {
            case FocusFlag_Next: {
                // because accordion can be dynamic removed, so we search the next accordionIndex
                while (!state.refs[++currentIndex] && currentIndex < state.count) {}
            } break;
            case FocusFlag_Previous: {
                while (!state.refs[--currentIndex] && currentIndex >= 0) {}
            } break;
            case FocusFlag_First: {
                currentIndex = 0
            } break;
            case FocusFlag_Last: {
                currentIndex = state.count - 1
            } break;
        }
        // this prevents from focusing on element when element is already being focused,
        // e.g. press up when focus on the first accordion button
        if (initialIndex !== currentIndex) {
            if (state.refs[currentIndex] && state.refs[currentIndex].current) {
                state.refs[currentIndex].current.focus()
            }
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
                {children}
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

function internalAccordionReducer(state, action) {
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

function AccordionButton({accordionIndex, className, activeClassName, ...props}) {
    const buttonRef = useRef();
    const [state, accordionID] = useAccordionState();
    const [dispatch, handleFocusKey, handleExpand] = useAccordionDispatch();
    // when mounted, we send the ref to context
    useEffect(() => {
        dispatch({type: 'addRef', ref: buttonRef, accordionIndex})
        return () => {
            dispatch({type: 'removeRef', ref: buttonRef, accordionIndex})
        }
    }, [])

    function handleButtonTrigger() {
        handleExpand(accordionIndex);
    }

    // arrow key to focus different button, space or enter to expand
    function handleKeyDown(event) {
        const key = event.key;
        switch (key) {
            case 'ArrowLeft':
            case 'ArrowUp': {
                handleFocusKey(accordionIndex, FocusFlag_Previous)
            } break;
            case 'ArrowDown':
            case 'ArrowRight': {
                handleFocusKey(accordionIndex, FocusFlag_Next)
            } break;
            case 'Home': {
                handleFocusKey(accordionIndex, FocusFlag_First)
            } break;
            case 'End': {
                handleFocusKey(accordionIndex, FocusFlag_Last)
            } break;
            case ' ': {
                event.preventDefault();
                handleButtonTrigger();
            } break;
        }
    }
    return (
        <button
            type="button"
            ref={buttonRef}
            onClick={handleButtonTrigger}
            onKeyDown={handleKeyDown}
            id={`accordion-button-${accordionID}-${accordionIndex}`}
            aria-controls={`accordion-content-${accordionID}-${accordionIndex}`}
            className={state.opened.includes(accordionIndex) && activeClassName && activeClassName.length? activeClassName: className}
            {...props}
        />
    )
}

function AccordionContent({accordionIndex, className, activeClassName, ...props}) {
    const [state, accordionID] = useAccordionState();
    return (
        <div 
            role="region"
            id={`accordion-content-${accordionID}-${accordionIndex}`}
            aria-labelledby={`accordion-button-${accordionID}-${accordionIndex}`}
            hidden={state.opened.includes(accordionIndex)? undefined: true}
            className={(state.opened.includes(accordionIndex) && activeClassName && activeClassName.length)? activeClassName: className}
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
            <div>
                <AccordionButton accordionIndex={2} style={buttonStyle}>3</AccordionButton>
                <AccordionButton accordionIndex={3} style={buttonStyle}>4</AccordionButton>
                <div>
                    <div>
                    <AccordionContent accordionIndex={2}>3 Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc sagittis nunc a nisi blandit, non blandit risus maximus. Maecenas laoreet est quam, ac sollicitudin sem consectetur nec. Aenean accumsan blandit felis quis interdum. Fusce pellentesque luctus pharetra. Nullam efficitur nulla sit amet pellentesque cursus. Ut blandit dictum neque, ut laoreet sem accumsan sit amet. Vestibulum imperdiet libero mi, hendrerit lacinia nunc euismod quis. Curabitur consequat, tortor ac tempor euismod, lacus mi vulputate libero, ac consequat lacus justo vitae ex. Vivamus eu orci non sem ultricies faucibus a vel libero. Ut purus orci, ultrices ut mi at, finibus bibendum nibh. Vivamus vulputate enim interdum dui tristique euismod. Donec quis lobortis sem, eget commodo lorem. Nunc sapien dolor, rhoncus et vehicula elementum, convallis sit amet turpis.</AccordionContent>
                    </div>
                </div>
                <AccordionContent accordionIndex={3}>4 Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc sagittis nunc a nisi blandit, non blandit risus maximus. Maecenas laoreet est quam, ac sollicitudin sem consectetur nec. Aenean accumsan blandit felis quis interdum. Fusce pellentesque luctus pharetra. Nullam efficitur nulla sit amet pellentesque cursus. Ut blandit dictum neque, ut laoreet sem accumsan sit amet. Vestibulum imperdiet libero mi, hendrerit lacinia nunc euismod quis. Curabitur consequat, tortor ac tempor euismod, lacus mi vulputate libero, ac consequat lacus justo vitae ex. Vivamus eu orci non sem ultricies faucibus a vel libero. Ut purus orci, ultrices ut mi at, finibus bibendum nibh. Vivamus vulputate enim interdum dui tristique euismod. Donec quis lobortis sem, eget commodo lorem. Nunc sapien dolor, rhoncus et vehicula elementum, convallis sit amet turpis.</AccordionContent>
            </div>       
        </Accordion>
    )
}

const buttonStyle = {
    border: 0,
    borderStyle: 'none',
}

export {Accordion, AccordionButton, AccordionContent, AccordionDemo};