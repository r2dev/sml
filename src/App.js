import React from 'react'
import {ModalDemo } from './react/Modal';
import DateInput from './react/DateInput';
import "./App.css"
import { AccordionDemo } from './react/Accordion';

function App() {
  return (
    <>
    <div>
      <h2>Modal(dialog)</h2>
      <ModalDemo />
    </div>
    <hr />
    <div>
      <h2>Accordion</h2>
      <AccordionDemo />
    </div>
    <hr />
    <div>
      <h2>experiment</h2>
      <hr />
      <h3>Date input with calendar</h3>
      <DateInput />
    </div>
    </>
  )
}

export default App;
