import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Modal from '../src/Modal/Modal.jsx';
import App from '../src/app.jsx';

storiesOf('Modal', module)
  .add('opened modal', () => (
    <App />
  ));
