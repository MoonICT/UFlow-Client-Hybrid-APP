/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:37:38
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { withTheme, } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Modalize } from 'react-native-modalize';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";

// Local Imports
import { styles } from './style';
import ActionCreator from "@Actions";
import { WhrgSearch } from '@Services/apis';
import Alert from '@Components/atoms/Alert';
import ProductCard from '@Components/organisms/ProductCard';

const status = getStatusBarHeight(true);

class SearchSwipePanel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isProgress: false,
      WHList: [],
      pageInfo: null,
    };
    // Ref
    this.sheetRef = React.createRef();
  }

  /**
   * 목로 Swiper 변경 시 호출.
   * */
  _onChange = (position) => {
    console.log('Change Bottom Sheet !!!', position);
    if (position === 'top') {
      // TODO 목록 갱신.
      this.requestWhList(false);
    }
  };

  /**
   * 창고 조회 ( 스토어 필터 적용 )
   * */
  requestWhList = async (isMore) => {
    this.setState({ isProgress: true })
    let filter = this.props.whFilter
    filter.page = isMore ? this.state.pageInfo.number + 1 : 0; // page more
    await WhrgSearch.pageSearchWhrg(filter).then(res => {
      let array = this.state.WHList
      if (isMore) {
        array = array.concat(res._embedded && res._embedded.warehouses ? res._embedded.warehouses : [])
      } else {
        array = res._embedded && res._embedded.warehouses ? res._embedded.warehouses : []
        // 스크롤 상단 이동.
        // handleTopScroll()
      }
      this.setState({
        WHList: array,
        pageInfo: res.page,
        isProgress: false
      });
    }).catch(err => {
      console.log(err.response.data);
    });
  }

  render () {
    let height = Math.round(Dimensions.get('window').height)
    if (Platform.OS === 'ios') {
      const naviHeight = 54;
      const filterHeight = 48 * 2;
      if (isIphoneX()) {
        height = Dimensions.get("window").height - status - getBottomSpace() - naviHeight - filterHeight;
      } else {
        height = Dimensions.get("window").height - status - naviHeight - filterHeight;
      }
    }
    console.log('높이', height)
    return (
      <>
        <Modalize ref={this.sheetRef}
                  handlePosition={'inside'}
                  modalHeight={height}
                  alwaysOpen={30}
                  onPositionChange={(position) => {
                    this._onChange(position);
                  }}
                  handleStyle={styles.sheetHandleBar}
                  childrenStyle={styles.sheetContent}>

          {/** 목록 스크롤 뷰 */}
          <ScrollView>
            <View style={{ paddingHorizontal: 16, }}>
              <Text style={styles.counterText}>{'창고 목록 총 1,400개'}</Text>
              <Alert
                type={'INFO'}
                buttonText={'확인'}
                content={'이 지역 UFLOW 추천 광고 보기'}
                onPress={() => {
                  alert('추천광고 목록');
                }}
              />
            </View>

            {/** 목록 */}
            <View style={styles.divider} />
            {this.state.WHList.map((item, index) =>
              <View key={index} style={{ paddingHorizontal: 16, }}>
                <TouchableOpacity onPress={() => {
                  alert(item.name);
                }}>
                  <ProductCard data={item} isShadow={false} type={'HORIZONTAL'} />
                </TouchableOpacity>
                <View style={styles.divider} />
              </View>
            )}
          </ScrollView>
        </Modalize>
      </>
    );
  }

  async componentDidMount () {
    console.log('::: Did Mounted : 검색 목록 :::');
  }
}


// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  console.log('++++++mapStateToProps: ', state);
  return {
    whFilter: state.search.whFilter,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {};
}

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(SearchSwipePanel);
