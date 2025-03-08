import React, { useState } from 'react';
import Dropdown from './components/Dropdown';

const App: React.FC = () => {

  const optionsSingle = ['Coke', 'Pepsi', 'Dr. Pepper', '7up', 'Sprite', 'Mountain Dew', 'Snapple', 'Mug'];
  const optionsMulti = ['Laffy Taffy', 'Skittles', 'M&Ms', 'Smarties', 'Reese\'s Cups', 'Jawbreakers', 'Hershey\'s', 'Jolly Ranchers'];
  //const optionsMulti2 = ['Laffy Taffy', 'Skittles', 'M&Ms', 'Smarties', 'Reese\'s Cups', 'Jawbreakers', 'Hershey\'s', 'Jolly Ranchers'];
  
  // For performance testing. fyi performance was fine on my end, including select/deselect all
  //const massiveOptions = Array.from({ length: 10000 }, (_, idx) => `Option ${idx}`);

  // Add more if you want to create a new dropdown
  const [singleSelection, setSingleSelection] = useState(''); // For single selection example
  const [multiSelection, setMultiSelection] = useState<string[]>([]); // For multi selection example
  //const [multiSelection2, setMultiSelection2] = useState<string[]>([]); // For multi selection example
  
  // Currently, you need to manually add items in here in order to download them. I didn't make that part dynamic yet.
  const downloadable = [singleSelection, multiSelection];

  function downloadSelectionAsFile(selectionArray: string | string[] | Object) {

    const blob = new Blob([JSON.stringify(selectionArray, null, 2)], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'selection.json';
    link.click();
  
    URL.revokeObjectURL(blobUrl);

  };


  const setSelection = (setter: Function) => {

    return (vals: string | string[]) => {
      setter(vals)
    }

  };

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
          onChange={setSelection(setSingleSelection)}
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
          onChange={setSelection(setMultiSelection)}
        />
      </div>

      <button onClick={() => downloadSelectionAsFile(downloadable)}>
        Confirm
      </button>

      {/* For testing */}

      {/*<div>
        <h2>Multi Select</h2>
        <Dropdown
          label="Select one or more"
          options={optionsMulti2}
          multiple
          selectedValues={multiSelection2}
          truncateDisplayText={true} // I recommend leaving this as true always, it looks bad if you don't truncate it
          showSelectAll = {true}
          onChange={setSelection(setMultiSelection2)}
        />
      </div>*/}

    </div>

  );

};

export default App;
