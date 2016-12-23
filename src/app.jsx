import React, { Component, PropTypes } from 'react';
import Modal from './Modal/Modal.jsx';

export default class App extends Component {
  state = {
    isModalOpen: false,
    formData: []
  }

  toggleModal = (value) => {
    this.setState({ isModalOpen: value || false });
  }

  handleOpenModal = () => {
    this.toggleModal(true);
  }

  handleModalSubmit = (data) => {
    this.setState({
      formData: data,
      isModalOpen: false
    });
    debugger;
    console.log('handleModalSubmit', data);
  }

  render() {
    return (
      <div className="main">
        <button onClick={this.handleOpenModal} className="btn btn-default">
          Open modal
        </button>
        <Modal
          isOpen={this.state.isModalOpen}
          onClose={this.toggleModal}
          onSubmit={this.handleModalSubmit}
          data={this.state.formData}
        />
      </div>
    );
  }
}
