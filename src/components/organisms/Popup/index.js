/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-06 10:43:36
 * @modify date 2020-11-06 17:14:29
 * @desc [description]
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Modal, Portal, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import ActionCreator from '../../../actions';
import {styles} from './style';

class Popup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {popup, title, content, hidePopup} = this.props;

    return (
      <Portal>
        <Modal
          visible={popup}
          onDismiss={hidePopup}
          contentContainerStyle={styles.container}>
          <View style={styles.content}>
            <Text style={styles.headContent}>{title}</Text>
            <Text style={styles.textContent}>{content}</Text>
          </View>
          <View style={styles.actionButton}>
            <Button onPress={() => hidePopup()}>취소</Button>
            <View style={styles.borderHave} />
            <Button>확인</Button>
          </View>
        </Modal>
      </Portal>
    );
  }
}

// map state from store to  props of component
function mapStateToProps(state) {
  return {
    popup: state.popup.show,
    content: state.popup.content,
    title: state.popup.title,
  };
}

// map and dispatch action
function mapDispatchToProps(dispatch) {
  return {
    hidePopup: status => {
      dispatch(ActionCreator.hide(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Popup);
