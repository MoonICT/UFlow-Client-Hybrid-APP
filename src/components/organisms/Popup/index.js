/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-06 10:43:36
 * @modify date 2021-01-05 17:32:31
 * @desc [description]
 */

import React, { Component, Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { Modal, Portal, Button, Dialog, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import ActionCreator from '@Actions';
import DefaultStyle from '@Styles/default';
import { styles } from './style';
import illust11 from '@Assets/images/illust11.png';

class Popup extends Component {
  constructor (props) {
    super(props);
  }

  _hidePopup = () => {
    console.log('this.props :>> ', this.props);
    if (typeof this.props.hidePopup === 'function') {
      this.props.hidePopup();
    }
    if (typeof this.props.navigation === 'function') {
      this.props.navigation();
    }
  };

  render () {
    const { popup, title, content, hidePopup, type, image } = this.props;
    console.log('type :>> ', type);
    return (
      <Fragment>
        {type === 'confirm' ? (
          <Portal>
            <Dialog
              style={DefaultStyle.popup}
              visible={popup}
              onDismiss={hidePopup}>
              {image ? (
                <Dialog.Content>
                  <Image style={[DefaultStyle._imageDialog]} source={image} />
                </Dialog.Content>
              ) : null}
              {title ? (
                <Dialog.Title
                  style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
                  {title}
                </Dialog.Title>
              ) : null}
              <Dialog.Content>
                <Paragraph style={DefaultStyle.contentDialog}>
                  {content}
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions style={DefaultStyle._buttonPopup}>
                <Button
                  style={DefaultStyle._buttonElement}
                  onPress={() => this._hidePopup()}>
                  확인
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        ) : (
          <Portal>
            <Modal
              visible={popup}
              onDismiss={hidePopup}
              contentContainerStyle={styles.container}>
              <View style={styles.content}>
                <Text style={styles.headContent}>{title}</Text>
                <Text style={styles.textContent}>{content}</Text>
              </View>
              <View style={styles.action}>
                {/*<Button onPress={() => hidePopup()} style={styles.actionButton}>*/}
                  {/*취소*/}
                {/*</Button>*/}
                <View style={styles.borderHave} />
                <Button onPress={() => hidePopup()} style={styles.actionButton}>확인</Button>
              </View>
            </Modal>
          </Portal>
        )}
      </Fragment>
    );
  }
}

// map state from store to  props of component
function mapStateToProps (state) {
  return {
    popup: state.popup.show,
    content: state.popup.content,
    title: state.popup.title,
    type: state.popup.type,
    image: state.popup.image,
    navigation: state.popup.navigation,
  };
}

// map and dispatch action
function mapDispatchToProps (dispatch) {
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
