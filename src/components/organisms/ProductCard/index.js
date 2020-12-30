/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-16 16:42:35
 * @modify date 2020-12-30 16:04:34
 * @desc [description]
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Alert, Button, TouchableOpacity } from 'react-native';

// Local Imports
import { styles } from './style';
import { Card } from 'react-native-paper';
import cardBG from '@Assets/images/card-img.png';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHorizontal: this.props.type === 'HORIZONTAL',
    };
  }

  badgeColor = code => {
    switch (code.toString()) {
      case '0001': // 냉동
        return 'blue';
      case '0002': // 냉장
        return 'green';
      case '0003': // 상온
        return 'orange';
      case '0004': // 위험물
        return 'red';
      case '9100': // 기타
        return 'gray';
      default:
        return 'gray';
    }
  };

  render() {
    let { data } = this.props;
    if (data === undefined) {
      data = {
        img: cardBG,
        type: '보관창고',
        title: '과천동 상온 50평',
        price: '12,345평',
        address: '경기도 화천시 부평읍',
        totalPrice: '60,000원/평',
        badgeType: true,
      };
    }

    return (
      <View
        style={[
          styles.container,
          { height: this.state.isHorizontal ? 124 : 261 },
          this.props.isShadow && styles.shadow,
        ]}>
        <View
          style={[
            styles.innerWrap,
            this.state.isHorizontal && styles.innerWrapHorizon,
          ]}>
          {/** Image */}
          <View style={styles.imageWrap}>
            <Card.Cover
              source={{ uri: data.img }}
              style={[
                styles.cardImage,
                this.state.isHorizontal && styles.cardImageHorizon,
              ]}
            />
            <View style={[styles.badge, data.badgeType && styles.badgeRed]}>
              <Text style={[styles.badgeLabel]}>
                {data?.badge ? '가맹창고' : '제휴창고'}
              </Text>
            </View>
          </View>

          {/** Contents */}
          <View
            style={[
              styles.contentWrap,
              this.state.isHorizontal && styles.contentWrapHorizon,
            ]}>
            {/* Title */}
            <Text
              style={[
                styles.fontColor2,
                styles.medium,
                styles.font14,
                { marginBottom: 3 },
              ]}>
              {data?.name}
            </Text>

            {/* Category */}
            <Text style={[styles.fontColor1, styles.regular, styles.font9]}>
              {data?.name}
            </Text>
            
            {/* Badge */}
            <View style={styles.cardAction}>
              <TouchableOpacity
                style={[styles.label, styles.labelPrimary]}
                title={'상온'}>
                <Text style={[styles.font9, styles.primaryColor]}>상온</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.label, styles.labelBlue]}
                title={'냉동'}>
                <Text style={[styles.font9, styles.blueColor]}>냉동</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.label, styles.labelGreen]}
                title={'냉장'}>
                <Text style={[styles.font9, styles.greenColor]}>냉장</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.label, styles.labelGray]}
                title={'보세'}>
                <Text style={[styles.font9, styles.grayColor]}>보세</Text>
              </TouchableOpacity>
            </View>

            {/* Area */}
            <Text style={[styles.fontColor1, styles.regular, styles.font9]}>
              {data.price}
            </Text>

            {/* Address */}
            <Text style={[styles.fontColor1, styles.regular, styles.font9]}>
              {data.address}
            </Text>

            {/* Price */}
            <Text style={[styles.medium, styles.font14, { marginTop: 22 }]}>
              {data.totalPrice}
            </Text>
          </View>
        </View>
      </View>
      // );
    );
  }
}

// Check Props Type.
ProductCard.defaultProps = {
  isShadow: true,
};
ProductCard.protoType = {
  data: PropTypes.object,
  type: PropTypes.string, // VERTICAL(Default), HORIZONTAL
  isShadow: PropTypes.bool,
};

export default ProductCard;
