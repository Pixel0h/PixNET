import React from 'react';

import Switch from "../switch";
import Hide from "../hide";

import { RiPixelfedLine } from 'react-icons/ri';

class App extends React.Component {
  authenticate() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  componentDidMount() {
    this.authenticate().then(() => {
      const ele = document.getElementById('ipl-progress-indicator');
      if (ele) {
        ele.classList.add('available');
        setTimeout(() => {
          ele.outerHTML = '';
        }, 2000);
      }
    });
  }
  render() {
    return (
      <div className="App">
        <header>
          <RiPixelfedLine className="pixelIcon" />
          <Hide />
        </header>
        <Switch />
      </div>
    )
  }
}

export default App;
