import React from 'react'
import {ModalDemo } from './react/Modal';
import DateInput from './react/DateInput';
import "./App.css"
import {Accordion, AccordionButton, AccordionContent} from './react/Accordion';

function AccordionDemo() {
  return (
      <Accordion toggle={true} multiple={true} defaultExpandedIndex={[0, 1]}>
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
