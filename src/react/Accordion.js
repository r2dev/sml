import React, { useRef } from 'react'

/**
 * accordionNextID is used to assign a global unique id for accordion children component
 */
let accordionNextID = 0;

function Accordion({
    expandedItems = [],
    setExpandedItems = index => {}, 
    children, 
    ...props
}) {
    const accordionID = useRef(accordionNextID++);
    const accordionCount = React.Children.count(children);
    function handleFocusKey(accordionIndex) {
        const uniqueID = accordionID.current
        const elem = document.getElementById(`accordion-button-${uniqueID}-${accordionIndex}`);
        if (elem) {
            elem.focus();
        }
    }
    function handleKeyDown(event) {
        let accordionIndex = parseInt(event.target.dataset.focusIndex, 10);
        const key = event.key;
        switch (key) {
            case 'ArrowLeft':
            case 'ArrowUp': {
                if (accordionIndex > 0) {
                    handleFocusKey(--accordionIndex)
                }
            } break;
            case 'ArrowDown':
            case 'ArrowRight': {
                if (accordionIndex < accordionCount - 1) {
                    handleFocusKey(++accordionIndex)
                }
            } break;
            case 'Home': {
                if (accordionIndex !== 0) {
                    handleFocusKey(0)
                }
            } break;
            case 'End': {
                if (accordionIndex !== accordionCount - 1) {
                    handleFocusKey(accordionCount - 1)
                }
            } break;
        }
    }

    return (<div onKeyDown={handleKeyDown} {...props}>
        {React.Children.map(children, (child, index) => (
            React.cloneElement(child, {accordionID: accordionID.current, accordionIndex: index, expandedItems, setExpandedItems})
        ))}
    </div>)
}

function AccordionItem({renderButton, children, ...props}) {
    function handleButtonClick() {
        props.setExpandedItems(props.accordionIndex);
    }
    return (
        <>
            <button
                type="button"
                onClick={handleButtonClick}
                id={`accordion-button-${props.accordionID}-${props.accordionIndex}`}
                aria-controls={`accordion-content-${props.accordionID}-${props.accordionIndex}`}
                data-focus-index={props.accordionIndex}
            >
                {
                React.isValidElement(renderButton)? 
                    React.cloneElement(renderButton):
                    typeof renderButton === 'function'? renderButton({active: props.expandedItems.includes(props.accordionIndex)}): renderButton
                    }
            </button>
            <div 
                role="region"
                id={`accordion-content-${props.accordionID}-${props.accordionIndex}`}
                aria-labelledby={`accordion-button-${props.accordionID}-${props.accordionIndex}`}
                hidden={props.expandedItems.includes(props.accordionIndex)? undefined: true}
            >
                {children}
            </div>
        </>
    )
}



export {Accordion, AccordionItem};