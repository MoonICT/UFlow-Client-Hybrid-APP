/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-16 16:42:35
 * @modify date 2020-12-02 18:39:12
 * @desc [description]
 */

import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Local Imports
import { styles } from './style';
import { Card } from 'react-native-paper';
import stepBG from '@Assets/images/step.png';
import { color } from '@Themes/colors';

class StepCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { data } = this.props;
    if (data === undefined) {
      data = {
        img: stepBG,
        step: 'Step 4. 창고 임대 진행 및 완료',
        title: `안전한 대금 보호 시스템과 혹시 모를\n
위험요소를 위한 안심보험 가입까지!`,
        content: `• 에스크로 방식의 대금보호시스템을 통해 대금 
걱정 없이 창고 관리에만 집중하실 수 있습니다.
• 안심 재물보험 가입으로 혹시 모를 
위험요소까지 보장해 드립니다.`,
      };
    }

    return (
      <Card style={styles.container}>
        <View style={styles.content}>
          <Image source={data.img} style={styles.cardImage} />
          <Text style={[styles.stepTitle, styles.bold, styles.font16]}>
            {data.step}
          </Text>
          <Text
            style={[
              styles.titleType,
              styles.title,
              styles.medium,
              styles.font14,
            ]}>
            {data.title}
          </Text>
          <Text
            style={[
              styles.titleType,
              styles.content,
              styles.medium,
              styles.font14,
            ]}>
            {data.content}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => Alert.alert('Hello')}
          style={[styles.mainStepSeeMoreBTN]}>
          <Text style={[styles.regulare, styles.font14, styles.blueColor]}>
            창고 등록 바로가기
          </Text>
          {
            <Icon
              name="arrow-forward"
              size={18}
              color={color.tertiary_02.main}
            />
          }
        </TouchableOpacity>
      </Card>
      // );
    );
  }
}

export default StepCard;
