import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export default class App extends Component {
  state = {
    open: true,
    numbersCategories: [
      { value: 'twin', label: 'Twin' },
      { value: 'triple', label: 'Triple' },
      { value: 'quadro', label: 'Quadro' }
    ],
    formData: [
      { category: 'twin', value: 22 }
    ]
  }


  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleCategoryChange = (e, index, value) => {
    this.updateCurrFormData(index, 'category', value);
  }

  updateCurrFormData(index, field, value) {
    const { formData } = this.state;
    const currField = formData[index];

    if (currField) {
      currField.value = value;
    } else {
      formData.push({ [field]: value });
    }

    this.setState({ formData });
  }

  handleNumberChange = (e, index) => {
    const value = e.target.value.trim();

    if (!value) { return; }

    this.updateCurrFormData(index, 'value', value);
  }

  renderHeader() {
    const style = {
      backgroundColor: 'grey'
    };
    const styleIcon = {
      'float': 'right'
    };

    return (
      <div className="header" style={style}>
        <span>Структура номеров</span>
        <i className="material-icons" style={styleIcon}>close</i>
      </div>
    );
  }

  renderBody() {
    return (
      <form >
        {this.state.formData.map((item, index) => this.renderFormField(item, index))}
      </form>
    );
  }

  renderFormField(data, index) {
    const textFieldStyle = {
      width: '50px'
    };

    return (
      <div className="form-field" key={index}>
        {this.renderCategoriesSelect(data.category, index)}
        <TextField
          onChange={(e) => { this.handleNumberChange(e, index) }}
          id={`number-field-${index}`}
          type="number"
          style={textFieldStyle}
        />
      </div>
    )
  }

  renderCategoriesSelect(value) {
    return (
      <SelectField
        value={value}
        onChange={this.handleCategoryChange}
      >
        {this.state.numbersCategories.map((item, index) => (
          <MenuItem
            value={item.value}
            primaryText={item.label}
            key={index}
          />
        ))}
      </SelectField>
    );
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];
    const style = {
      'padding': '40px'
    };

    return (
      <div className="main">
       <MuiThemeProvider>
         <Dialog
         title={this.renderHeader()}
         actions={actions}
         modal={true}
         open={this.state.open}
         style={style}
       >
           {this.renderBody()}
         </Dialog>
       </MuiThemeProvider>
      </div>
    );
  }
}
