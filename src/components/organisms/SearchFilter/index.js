/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:37:59
 */

import React, { Component } from 'react';
import { View, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

// Local Imports
import { styles } from './style';
import ActionCreator from "@Actions";
import FilterButton from "@Components/atoms/FilterButton";
import { WarehouseSearchFilterModel } from '@Services/apis/models/warehouse';

class SearchFilter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filterScrollAnimation: new Animated.Value(0), // 필터 애니메이션.
    };
  }

  /**
   * On click filter
   * 파라미터가 없는 경우는 전체 닫기.
   * */
  _onClickFilter (type) {
    // Update filter list
    this.props.updateFilter({ type: type })

    // 추가 필터가 아닌경우만 드롭다운 애니메이션 적용.
    if (type !== 'OTHER') {
      // Filter animation
      setTimeout(() => {
        Animated.timing(
          this.state.filterScrollAnimation,
          {
            toValue: this.props.isFilterToggle ? -48 : 0,
            duration: 150
          }
        ).start();
      });
    }
  }

  /**
   * 전체 필터 초기화.
   * */
  handleResetAddFilter = () => {
    // Init store
    this.props.setSearchFilter(JSON.parse(JSON.stringify(WarehouseSearchFilterModel)));
  };

  /**
   * 보관 기간 선택 시, 표현 될 값.
   * */
  handleRenderSelectBoxValue = () => {
    if (this.props.whFilter.keepFrom || this.props.whFilter.keepTo || this.props.whFilter.trustFrom || this.props.whFilter.trustTo) {
      let keepDate = (this.props.whFilter.keepFrom || this.props.whFilter.keepTo) ? `${this.props.whFilter.keepFrom}~${this.props.whFilter.keepTo}` : ''
      let trustDate = (this.props.whFilter.trustFrom || this.props.whFilter.trustTo) ? `${this.props.whFilter.trustFrom}~${this.props.whFilter.trustTo}` : ''
      return (keepDate ? keepDate : trustDate) + (keepDate && trustDate ? '...' : '');
    } else {
      return '보관 기간';
    }
  };

  /**
   * 가격대 선택 시, 표현 될 값.
   * */
  handleRenderPriceValue = () => {
    let resultArr = []
    if (this.props.whFilter.splyAmount && this.props.whFilter.splyAmount > 0) {
      resultArr.push(`보관 ${parseFloat((this.props.whFilter.splyAmount / 10000).toFixed(1))}만`);
    }
    if (this.props.whFilter.mgmtChrg && this.props.whFilter.mgmtChrg > 0) {
      resultArr.push(`관리 ${parseFloat((this.props.whFilter.mgmtChrg / 10000).toFixed(1))}만`);
    }
    if (this.props.whFilter.whinChrg && this.props.whFilter.whinChrg > 0) {
      resultArr.push(`입고 ${parseFloat((this.props.whFilter.whinChrg / 10000).toFixed(1))}만`);
    }
    if (this.props.whFilter.whoutChrg && this.props.whFilter.whoutChrg > 0) {
      resultArr.push(`출고 ${parseFloat((this.props.whFilter.whoutChrg / 10000).toFixed(1))}만`);
    }
    if (resultArr.length > 2) {
      resultArr = resultArr.slice(0, 2)
      resultArr.push('...');
    }
    return resultArr.length > 0 ? resultArr.join(', ') : '가격대';
  }

  /**
   * 규모 선택 시, 표현될 값.
   * */
  handleRenderAreaValue = () => {
    let resultArr = []
    if (this.props.whFilter.prvtArea && this.props.whFilter.prvtArea > 0) {
      resultArr.push(`전용 ${parseFloat((this.props.whFilter.prvtArea).toFixed(1))}m²`);
    }
    if (this.props.whFilter.cmnArea && this.props.whFilter.cmnArea > 0) {
      resultArr.push(`공용 ${parseFloat((this.props.whFilter.cmnArea).toFixed(1))}m²`);
    }
    if (resultArr.length > 1) {
      resultArr = resultArr.slice(0, 1)
      resultArr.push('...')
    }
    return resultArr.length > 0 ? resultArr.join(', ') : '규모';
  }


  render () {
    return (
      <View style={styles.container}>

        {/** Animation view */}
        <Animated.View style={{
          // zIndex: 10,
          transform: [
            { translateY: this.state.filterScrollAnimation }
          ]
        }}>

          {/** Scroll View for Filter */}
          <View style={styles.scrollViewWrap}>
            <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollView}>

              {/** Filter List */}
              {this.props.filterList.map((originEl, originIndex) =>
                <FilterButton key={originIndex}
                              onPress={() => this._onClickFilter(originEl.type)}
                              label={originEl.label}
                              isToggle={originEl.toggle}>
                  {/** 창고유형 */}
                  {originEl.type === 'WAREHOUSE' &&
                  <Text>
                    {this.props.whFilter.typeCodes ? (
                      this.props.filterCodes.listTypeCodes.reduce((pre, item) => {
                        if (this.props.whFilter.typeCodes.indexOf(item.value) > -1) {
                          pre.push(item.name);
                        }
                        return pre;
                      }, []).join(', ')
                    ) : originEl.label}
                  </Text>}

                  {/** 보관 유형 */}
                  {originEl.type === 'STORAGE' &&
                  <Text>
                    {this.props.whFilter.gdsKeepTypeCodes ? (
                      this.props.filterCodes.listGdsTypeCode.reduce((pre, item) => {
                        // 셀렉트 박스에 모두 표현하기 어렵기 때문에 2개까지만 표시.
                        if (pre.length < 3 && this.props.whFilter.gdsKeepTypeCodes.indexOf(item.stdDetailCode) > -1) {
                          pre.push(item.stdDetailCodeName);
                          // 2개 보다 많으면 '...' 표시
                          if (pre.length > 2) {
                            pre[2] = '...';
                          }
                        }
                        return pre;
                      }, []).join(', ')
                    ) : originEl.label}
                  </Text>}

                  {/** 보관 기간 */}
                  {originEl.type === 'PERIOD' &&
                  <Text>{this.handleRenderSelectBoxValue()}</Text>}

                  {/** 가격대 */}
                  {originEl.type === 'PRICE' &&
                  <Text>{this.handleRenderPriceValue()}</Text>}

                  {/** 규모 */}
                  {originEl.type === 'SCALE' &&
                  <Text>{this.handleRenderAreaValue()}</Text>}

                  {/** 추가필터 */}
                  {originEl.type === 'OTHER' &&
                  <Text>{'추가 필터'}</Text>}

                </FilterButton>)}
            </ScrollView>
          </View>

          {/** Reset Button */}
          <TouchableOpacity style={styles.reset}
                            onPress={this.handleResetAddFilter}>
            <Icon name={'autorenew'} style={styles.resetIcon} />
          </TouchableOpacity>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                          colors={['rgba(255,255,255,0)', '#fff']}
                          style={styles.linearGradient} />

        </Animated.View>

      </View>
    );
  }
}


// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    isFilterToggle: state.search.isFilterToggle,
    filterList: state.search.filterList,
    filterCodes: state.search.filterCodes,
    whFilter: state.search.whFilter,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {
    updateFilter: status => {
      dispatch(ActionCreator.updateFilter(status));
    },
    setSearchFilter: status => {
      dispatch(ActionCreator.setSearchFilter(status));
    },
  };
}

// Check Props Type.
SearchFilter.protoType = {};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
), withTheme)(SearchFilter);
