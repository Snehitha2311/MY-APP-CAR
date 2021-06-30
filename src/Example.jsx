import './App.css';
import React, { Component, Fragment } from 'react';
import {Button} from 'react-bootstrap';

const { Provider, Consumer } = React.createContext("color");

const ColorInput = ({colorName}) => (
  <Consumer>{
    ({ colors, update}) => (
      <label>
        <input type="range" min="0" max="255" value={colors[colorName]}
        onChange={(e) => update({ [colorName]: e.target.value})}/>
        {colorName}
      </label>
    )}</Consumer>
)

const ColorDisplay = () => (
  <Consumer>{
    ({colors: {red, green, blue}}) => (
      <div style={{background: `rgb(${red}, ${green}, ${blue})`, height: '200px', width: '400px'}}></div>
    )
  }</Consumer>
)

const RgbDisplay = () => (
  <Consumer>{
  ({colors: {red, green, blue}}) => (
    <p>rgb({red},{green},{blue})</p>
  )}</Consumer>
)

const ColorSelectorUI = () => (
  <main>
    <section>
      <ColorInput colorName="red"/>
      <ColorInput colorName="green"/>
      <ColorInput colorName="blue"/>
      </section>
      <section>
        <ColorDisplay />
        <RgbDisplay />
      </section>
  </main>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      red: 240,
      green: 210,
      blue: 110
    }
  }
  update = (color) => this.setState(color);

  render() {
    const colors = this.state;
    return(
      <center>
      <Provider value={{colors: colors, update: this.update}}>
      <Fragment>
        <h2>Context API</h2>
        <ColorSelectorUI />
      </Fragment>
      </Provider>
      </center>
    )
  }
}
export default App;
