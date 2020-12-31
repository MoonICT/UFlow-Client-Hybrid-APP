/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-16 16:42:35
 * @modify date 2020-12-31 16:13:15
 * @desc [description]
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

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
          { height: this.state.isHorizontal ? 124 : '100%' },
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
                {data?.trust ? '가맹창고' : '제휴창고'}
              </Text>
            </View>
          </View>

          <ScrollView>
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
              {data?.keep ? (
                <>
                  <View>
                    <Text
                      style={[styles.fontColor1, styles.regular, styles.font9]}>
                      <Text style={[styles.bold, styles.blackColor]}>
                        보관{' '}
                      </Text>
                      최대 {data?.keep?.subTitle ? data?.keep?.subTitle : ''}
                    </Text>
                  </View>

                  {/* Badge */}
                  {data.keep.gdsTypeCodes ? (
                    <View style={[styles.cardAction, styles.mrt2]}>
                      {data.keep.gdsTypeCodes.map((keepItem, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.label,
                            styles[
                              this.badgeColor(keepItem?.stdDetailCode).label
                            ],
                          ]}
                          title={keepItem?.stdDetailCodeName}>
                          <Text
                            style={[
                              styles.font9,
                              styles[
                                this.badgeColor(keepItem?.stdDetailCode).border
                              ],
                            ]}>
                            {/* EX : 상온 */}
                            {keepItem?.stdDetailCodeName}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <Text>{''}</Text>
                  )}

                  {/** Price */}
                  {data?.keep?.splyAmount ? (
                    <Text
                      style={[styles.fontColor1, styles.regular, styles.font9]}>
                      ･보관단가{' '}
                      <Text style={[styles.bold, styles.blackColor]}>
                        {data?.keep?.splyAmount.toLocaleString()}
                      </Text>
                      원 ~/
                      {data?.keep?.unit}
                    </Text>
                  ) : (
                    <Text>{''}</Text>
                  )}

                  {data?.keep?.mgmtChrg ? (
                    <Text
                      style={[styles.fontColor1, styles.regular, styles.font9]}>
                      ･보관단가{' '}
                      <Text style={[styles.bold, styles.blackColor]}>
                        {data?.keep?.mgmtChrg.toLocaleString()}
                      </Text>
                      원 ~/
                      {data?.keep?.unit}
                    </Text>
                  ) : (
                    <Text>{''}</Text>
                  )}
                  {/** Close Price */}
                  {/*============== */}
                </>
              ) : (
                <Text>{''}</Text>
              )}

              {data?.keep && data?.trust ? (
                <View style={styles.line} />
              ) : (
                <Text>{''}</Text>
              )}

              {/***************** Trust ************************/}
              {data?.trust ? (
                <>
                  <View>
                    <Text
                      style={[styles.fontColor1, styles.regular, styles.font9]}>
                      <Text
                        style={[styles.bold, styles.blackColor, styles.font9]}>
                        보관{' '}
                      </Text>
                      최대 {data?.trust?.subTitle ? data?.trust?.subTitle : ''}
                    </Text>
                  </View>

                  {/* Badge */}
                  {data.trust.gdsTypeCodes ? (
                    <View style={[styles.cardAction, styles.mrt2]}>
                      {data.trust.gdsTypeCodes.map((trustItem, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.label,
                            styles[
                              this.badgeColor(trustItem?.stdDetailCode).label
                            ],
                          ]}
                          title={trustItem?.stdDetailCodeName}>
                          <Text
                            style={[
                              styles.font9,
                              styles[
                                this.badgeColor(trustItem?.stdDetailCode).border
                              ],
                            ]}>
                            {/* EX : 상온 */}
                            {trustItem?.stdDetailCodeName}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <Text>{''}</Text>
                  )}

                  {/** Price */}
                  {data?.trust?.whinChrg ? (
                    <Text
                      style={[styles.fontColor1, styles.regular, styles.font9]}>
                      ･보관단가{' '}
                      <Text style={[styles.bold, styles.blackColor]}>
                        {data?.trust?.whinChrg.toLocaleString()}
                      </Text>
                      원 ~/
                      {data?.trust?.unit}
                    </Text>
                  ) : (
                    <Text>{''}</Text>
                  )}

                  {data?.trust?.whoutChrg ? (
                    <Text
                      style={[styles.fontColor1, styles.regular, styles.font9]}>
                      ･보관단가{' '}
                      <Text style={[styles.bold, styles.blackColor]}>
                        {data?.trust?.whoutChrg.toLocaleString()}
                      </Text>
                      원 ~/
                      {data?.trust?.unit}
                    </Text>
                  ) : (
                    <Text>{''}</Text>
                  )}
                  {/** Close Price */}
                  {/*============================================================== */}
                </>
              ) : (
                <Text>{''}</Text>
              )}
            </View>
          </ScrollView>
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
