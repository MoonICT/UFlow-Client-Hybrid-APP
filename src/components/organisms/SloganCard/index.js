/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-16 16:42:35
 * @modify date 2020-11-17 11:48:20
 * @desc [description]
 */

import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

// Local Imports
import {styles} from './style';
import stepBG from '@Assets/images/step.png';
// import {color} from '@Themes/colors';

class SloganCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {data} = this.props;
    if (data === undefined) {
      data = {
        img: stepBG,
        title: `안전한 대금 보호 시스템과 혹시 모를`,
      };
    }

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={data.img} />
          <Text style={[styles.sloganTitle, styles.medium, styles.font14]}>
            {data.title}
          </Text>
        </View>
      </View>
    );
  }
}

export default SloganCard;
