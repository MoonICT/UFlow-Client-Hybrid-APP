/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:37:59
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { withTheme, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

// Local Imports
import { styles } from './style';
import ActionCreator from "@Actions";
import FilterButton from "@Components/atoms/FilterButton";

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
                              isToggle={originEl.toggle} />)}
            </ScrollView>
          </View>

          {/** Reset Button */}
          <TouchableOpacity style={styles.reset}
                            onPress={() => {
                              alert('펄터 초기화.');
                            }}>
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
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {
    updateFilter: status => {
      dispatch(ActionCreator.updateFilter(status));
    },
  };
}

// Check Props Type.
SearchFilter.protoType = {
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
), withTheme)(SearchFilter);
