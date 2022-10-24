import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/Form/Form';
import { Box } from 'components/Theme/Box';
import { Filter } from 'components/Filter/Filter';
import { Contacts } from 'components/Contacts/Contacts';

export class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addNewName = e => {
    e.preventDefault();

    const value = e.target[0].value;
    const number = e.target[1].value;

    if (this.state.contacts.find(contact => contact.name === value)) {
      alert(`${value} is already in contacts.`);
    } else {
      this.setState(prevState => {
        return {
          contacts: [
            ...prevState.contacts,
            ...[{ id: nanoid(), name: value, number: number }],
          ],
        };
      });
    }

    this.clearInputField();
  };

  searchByFilter = e => {
    const searchValue = e.target.value.toLocaleLowerCase();

    const filteredValue = this.state.contacts.filter(name =>
      name.name.toLocaleLowerCase().includes(searchValue)
    );

    this.setState({ filter: filteredValue });
  };

  clearInputField = () => {
    document.getElementById('formUser').reset();
  };

  removeNameFromList = e => {
    const removeFromList = e.currentTarget.parentNode.attributes.id.value;

    if (this.state.filter) {
      const removedValue = this.state.filter.filter(
        i => i.id !== removeFromList
      );
      this.setState({ filter: removedValue });
    }
    const removedValue = this.state.contacts.filter(
      i => i.id !== removeFromList
    );
    this.setState({ contacts: removedValue });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  render() {
    const { filter, contacts } = this.state;

    return (
      <>
        <Box ml={5} color="primary">
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addNewName} />
          <h2>Contacts</h2>
          <Filter onChange={this.searchByFilter} />
          <Contacts
            filter={filter}
            contacts={contacts}
            onClick={this.removeNameFromList}
          />
        </Box>
      </>
    );
  }
}
