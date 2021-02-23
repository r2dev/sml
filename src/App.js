import React, {useState} from 'react'
import {ModalDemo } from './react/Modal';
import DateInput from './react/DateInput';
import "./App.css"
import {Accordion, AccordionItem} from './react/Accordion';

function AccordionDemo() {
  const [state, setState] = useState([1]);
  function handleExpanded(index) {
      setState([index])
  }
  return (
      <Accordion expandedItems={state} setExpandedItems={handleExpanded}>
          <AccordionItem buttonContent={"1"}>11111111111</AccordionItem>
          <AccordionItem buttonContent={({active}) => <div>{active? "2+": "2"}</div>}>2222222</AccordionItem>
          <AccordionItem buttonContent={<div>3</div>}>33333333333333</AccordionItem>
          <AccordionItem buttonContent={"4"}>44444444444</AccordionItem>
          <AccordionItem buttonContent={"5"}>5555</AccordionItem>
          <AccordionItem buttonContent={"6"}>6</AccordionItem>
      </Accordion>
      
  )
}

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
