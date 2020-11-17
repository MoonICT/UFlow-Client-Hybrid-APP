/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-16 16:42:35
 * @modify date 2020-11-16 18:38:08
 * @desc [description]
 */

import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';

// Local Imports
import { styles } from './style';
import { Card } from 'react-native-paper';
import stepBG from '@Assets/images/step.png';
import { color } from '@Themes/colors';

class SloganCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { data } = this.props;
    if (data === undefined) {
      data = {
        img: stepBG,
        title: `안전한 대금 보호 시스템과 혹시 모를\n
위험요소를 위한 안심보험 가입까지!`,
      };
    }

    return (
      <Card style={styles.container}>
        <Card.Cover source={data.img} style={styles.cardImage} />
        <View style={styles.content}>
          <Text style={[styles.stepTitle, styles.regular, styles.font9]}>
            {data.title}
          </Text>
        </View>
      </Card >
    );
  }
}

export default SloganCard;
