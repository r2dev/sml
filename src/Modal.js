import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'

/** modal will first focus on the props["aria-describedby"] element if provided, 
 * otherwise it will focus on props.initialFocusID element. If both props are not provided,
 * it will search the first element in the modal and focus on that!!!!*/

function Modal({children, initialFocusID, ...props}) {
    const modelElement = useRef();
    const focusStartElement = useRef();
    const focusEndElement = useRef();

    const firstFocusElement = useRef();
    const lastFocusElement = useRef();

    const focusOnLastElement = function() {
        if (lastFocusElement.current) {
            lastFocusElement.current.focus();
        } else {
            const focusList = getFocusElements(modelElement)
            if (focusList.length > 0) {
                lastFocusElement.current = focusList[focusList.length - 1];
                lastFocusElement.current.focus();
            } else {
                // @todo
            }
        }
    }

    const focusFirstElement = function() {
        if (firstFocusElement.current) {
            firstFocusElement.current.focus();
        } else {
            const focusList = getFocusElements(modelElement)
            if (focusList.length > 0) {
                firstFocusElement.current = focusList[0];
                firstFocusElement.current.focus();
            } else {
                // @todo
            }
        }
    }

    useEffect(() => {
        const initialFocusID = props.initialFocusID || props["aria-describedby"];
        if (initialFocusID)  {
            const initialFocusElement = modelElement.current.querySelectorAll('#' + initialFocusID)[0];
            if (initialFocusElement) {
                initialFocusElement.focus();
            }
        } else {
            focusFirstElement();
        }
    }, [])
    
    return  (
        <>
            <div tabIndex={0} ref={focusStartElement} onFocus={focusOnLastElement} aria-hidden></div>
                <div ref={modelElement} role={'dialog'} aria-modal {...props}>
                    {children}
                </div>
            <div tabIndex={0} ref={focusEndElement} onFocus={focusFirstElement} aria-hidden></div>
        </>
    )
}

// helper function
function getFocusElements(element) {
    return element.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');    
}




//////////////////////////////////////////
///////     demo  ////////////////////////
//////////////////////////////////////////


function ModalDemo() {
    /////// demo 1 state
    const [modal1State, setModal1State] = useState(false);
    const openButton1Element = useRef();
    useEffect(() => {
        if (!modal1State) {
            openButton1Element.current.focus();
        }
    }, [modal1State])


    //////// demo 2 state
    const [modal2State, setModal2State] = useState(false);
    const openButton2Element = useRef();
    useEffect(() => {
        if (!modal2State) {
            openButton2Element.current.focus();
        }
    }, [modal2State])

     //////// demo 3 state
     const [modal3State, setModal3State] = useState(false);
     const openButton3Element = useRef();
     useEffect(() => {
         if (!modal3State) {
             openButton3Element.current.focus();
         }
     }, [modal3State])

     //////// demo 4 state
     const [modal4State, setModal4State] = useState(false);
     const openButton4Element = useRef();
     useEffect(() => {
         if (!modal4State) {
             openButton4Element.current.focus();
         }
     }, [modal4State])
    

    return(
        <>
        {/** demo 1 focus on the first focusable element */}
            <button onClick={() => setModal1State(true)} ref={openButton1Element}>Open demo modal 1</button>
            {
                modal1State? ReactDOM.createPortal(
                    <Modal aria-labelledby="demo_title_1">
                        <h2 id="demo_title_1">demo modal 1 focus trap</h2>
                        <button onClick={() => setModal1State(false)}>close modal</button>
                        <button>button 1</button>
                        <button>button 2</button>
                        <button>button 3</button>
                        <button>button 4</button>
                    </Modal>, document.getElementsByTagName("body")[0])
                : null
            }

        {/** demo 2 with description text */}
            <button onClick={() => setModal2State(true)} ref={openButton2Element}>Open demo modal 2</button>
            {
                modal2State? ReactDOM.createPortal(
                    <Modal aria-labelledby="demo_title_2" aria-describedby="descrtion_id">
                        <h2 id="demo_title_2">demo modal 2 with description text</h2>
                        <p tabIndex={-1} id="descrtion_id">
                            Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc sagittis nunc a nisi blandit, non blandit risus maximus. Maecenas laoreet est quam, ac sollicitudin sem consectetur nec. Aenean accumsan blandit felis quis interdum. Fusce pellentesque luctus pharetra. Nullam efficitur nulla sit amet pellentesque cursus. Ut blandit dictum neque, ut laoreet sem accumsan sit amet. Vestibulum imperdiet libero mi, hendrerit lacinia nunc euismod quis. Curabitur consequat, tortor ac tempor euismod, lacus mi vulputate libero, ac consequat lacus justo vitae ex. Vivamus eu orci non sem ultricies faucibus a vel libero. Ut purus orci, ultrices ut mi at, finibus bibendum nibh. Vivamus vulputate enim interdum dui tristique euismod. Donec quis lobortis sem, eget commodo lorem. Nunc sapien dolor, rhoncus et vehicula elementum, convallis sit amet turpis.
                        </p>
                        <button onClick={() => setModal2State(false)}>close modal</button>
                    </Modal>, document.getElementsByTagName("body")[0])
                : null
            }

        {/** demo 3 with custom style */}
            <button onClick={() => setModal3State(true)} ref={openButton3Element}>Open demo modal 3</button>
            {
                modal3State? ReactDOM.createPortal(
                    <div style={backdropInlineStyle} >
                        <Modal aria-labelledby="demo_title_3" style={modalInlineStyle}>
                            <h2 id="demo_title_3">demo modal 3</h2>
                            <button onClick={() => setModal3State(false)}>close modal</button>
                        </Modal>
                    </div>, document.getElementsByTagName("body")[0])
                    
                : null
            }
        {/** demo 4 with initial focus element */}
            <button onClick={() => setModal4State(true)} ref={openButton4Element}>Open demo modal 4</button>
            {
                modal4State? ReactDOM.createPortal(
                    <div style={backdropInlineStyle} >
                        <Modal style={modalInlineStyle} aria-labelledby="demo_title_4" initialFocusID={"demo4-close-id"}>
                            <h2 id="demo_title_3">demo modal 4</h2>
                            <button>button 1</button>
                            <button>button 2</button>
                            <button>button 3</button>
                            <button>button 4</button>
                            <button onClick={() => setModal4State(false)} id="demo4-close-id">close modal</button>
                        </Modal>
                    </div>, document.getElementsByTagName("body")[0])
                    
                : null
            }
        </>  
    )
}

const modalInlineStyle = {width: 500, height: 500, border: '1px solid black', padding: 20, zIndex: 4, background: 'white'};
const backdropInlineStyle = {position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems:'center', justifyContent:'center', zIndex: 3, background: "rgba(0, 0, 0, 0.2)"};

export { Modal, ModalDemo };