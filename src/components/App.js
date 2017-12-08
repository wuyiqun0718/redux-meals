import React, { Component } from 'react';
import { addRecipe } from '../actions';
import '../App.css';

class App extends Component {
  state = {
    calendar: null,
  }
  componentDidMount() {
    const { store } = this.props;

    store.subscribe( () => {
      this.setState((...args) => {
        console.log(args);
        return { calendar: store.getState() }
      })
    })
  }
  submitFood = () => {
    this.props.store.dispatch(addRecipe({
      day: 'monday',
      meal: 'breakfast',
      recipe: {
        label: this.input.value
      }
    }));
    this.input.value = '';
  }
  render() {
    return (
      <div>
        <input 
          type='text'
          ref={input => this.input = input}
        />
        <button onClick={this.submitFood}>Submit</button>
        <pre>Monday's breakfast is {this.state.calendar && this.state.calendar.monday.breakfast}</pre>
      </div>
    );
  }
}

export default App;
