import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'

/** initial-focus priority: initialFocusRef >> element[aria-describedby] >> first focusable element */
function Modal({initialFocusRef, handleClose=(()=>{}), ...props}) {
    const modalElement = useRef();

    const firstFocusElement = useRef();
    const lastFocusElement = useRef();

    const focusLastElement = function() {
        if (lastFocusElement.current) {
            lastFocusElement.current.focus();
        } else {
            const focusList = getFocusElements(modalElement)
            if (focusList.length > 0) {
                lastFocusElement.current = focusList[focusList.length - 1];
                lastFocusElement.current.focus();
            } else {
                // @todo no focusable element
            }
        }
    }

    const focusFirstElement = function() {
        if (firstFocusElement.current) {
            firstFocusElement.current.focus();
        } else {
            const focusList = getFocusElements(modalElement)
            if (focusList.length > 0) {
                firstFocusElement.current = focusList[0];
                firstFocusElement.current.focus();
            } else {
                // @todo no focusable element
            }
        }
    }

    // handle initial focus
    useEffect(() => {
        // handle focus ref props
        const initialRef = initialFocusRef;
        if (initialRef && initialRef.current) {
            initialRef.current.focus();
            return;
        }

        // handle focus id props
        const initialID = props["aria-describedby"];
        if (initialID)  {
            const initialFocusElement = modalElement.current.querySelectorAll('#' + initialID)[0];
            if (initialFocusElement) {
                initialFocusElement.focus();
            }
        } else {
            focusFirstElement();
        }
    }, [])

    const mousedownOutside = useRef(false);
    // handle escape key and click outside
    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.key == 'Escape' || event.key == 'Esc' || event.keyCode === 27) {
                handleClose(event);
            }
        }
        function handleMousedownOutside(event) {
            if (modalElement.current && !modalElement.current.contains(event.target)) {
                mousedownOutside.current = true;
            }
        }
        function handleMouseupOutside(event) {
            if (modalElement.current && !modalElement.current.contains(event.target) && mousedownOutside.current) {
                handleClose(event)
            }
        }
        document.addEventListener('mousedown', handleMousedownOutside, true);
        document.addEventListener('mouseup', handleMouseupOutside, true)
        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('mousedown', handleMousedownOutside, true);
            document.removeEventListener('mouseup', handleMouseupOutside, true)
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [])

    return  (
        <>
            <div tabIndex={0} onFocus={focusLastElement} aria-hidden></div>
                <div ref={modalElement} role={'dialog'} aria-modal {...props}>
                    {props.children}
                </div>
            <div tabIndex={0} onFocus={focusFirstElement} aria-hidden></div>
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
     const [modal3State, setmodal3State] = useState(false);
     const openButton4Element = useRef();
     const demo4CloseElement = useRef();
     useEffect(() => {
         if (!modal3State) {
             openButton4Element.current.focus();
         }
     }, [modal3State])

    //////// demo 4 state
    const [modal4State, setmodal4State] = useState(false);
    const openButton5Element = useRef();
    const focusRef = useRef();
    useEffect(() => {
        if (!modal4State) {
            openButton5Element.current.focus();
        }
    }, [modal4State])
    

    return(
        <>
        {/** demo 1 focus on the first focusable element */}
            <button onClick={() => setModal1State(true)} ref={openButton1Element}>Open demo modal 1</button>
            {
                modal1State? ReactDOM.createPortal(
                    <div style={backdropInlineStyle}>
                        <Modal aria-labelledby="demo_title_1" handleClose={() => setModal1State(false)} style={modalInlineStyle}>
                            <h2 id="demo_title_1">demo modal 1 focus trap</h2>
                            <button onClick={() => setModal1State(false)}>close modal</button>
                            <button>nest modal demo (todo)</button>
                            <button>button 2</button>
                            <button>button 3</button>
                            <button>button 4</button>
                        </Modal>
                    </div>, document.getElementsByTagName("body")[0])
                : null
            }

        {/** demo 2 with description text */}
            <button onClick={() => setModal2State(true)} ref={openButton2Element}>Open demo modal 2</button>
            {
                modal2State? ReactDOM.createPortal(
                    <div style={backdropInlineStyle}>
                        <Modal aria-labelledby="demo_title_2" aria-describedby="descrtion_id" handleClose={() => setModal2State(false)} style={modalInlineStyle}>
                            <h2 id="demo_title_2">demo modal 2 with description text</h2>
                            <p tabIndex={-1} id="descrtion_id">
                                Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc sagittis nunc a nisi blandit, non blandit risus maximus. Maecenas laoreet est quam, ac sollicitudin sem consectetur nec. Aenean accumsan blandit felis quis interdum. Fusce pellentesque luctus pharetra. Nullam efficitur nulla sit amet pellentesque cursus. Ut blandit dictum neque, ut laoreet sem accumsan sit amet. Vestibulum imperdiet libero mi, hendrerit lacinia nunc euismod quis. Curabitur consequat, tortor ac tempor euismod, lacus mi vulputate libero, ac consequat lacus justo vitae ex. Vivamus eu orci non sem ultricies faucibus a vel libero. Ut purus orci, ultrices ut mi at, finibus bibendum nibh. Vivamus vulputate enim interdum dui tristique euismod. Donec quis lobortis sem, eget commodo lorem. Nunc sapien dolor, rhoncus et vehicula elementum, convallis sit amet turpis.
                            </p>
                            <button onClick={() => setModal2State(false)}>close modal</button>
                        </Modal>
                    </div>, document.getElementsByTagName("body")[0])
                : null
            }

      
        {/** demo 4 with initial focus element */}
            <button onClick={() => setmodal3State(true)} ref={openButton4Element}>Open demo modal 3</button>
            {
                modal3State? ReactDOM.createPortal(
                    <div style={backdropInlineStyle} >
                        <Modal aria-labelledby="demo_title_4" initialFocusRef={demo4CloseElement} handleClose={() => setmodal3State(false)} style={modalInlineStyle}>
                            <h2 id="demo_title_3">demo modal 3</h2>
                            <button>button 1</button>
                            <button>button 2</button>
                            <button>button 3</button>
                            <button>button 4</button>
                            <button onClick={() => setmodal3State(false)} ref={demo4CloseElement}>close modal</button>
                        </Modal>
                    </div>, document.getElementsByTagName("body")[0])
                    
                : null
            }

        {/** demo 5 with ref */}
              <button onClick={() => setmodal4State(true)} ref={openButton5Element}>Open demo modal 4</button>
            {
                modal4State? ReactDOM.createPortal(
                    <div style={backdropInlineStyle} >
                        <Modal aria-labelledby="demo_title_5" handleClose={() => setmodal4State(false)} initialFocusRef={focusRef} style={modalInlineStyle}>
                            <h2 id="demo_title_5">demo modal 4</h2>
                            <input />
                            <button ref={focusRef} onClick={() => setmodal4State(false)}>close modal</button>
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