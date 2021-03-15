import React, { useState } from 'react'
import {ModalDemo } from './react/Modal';
import DateInput from './react/DateInput';
import "./App.css"
import {Accordion, AccordionButton, AccordionContent} from './react/Accordion';
import { Link, Route, Router } from './react/Router';

function AccordionDemo() {
  const [expandState, setExpandState] = useState([1])
  function handleExpand(index) {

    /** demo allow only one accordion to be opened and click again to close*/
    // if (expandState.includes(index)) {
    //   setExpandState([])
    // } else {
    //   setExpandState([index])
    // }
///////////////////////////
    /** demo allow multiple accordions to be opened and click again to close */ 
    if (expandState.includes(index)) {
      setExpandState(expandState.filter((v) => v != index))
    } else {
      setExpandState(expandState.concat(index))
    }
////////////////////////////

    /** demo allow only one to be opened and click another one to close */ 
    // if (expandState.includes(index)) {
    // } else {
    //   setExpandState([index])
    // }

    
    
  }
  return (
      <Accordion expandedItems={expandState} onExpand={handleExpand}>
        <div className="accordion" id="accordionExample" style={{width: 300}}>
          <div className="accordion-item">
            <AccordionButton className="accordion-button collapsed" activeClassName="accordion-button" accordionIndex={0}>1</AccordionButton>
            <AccordionContent className="accordion-collapse collapse show" accordionIndex={0}>
              <div className="accordion-body">
              1 Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc sagittis nunc a nisi blandit, non blandit risus maximus. Maecenas laoreet est quam, ac sollicitudin sem consectetur nec. Aenean accumsan blandit felis quis interdum. Fusce pellentesque luctus pharetra. Nullam efficitur nulla sit amet pellentesque cursus. Ut blandit dictum neque, ut laoreet sem accumsan sit amet. Vestibulum imperdiet libero mi, hendrerit lacinia nunc euismod quis. Curabitur consequat, tortor ac tempor euismod, lacus mi vulputate libero, ac consequat lacus justo vitae ex. Vivamus eu orci non sem ultricies faucibus a vel libero. Ut purus orci, ultrices ut mi at, finibus bibendum nibh. Vivamus vulputate enim interdum dui tristique euismod. Donec quis lobortis sem, eget commodo lorem. Nunc sapien dolor, rhoncus et vehicula elementum, convallis sit amet turpis.
              </div>
            </AccordionContent>
          </div>
          <div className="accordion-item">
            <AccordionButton className="accordion-button collapsed" activeClassName="accordion-button" accordionIndex={1}>2</AccordionButton>
            <AccordionContent className="accordion-collapse collapse show" accordionIndex={1}>
              <div className="accordion-body">
              2 Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc sagittis nunc a nisi blandit, non blandit risus maximus. Maecenas laoreet est quam, ac sollicitudin sem consectetur nec. Aenean accumsan blandit felis quis interdum. Fusce pellentesque luctus pharetra. Nullam efficitur nulla sit amet pellentesque cursus. Ut blandit dictum neque, ut laoreet sem accumsan sit amet. Vestibulum imperdiet libero mi, hendrerit lacinia nunc euismod quis. Curabitur consequat, tortor ac tempor euismod, lacus mi vulputate libero, ac consequat lacus justo vitae ex. Vivamus eu orci non sem ultricies faucibus a vel libero. Ut purus orci, ultrices ut mi at, finibus bibendum nibh. Vivamus vulputate enim interdum dui tristique euismod. Donec quis lobortis sem, eget commodo lorem. Nunc sapien dolor, rhoncus et vehicula elementum, convallis sit amet turpis.
              </div>
            </AccordionContent>
          </div>
          <div className="accordion-item">
            <AccordionButton className="accordion-button collapsed" activeClassName="accordion-button" accordionIndex={2}>3</AccordionButton>
            <AccordionContent className="accordion-collapse collapse show" accordionIndex={2}>
              <div className="accordion-body">
              3 Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc sagittis nunc a nisi blandit, non blandit risus maximus. Maecenas laoreet est quam, ac sollicitudin sem consectetur nec. Aenean accumsan blandit felis quis interdum. Fusce pellentesque luctus pharetra. Nullam efficitur nulla sit amet pellentesque cursus. Ut blandit dictum neque, ut laoreet sem accumsan sit amet. Vestibulum imperdiet libero mi, hendrerit lacinia nunc euismod quis. Curabitur consequat, tortor ac tempor euismod, lacus mi vulputate libero, ac consequat lacus justo vitae ex. Vivamus eu orci non sem ultricies faucibus a vel libero. Ut purus orci, ultrices ut mi at, finibus bibendum nibh. Vivamus vulputate enim interdum dui tristique euismod. Donec quis lobortis sem, eget commodo lorem. Nunc sapien dolor, rhoncus et vehicula elementum, convallis sit amet turpis.
              </div>
            </AccordionContent>
          </div>
          <div className="accordion-item">
            <AccordionButton className="accordion-button collapsed" activeClassName="accordion-button" accordionIndex={3}>4</AccordionButton>
            <AccordionContent className="accordion-collapse collapse show" accordionIndex={3}>
              <div className="accordion-body">
              4 Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc sagittis nunc a nisi blandit, non blandit risus maximus. Maecenas laoreet est quam, ac sollicitudin sem consectetur nec. Aenean accumsan blandit felis quis interdum. Fusce pellentesque luctus pharetra. Nullam efficitur nulla sit amet pellentesque cursus. Ut blandit dictum neque, ut laoreet sem accumsan sit amet. Vestibulum imperdiet libero mi, hendrerit lacinia nunc euismod quis. Curabitur consequat, tortor ac tempor euismod, lacus mi vulputate libero, ac consequat lacus justo vitae ex. Vivamus eu orci non sem ultricies faucibus a vel libero. Ut purus orci, ultrices ut mi at, finibus bibendum nibh. Vivamus vulputate enim interdum dui tristique euismod. Donec quis lobortis sem, eget commodo lorem. Nunc sapien dolor, rhoncus et vehicula elementum, convallis sit amet turpis.
              </div>
            </AccordionContent>
          </div>
        </div>
      </Accordion>
  )
}

function App() {
  return (
    <>
    <Router>
      <Link to="/">Home</Link>
      <Link to="/modal">Modal</Link>
      <Link to="/accordion">Accordion</Link>
      <Link to="/router">Router</Link>
      <Link to="/experiment">Experiment</Link>
      <Route path='/'>
        <h1>sml - small library</h1>
        <p>This library is focus on reuseable, customization for everyday front end work.</p>
        <p>reuseable: every component is under one file only, just copy the source code into your project, no npm/yarn install</p>
        <p>customization: you own the source code, so change if you need</p>
        <p><b>under development</b></p>
      </Route>
      <Route path='/modal'>
        <h1>Modal(dialog)</h1>
        <ModalDemo />
      </Route>
     
      <Route path='/accordion'>
        <h1>Accordion</h1>
        <AccordionDemo />
      </Route>
      <Route path='/router'>
        <h1>Router</h1>
        <p>to do</p>
      </Route>
      <Route path='/experiment'>
        <hr/>
        <Link to="calendar-input">Calendar Input</Link>
        <h1>experiment</h1>
        <Route path='calendar-input'>
          <h3>Date input with calendar</h3>
          <DateInput />
          </Route>
      </Route>
     
    </Router>
    </>
  )
}

export default App;
