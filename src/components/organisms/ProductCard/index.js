/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-16 16:42:35
 * @modify date 2020-11-16 18:38:08
 * @desc [description]
 */

import React, {Component} from 'react';
import {View, Text, Alert, Button, TouchableOpacity} from 'react-native';

// Local Imports
import {styles} from './style';
import {Card} from 'react-native-paper';
import cardBG from '@Assets/images/card-img.png';

class ProductCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {data} = this.props;
    if (data === undefined) {
      data = {
        img: cardBG,
        type: '보관창고',
        title: '과천동 상온 50평',
        price: '12,345평',
        address: '경기도 화천시 부평읍',
        totalPrice: '60,000원/평',
      };
    }

    return (
      <Card style={styles.container}>
        <Card.Cover source={data.img} style={styles.cardImage} />
        {/**{uri: 'https://picsum.photos/700'} */}
        <View style={styles.content}>
          <Text style={[styles.typeTitle, styles.regular, styles.font9]}>
            {data.type}
          </Text>
          <Text style={[styles.titleType, styles.medium, styles.font14]}>
            {data.title}
          </Text>
          <View style={styles.cardAction}>
            <TouchableOpacity
              style={[styles.cardActionTypeBTN]}
              onPress={() => Alert.alert('상온')}
              title={'상온'}>
              <Text style={[styles.font9, styles.defaultColor]}>상온</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // mode="outlined"
              style={[styles.cardActionTypeBTN, styles.blueActionBTN]}
              onPress={() => Alert.alert('냉동')}
              title={'냉동'}>
              <Text style={[styles.font9, styles.blueColor]}>냉동</Text>
            </TouchableOpacity>

            <TouchableOpacity
              // mode="outlined"
              style={[styles.cardActionTypeBTN, styles.greenActionBTN]}
              onPress={() => Alert.alert('냉장')}
              title={'냉장'}>
              <Text style={[styles.font9, styles.greenColor]}>냉장</Text>
            </TouchableOpacity>

            <TouchableOpacity
              // mode="outlined"
              style={[styles.cardActionTypeBTN, styles.grayActionBTN]}
              onPress={() => Alert.alert('보세')}
              title={'보세'}>
              <Text style={[styles.font9, styles.grayActionBTN]}>냉장</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.contentTitle, styles.regular, styles.font9]}>
            {data.price}
          </Text>
          <Text style={[styles.contentTitle, styles.regular, styles.font9]}>
            {data.address}
          </Text>
          <Text
            style={[styles.contentBottomTitle, styles.medium, styles.font14]}>
            {data.totalPrice}
          </Text>
        </View>
        {/* <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions> */}
      </Card>
      // );
    );
  }
}

export default ProductCard;
