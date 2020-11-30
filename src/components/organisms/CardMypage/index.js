/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import card from '@Assets/images/card-img.png';

// Local Imports
import TableInfo from '@Components/atoms/TableInfo';
import DefaultStyle from '@Styles/default';
import { styles as S } from './style';

class CardMypage extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { visible: false };
    this.navigation = props.navigation;
  }

  render() {
    const {
      data,
      styleLeft,
      styleRight,
      borderRow,
      bgrImage,
      headerTitle,
      onPressHeader,
      footer,
    } = this.props;
    // item && item.highlight === true ? DefaultStyle._highlightInfoTable : null;
    return (
      <View style={DefaultStyle._card}>
        <TouchableOpacity
          style={DefaultStyle._headerCard}
          onPress={onPressHeader}>
          <Text style={DefaultStyle._headerCardTitle}>{headerTitle}</Text>
          <View style={DefaultStyle.rightTitleHeader}>
            <Icon
              name="arrow-forward-ios"
              size={12}
              color="rgba(0, 0, 0, 0.87)"
            />
          </View>
        </TouchableOpacity>
        <View style={DefaultStyle._bodyCard}>
          <Image source={bgrImage ? bgrImage : card} style={S.imgAva} />
          <View style={S.info}>
            <TableInfo
              data={data && data}
              styleLeft={styleLeft}
              styleRight={styleRight}
              borderRow={borderRow}
            />
          </View>
          {footer}
        </View>
      </View>
    );
  }
}

export default CardMypage;
