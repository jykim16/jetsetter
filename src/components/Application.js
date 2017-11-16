import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import CountDown from './CountDown';
import NewItem from './NewItem';
import Items from './Items';

import './Application.css';

const defaultState = [
  { value: 'Pants', id: uniqueId(), packed: false },
  { value: 'Jacket', id: uniqueId(), packed: false },
  { value: 'iPhone Charger', id: uniqueId(), packed: false },
  { value: 'MacBook', id: uniqueId(), packed: false },
  { value: 'Sleeping Pills', id: uniqueId(), packed: true },
  { value: 'Underwear', id: uniqueId(), packed: false },
  { value: 'Hat', id: uniqueId(), packed: false },
  { value: 'T-Shirts', id: uniqueId(), packed: false },
  { value: 'Belt', id: uniqueId(), packed: false },
  { value: 'Passport', id: uniqueId(), packed: true },
  { value: 'Sandwich', id: uniqueId(), packed: true },
];

class Application extends Component {
  state = {
    items: defaultState,// Set the initial state,
  };

  // How are we going to manipualte the state?
  // Ideally, users are going to want to add, remove,
  // and check off items, right?

  addItem = (item) => {
    this.setState({items: [item, ...this.state.items]})
  }
  removeItem = (itemToRemove) => {
    var updatedItems = this.state.items.filter(item=>item.id !== itemToRemove.id)
    this.setState({items: updatedItems});
  }
  toggleItem = (itemToToggle) => {
    const items = this.state.items.map(item => {
      if (item.id !== itemToToggle.id) return item;
      return {...itemToToggle, packed: !itemToToggle.packed}
    })
    this.setState({items})
  }

  render() {
    // Get the items from state
    const {items} = this.state;
    var unpacked = items.filter(item => !item.packed);
    var packed = items.filter(item => item.packed);

    return (
      <div className="Application">
        <NewItem onSubmit={this.addItem}/>
        <CountDown />
        <Items onRemove={this.removeItem} title="Unpacked Items" items={unpacked} onToggle={this.toggleItem}/>
        <Items onRemove={this.removeItem} title="Packed Items" items={packed} onToggle={this.toggleItem}/>
        <button className="button full-width">Mark All As Unpacked</button>
      </div>
    );
  }
}

export default Application;
