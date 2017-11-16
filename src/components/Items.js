import React, { Component } from 'react';
import Item from './Item';
import Filter from './Filter';

class Items extends Component {

  constructor() {
    super();
    this.state = {
      searchTerm: '',// What state does this component have?
    };
  }

  updateSearchTerm = searchTerm => {
    this.setState({
      searchTerm: searchTerm
    })
  };

  render() {
    const { title, items, onRemove } = this.props;
    const {searchTerm} = this.state;
    return (
      <section className="Items">
        <h2>
          {title} ({items.length})
        </h2>
        <Filter searchTerm={searchTerm} onChange={this.updateSearchTerm} />
        {items
          .filter(item =>
            // Hmm… this needs some work.
            item.value.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(item => (
            <Item
              key={item.id}
              onToggle={this.props.onToggle}
              onRemove={() => onRemove(item)}
              item={item}
            />
          ))}
      </section>
    );
  }
}

export default Items;
