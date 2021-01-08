/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-16 16:42:35
 * @modify date 2021-01-08 16:39:17
 * @desc [description]
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

// Local Imports
import { styles } from './style';
import { Card } from 'react-native-paper';
import cardBG from '@Assets/images/card-img.png';
import AsyncStorage from '@react-native-community/async-storage';
import { TOKEN } from '@Constant';

class ProductCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isHorizontal: this.props.type === 'HORIZONTAL',
      isLogin: false,
    };
    this.navigation = props.navigation;
    // console.log('navigation', props.navigation);
  }

  badgeColor = code => {
    switch (code.toString()) {
      case '0001': // 냉동
        return { label: 'labelBlue', border: 'blueColor' };
      case '0002': // 냉장
        return { label: 'labelGreen', border: 'greenColor' };
      case '0003': // 상온
        return { label: 'labelPrimary', border: 'primaryColor' };
      case '0004': // 위험물
        return { label: 'labelRed', border: 'redColor' };
      case '9100': // 기타
        return { label: 'labelGray', border: 'grayColor' };
      default:
        return { label: 'labelBrow', border: 'browColor' };
    }
  };

  componentDidMount () {
    AsyncStorage.getItem(TOKEN).then(v => {
      this.setState({ isLogin: v !== '' && v !== null });
    });
  }

  render () {
    let { data } = this.props;
    let { isLogin } = this.state;

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
          { height: this.state.isHorizontal ? 'auto' : 'auto' },
          this.props.isShadow && styles.shadow,
        ]}>
        <TouchableOpacity
          onPress={() =>
            isLogin
              ? this.navigation.navigate('DetailsWH', { id: data.id })
              : this.navigation.navigate('Login')
          }>
          <View
            style={[
              styles.innerWrap,
              this.state.isHorizontal && styles.innerWrapHorizon,
            ]}>
            {/** Image */}
            <View style={styles.imageWrap}>
              <View>
                <Card.Cover
                  // source={{ uri: 'https://picsum.photos/700' }}
                  source={data.thumbnail ? { uri: data.thumbnail } : cardBG}
                  style={[
                    styles.cardImage,
                    this.state.isHorizontal && styles.cardImageHorizon,
                  ]}
                />
              </View>
              {data.typeCode && data.typeCode.id.stdDetailCode !== '0001' && (
                <View
                  style={[
                    styles.badge,
                    data.badgeType,
                    {
                      backgroundColor: data.typeCode.value1
                        ? data.typeCode.value1
                        : 'rgba(0, 0, 0, 0.54)',
                    },
                  ]}>
                  <Text style={[styles.badgeLabel]}>
                    {/** 창고 멤버십 타입 */}
                    {data.typeCode.stdDetailCodeName}
                  </Text>
                </View>
              )}
            </View>

            {/** Contents */}
            <View
              style={[
                styles.contentWrap,
                this.state.isHorizontal && styles.contentWrapHorizon,
              ]}>
              {/** 창고명 */}
              <Text
                style={[
                  styles.fontColor2,
                  styles.medium,
                  styles.font14,
                  { marginBottom: 3 },
                ]}>
                {data.name}
              </Text>

              {/** 창고 유형 */}
              <Text
                style={[
                  styles.fontColor1,
                  styles.regular,
                  styles.font9,
                  styles.mrb12,
                ]}>
                {data.keep ? '보관창고' : ''}
                {data.keep && data.trust ? ', ' : ''}
                {data.trust ? '수탁창고' : ''}
              </Text>

              {/******************** Keep ***************************/}
              {data.keep && (
                <>
                  <View>
                    <Text
                      style={[styles.fontColor1, styles.regular, styles.font9]}>
                      <Text style={[styles.bold, styles.blackColor]}>보관 </Text>
                      최대 {data.keep.subTitle ? data.keep.subTitle : ''}
                    </Text>
                  </View>

                  {/* Badge */}
                  {data.keep.gdsTypeCodes && data.keep.gdsTypeCodes.length > 0 && (
                    <View style={[styles.cardAction, styles.mrt2]}>
                      {data.keep.gdsTypeCodes.map((keepItem, index) => (
                        <View
                          key={index}
                          style={[
                            styles.label,
                            styles[this.badgeColor(keepItem.stdDetailCode).label],
                          ]}
                          title={keepItem.stdDetailCodeName}>
                          <Text
                            style={[
                              styles.font9,
                              styles[
                                this.badgeColor(keepItem.stdDetailCode).border
                                ],
                            ]}>
                            {keepItem.stdDetailCodeName}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/** Price */}
                  {data.keep.splyAmount && (
                    <Text
                      style={[styles.fontColor1, styles.regular, styles.font9]}>
                      ･보관단가{' '}
                      <Text style={[styles.bold, styles.blackColor]}>
                        {data.keep.splyAmount.toLocaleString()}
                      </Text>
                      원 ~/{data.keep.unit}
                    </Text>
                  )}

                  {data.keep.mgmtChrg && (
                    <Text
                      style={[styles.fontColor1, styles.regular, styles.font9]}>
                      ･보관단가{' '}
                      <Text style={[styles.bold, styles.blackColor]}>
                        {data.keep.mgmtChrg.toLocaleString()}
                      </Text>
                      원 ~/{data.keep.unit}
                    </Text>
                  )}
                </>
              )}

              {data.keep && data.trust ? (
                <View style={styles.line} />
              ) : (
                <Text>{''}</Text>
              )}

              {/***************** Trust ************************/}
              {data.trust && (
                <>
                  <View>
                    <Text
                      style={[styles.fontColor1, styles.regular, styles.font9]}>
                      <Text
                        style={[styles.bold, styles.blackColor, styles.font9]}>
                        수탁{' '}
                      </Text>
                      최대 {data.trust.subTitle ? data.trust.subTitle : ''}
                    </Text>
                  </View>

                  {/* Badge */}
                  {data.trust.gdsTypeCodes && data.trust.gdsTypeCodes.length > 0 && (
                    <View style={[styles.cardAction, styles.mrt2]}>
                      {data.trust.gdsTypeCodes.map((trustItem, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.label,
                            styles[
                              this.badgeColor(trustItem.stdDetailCode).label
                              ],
                          ]}
                          title={trustItem.stdDetailCodeName}>
                          <Text
                            style={[
                              styles.font9,
                              styles[
                                this.badgeColor(trustItem.stdDetailCode).border
                                ],
                            ]}>
                            {trustItem.stdDetailCodeName}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/** Price */}
                  {data.whinChrg && (
                    <Text
                      style={[styles.fontColor1, styles.regular, styles.font9]}>
                      ･입고단가{' '}
                      <Text style={[styles.bold, styles.blackColor]}>
                        {data.trust.whinChrg.toLocaleString()}
                      </Text>
                      원 ~/{data.trust.unit}
                    </Text>
                  )}

                  {data.trust.whoutChrg && (
                    <Text
                      style={[styles.fontColor1, styles.regular, styles.font9]}>
                      ･출고단가{' '}
                      <Text style={[styles.bold, styles.blackColor]}>
                        {data.trust.whoutChrg.toLocaleString()}탁
                      </Text>
                      원 ~/{data.trust.unit}
                    </Text>
                  )}
                </>
              )}
            </View>
            {/* </ScrollView> */}
          </View>
        </TouchableOpacity>
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
