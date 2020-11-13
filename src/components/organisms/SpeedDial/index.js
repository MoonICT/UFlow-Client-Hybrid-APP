/**
 * @author [Life]
 * @desc [description]
 * */
import React, {Component} from 'react';
import {FAB, Portal, Provider} from 'react-native-paper';
import DefaultStyle from '@Styles/default';

export default class SpeedDial extends Component {
  constructor(props) {
    super(props);
    this.state = {openValue: false};
  }

  onStateChange = ({open}) => {
    this.setState({openValue: open});
  };
  render() {
    const {actions} = this.props;
    const {openValue} = this.state;
    return (
      <Provider>
        <Portal>
          <FAB.Group
            style={DefaultStyle._wrapperDial}
            fabStyle={DefaultStyle._btnDial}
            open={openValue}
            icon={openValue ? 'close' : 'plus'}
            actions={actions}
            onStateChange={this.onStateChange}
            onPress={() => {
              if (openValue) {
                // do something if the speed dial is open
              }
            }}
            {...this.props}
          />
        </Portal>
      </Provider>
    );
  }
}
