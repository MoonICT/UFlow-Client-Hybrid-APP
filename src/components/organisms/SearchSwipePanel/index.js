/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:37:38
 * [닫힘] 패널이 열릴 때, 현재 필터 데이터로 리스트를 갱신한다.
 * [열림] 필터 데이터가 변경 될 때, 리스트를 갱신한다.
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Platform, Animated } from 'react-native';
import { withTheme, } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Modalize } from 'react-native-modalize';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIphoneX, getBottomSpace } from 'react-native-iphone-x-helper';

// Local Imports
import { styles } from './style';
import { WhrgSearch, WarehouseRecommend } from '@Services/apis';
import Alert from '@Components/atoms/Alert';
import Progress from '@Components/organisms/Progress';
import ProductCard from '@Components/organisms/ProductCard';

const status = getStatusBarHeight(true);

class SearchSwipePanel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      accordionAnimation: new Animated.Value(0), // 추천창고 아코디 애니메이션.
      isOpen: false,
      isOpenRecommend: false,
      WHRecommendList: [],
      isProgress: false, // 목록 로딩.
      WHList: [],
      pageInfo: null,
    };
    this.navigation = props.navigation;
    // Ref
    this.sheetRef = React.createRef();

    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  /**
   * 목로 Swiper 변경 시 호출.
   * */
  _onChange = position => {
    console.log('Change Bottom Sheet !!!', position);
    if (position === 'top') {
      // 패널이 열릴 때, 최초 목록 불러오기.
      this.requestWhList(false);
    } else {
      this.setState({ WHList: [] })
    }
    // 패널 열림 상태.
    this.setState({ isOpen: position === 'top' });
  };

  /**
   * 창고 조회 ( 스토어 필터 적용 )
   * */
  requestWhList = async isMore => {
    this.setState({ isProgress: true });
    let filter = this.props.whFilter;
    filter.page = isMore ? this.state.pageInfo.number + 1 : 0; // page more
    await WhrgSearch.pageSearchWhrg(filter)
      .then(res => {
        let array = this.state.WHList;
        if (isMore) {
          array = array.concat(res._embedded && res._embedded.warehouses ? res._embedded.warehouses : [],);
        } else {
          array = res._embedded && res._embedded.warehouses ? res._embedded.warehouses : [];
        }
        this.setState({
          WHList: array,
          pageInfo: res.page,
          isProgress: false,
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  /**
   * 추천 차아고 토글.
   * */
  toggleRecommendWH = () => {

    Animated.timing(
      this.state.accordionAnimation,
      {
        toValue: this.state.isOpenRecommend ? 0 : 1,
        duration: this.state.isOpenRecommend ? 10 : 500
      }
    ).start();
    this.setState({ isOpenRecommend: !this.state.isOpenRecommend });
  }

  /**
   * 스크롤 이벤트
   * */
  handleOnScroll = (e) => {
    let paddingToBottom = 40;
    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
    // console.log(Math.floor(paddingToBottom) + "-" + Math.floor(e.nativeEvent.contentOffset.y) + "-" + Math.floor(e.nativeEvent.contentSize.height));
    if (e.nativeEvent.contentOffset.y + paddingToBottom >= e.nativeEvent.contentSize.height) {
      // 데이터 요청 중일 때는 실행 되지 않게 처리.
      if (!this.state.isProgress && this.state.pageInfo.number < (this.state.pageInfo.totalPages - 1)) {
        this.requestWhList(true);
      }
    }
  };

  render () {
    let height = Math.round(Dimensions.get('window').height);
    if (Platform.OS === 'ios') {
      const naviHeight = 54;
      const filterHeight = 48 * 2;
      if (isIphoneX()) {
        height =
          Dimensions.get('window').height -
          status -
          getBottomSpace() -
          naviHeight -
          filterHeight;
      } else {
        height =
          Dimensions.get('window').height - status - naviHeight - filterHeight;
      }
    }
    return (
      <>
        <Modalize
          ref={this.sheetRef}
          handlePosition={'inside'}
          modalHeight={height}
          alwaysOpen={30}
          onPositionChange={position => {
            this._onChange(position);
          }}
          handleStyle={styles.sheetHandleBar}
          childrenStyle={styles.sheetContent}
          scrollViewProps={{
            scrollEventThrottle: 16,
            onScroll: this.handleOnScroll
          }}
        >
          {/** 목록 스크롤 뷰 */}
          <ScrollView>

            <View style={{ paddingHorizontal: 16 }}>
              <TouchableOpacity onPress={this.toggleRecommendWH}>
                <Alert
                  type={'INFO'}
                  iconName={this.state.isOpenRecommend ? 'chevron-up' : 'chevron-down'}
                  content={'UFLOW 추천 창고 보기'}
                  onPress={this.toggleRecommendWH}
                />
              </TouchableOpacity>
            </View>

            {/** 추천 창고 목록 */}
            <Animated.View style={{
              opacity: this.state.accordionAnimation,
              height: this.state.isOpenRecommend ? 'auto' : 0,
            }}>
              <View style={{ marginBottom: 28, }}>
                <View style={styles.divider} />
                {this.state.WHRecommendList.map((item, index) =>
                  <View key={index} style={{ paddingHorizontal: 16, }}>
                    <ProductCard navigation={this.props.navigation} data={item} isShadow={false} type={'HORIZONTAL'} />
                    {this.state.WHRecommendList.length - 1 !== index && <View style={styles.divider} />}
                  </View>
                )}
              </View>
            </Animated.View>

            <View style={{ paddingHorizontal: 16 }}>
              <Text
                style={styles.counterText}>{`창고 목록 총 ${this.state.pageInfo ? this.state.pageInfo.totalElements.toString().toLocaleString() : 0}개`}</Text>
            </View>

            {/** 목록 없음. */}
            {(this.state.WHList.length === 0 && !this.state.isProgress) &&
            <Text style={styles.emptyText}>검색된 창고가 없습니다.</Text>}

            {/** 목록 */}
            <View style={styles.divider} />
            {this.state.WHList.map((item, index) =>
              <View key={index} style={{ paddingHorizontal: 16, paddingBottom: 16, }}>
                <ProductCard navigation={this.props.navigation} data={item} isShadow={false} type={'HORIZONTAL'} />
                {this.state.WHList.length - 1 !== index && <View style={styles.divider} />}
              </View>
            )}

            {/** 로딩 */}
            {this.state.isProgress && <Progress />}

          </ScrollView>
        </Modalize>
      </>
    );
  }

  async componentDidMount () {
    // console.log('::: componentDidMount : 검색 목록 :::');

    // UFLOW 추천 창고
    await WarehouseRecommend.recommendWarehouse().then(res => {
      this.setState({
        WHRecommendList: res._embedded && res._embedded.warehouses ? res._embedded.warehouses : []
      });
    });
  }

  색

  // 컴포넌트 업데이트 직후 호출.
  componentDidUpdate (prevProps, prevState) {
    // console.log('::: componentDidUpdate : 검색 목록 :::', prevProps.whFilter);
    // Props(Redux state) 변경 될 때 호출.
    // 패널이 열려 있을 때만 목록을 갱신한다.
    if (this.state.isOpen && prevProps.whFilter !== this.props.whFilter) {
      this.requestWhList(false);
    }
  }
}

// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps[창고목록] : ', state);
  return {
    whFilter: state.search.whFilter,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {};
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withTheme,
)(SearchSwipePanel);
