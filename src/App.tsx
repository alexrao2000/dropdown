import React, { useState } from 'react';
import Dropdown from './components/Dropdown';

const App: React.FC = () => {

  const optionsSingle = ['Coke', 'Pepsi', 'Dr. Pepper', '7up', 'Sprite', 'Mountain Dew', 'Snapple', 'Mug'];
  const optionsMulti = ['Laffy Taffy', 'Skittles', 'M&Ms', 'Smarties', 'Reese\'s Cups', 'Jawbreakers', 'Hershey\'s', 'Jolly Ranchers'];
  
  /* for performance testing. fyi performance was fine on my end, including select/deselect all */
  // const massiveOptions = Array.from({ length: 10000 }, (_, idx) => `Option ${idx}`);

  // Add more if you want to create a new dropdown
  const [singleSelection, setSingleSelection] = useState(''); // For single selection example
  const [multiSelection, setMultiSelection] = useState<string[]>([]); // For multi selection example

  const setSelection = (vals: string | string[]) => {

    if (typeof vals === 'string') {
      setSingleSelection(vals);
    }
    if (Array.isArray(vals)) {
      setMultiSelection(vals);
    }

  }

  return (

    <div className='container'>

      <div>
        <h2>Single Select</h2>
        <Dropdown
          label="Select one"
          options={optionsSingle}
          multiple={false}
          selectedValue={singleSelection}
          showNone = {true}
          onChange={setSelection}
        />
      </div>

      <div>
        <h2>Multi Select</h2>
        <Dropdown
          label="Select one or more"
          options={optionsMulti}
          multiple
          selectedValues={multiSelection}
          truncateDisplayText={true} // I recommend leaving this as true always, it looks bad if you don't truncate it
          showSelectAll = {true}
          onChange={setSelection}
        />
      </div>

    </div>

  );

};

export default App;
