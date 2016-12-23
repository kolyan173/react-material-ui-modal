import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.array
  }

  static defaultProps = {
    isOpen: false,
    data: []
  }

  state = {
    numbersCategories: [
      { value: 'twin', label: 'Twin' },
      { value: 'triple', label: 'Triple' },
      { value: 'quadro', label: 'Quadro' }
    ],
    formData: this.props.data
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillReceiveProps(newProps, newState) {
    console.log(newProps, newState);
  }

  handleClose = () => {
    this.props.onClose();
    debugger;
    this.setState({ formData: this.props.data})
  }

  handleCategoryChange = (e, value, index) => {
    this.updateCurrFormData(index, 'category', value);
  }

  updateCurrFormData(index, field, value) {
    const { formData } = this.state;
    const currField = formData[index];

    currField[field] = value;

    this.setState({ formData });
  }

  handleNumberChange = (e, index) => {
    const value = e.target.value.trim();

    if (!value) { return; }

    this.updateCurrFormData(index, 'value', +value);
  }

  handleRemoveButton = (index) => {
    const { formData } = this.state;
    const newFormData = formData.filter((item, i) => i !== index);

    this.setState({ formData: newFormData });
  }

  handleAddField = () => {
    const { formData } = this.state;

    formData.push({});

    this.setState({ formData });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.formData)
  }

  renderHeader() {
    const style = {
      padding: 40,
      marginBottom: 10
    };
    const styleIcon = {
      'float': 'right'
    };
    const contentStyle = {
      backgroundColor: 'rgba(209, 209, 209, 0.541176)',
      padding: 24
    };

    return (
      <div className="modal-header" style={style}>
        <div className="modal-header-content" style={contentStyle}>
          <span>Структура номеров</span>
          <i
            className="material-icons"
            style={styleIcon}
            onClick={this.handleClose}
          >
            close
          </i>
        </div>
      </div>
    );
  }

  renderBody() {
    return (
      <div className="modal-body-content">
        {this.state.formData.map((item, index) => this.renderFormField(item, index))}
        <div className="add-btn-wrapper">
          <FlatButton
            label="Добавить"
            primary={true}
            onClick={this.handleAddField}
          />
        </div>
      </div>
    );
  }

  renderFormField(data, index) {
    const textFieldStyle = {
      padding: 0,
      width: 40,
      float: 'left',
      marginRight: 20
    };
    const styleIcon = {
      color: 'red',
      fontSize: 24
    };
    const style = {
      margin: '0 0 15px 15px'
    };

    return (
      <div className="field" key={index} style={style}>
        {this.renderCategoriesSelect(data.category, index)}
        <TextField
          onChange={(e) => { this.handleNumberChange(e, index) }}
          id={`number-field-${index}`}
          type='number'
          value={data.value}
          style={textFieldStyle}
        />
        <FloatingActionButton
          backgroundColor="rgb(244, 219, 219)"
          onClick={this.handleRemoveButton.bind(this, index)}
          mini
        >
          <i className="material-icons md-18" style={styleIcon}>close</i>
        </FloatingActionButton>
      </div>
    )
  }

  renderCategoriesSelect(value, index) {
    const style = {
      marginRight: 20,
      padding: 0,
      width: 115,
      float: 'left'
    };

    return (
      <SelectField
        style={style}
        value={value}
        onChange={(e, i, value) => {this.handleCategoryChange(e, value, index)}}
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

  renderFooter() {
    const style = {
      textAlign: 'left',
      padding: '0 15px',
      border: 'none'
    };
    const cancelBtnStyle = {
      boxShadow: 'none'
    };

    return (
      <div className="modal-footer" style={style}>
        <RaisedButton
          label="Сохранить"
          primary={true}
          onTouchTap={this.handleSubmit}
        />
        <RaisedButton
          label="Отмена"
          onTouchTap={this.handleClose}
          style={cancelBtnStyle}
        />
      </div>
    );
  }

  render() {
    const style = {
      padding: 40,
      width: '100%'
    };
    const contentStyle = {
      maxWidth: 500
    };
    const actionsContainerStyle = {
      padding: 40
    };
    const bodyStyle = {
      margin: 0,
      padding: 40,
      paddingTop: 0
    };
    const overlayStyle = {
      backgroundColor: 'rgba(209, 209, 209, 0.541176)'
    };

    return (
       <MuiThemeProvider>
         <Dialog
           title={this.renderHeader()}
           actions={this.renderFooter()}
           actionsContainerClassName="modal-footer-container"
           actionsContainerStyle={actionsContainerStyle}
           modal
           open={this.props.isOpen}
           style={style}
           className="modal-root"
           contentClassName="modal-content"
           contentStyle={contentStyle}
           bodyClassName="modal-body"
           bodyStyle={bodyStyle}
           overlayStyle={overlayStyle}
         >
           {this.renderBody()}
         </Dialog>
       </MuiThemeProvider>
    );
  }
}
