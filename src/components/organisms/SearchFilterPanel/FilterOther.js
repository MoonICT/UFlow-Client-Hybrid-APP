/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { withTheme, Text, Appbar, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Local Imports
import { styles } from './style';
import DefaultStyle from '@Styles/default';
import ActionCreator from "@Actions";
import Appbars from '@Components/organisms/AppBar';
import RangeSlider from '@Components/atoms/RangeSlider';
import Checkbox from '@Components/atoms/Checkbox';

class FilterOther extends Component {
  constructor (props) {
    super(props);
    this.state = {
      areaLand: 0,
      areaBuilding: 0,
      areaTotal: 0,
      floorHeight: 0,
      listFloor: [
        { label: '전체', checked: true, },
        { label: '1층', checked: false, },
        { label: '2층', checked: false, },
        { label: '3층', checked: false, },
        { label: '4층', checked: false, },
        { label: '5층', checked: false, },
        { label: '6층', checked: false, },
        { label: '7층 이상', checked: false, },
      ],
      listYear: [
        { label: '전체', checked: true, },
        { label: '1년 이내', checked: false, },
        { label: '5년 이내', checked: false, },
        { label: '10년 이내', checked: false, },
        { label: '15년 이내', checked: false, },
        { label: '15년 이상', checked: false, },
      ],
      listMethods: [
        { label: '40FT 컨테이너', checked: true, },
        { label: '20FT 컨테이너', checked: false, },
        { label: '5톤 화물차', checked: false, },
        { label: '화물EV', checked: false, },
        { label: '수직반송기', checked: false, },
      ],
      listInsurance: [
        { label: '건물보험', checked: true, },
        { label: '재고보험', checked: false, },
        { label: '영업배상보험', checked: false, },
      ],

    };
  }

  /**
   *  필터 닫기.
   *  */
  _onClickCancel () {
    this.props.onClosed(); // Event emit
  }

  /**
   *  필터 적용.
   *  */
  _onClickApply () {
    // TODO 변경 필터는 스토어에 반영.
    this.props.onClosed(); // Event emit
  }

  render () {
    let filterPanel = null;
    return (
      <View style={[styles.filterOtherContainer]}>

        {/** Header */}
        <Appbars style={styles.filterOtherHeader}>
          <TouchableOpacity onPress={() => this._onClickCancel()}>
            <Appbar.Action
              icon="close"
              color="rgba(0, 0, 0, 1)"
            />
          </TouchableOpacity>
          <Appbar.Content
            title="추가 필터"
            color="rgba(0, 0, 0, 0.76)"
            titleStyle={styles.filterOtherHeaderTitle}
            style={[DefaultStyle.headerTitle, styles.filterOtherHeaderContainer]}
          />
          <TouchableOpacity onPress={() => alert('초기화')}>
            <Text style={styles.filterOtherHeaderSubTitle}>초기화</Text>
          </TouchableOpacity>
        </Appbars>

        <ScrollView style={styles.filterOtherScroll}>

          {/***** 대지면적  *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'대지면적'}</Text>
            </View>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>
              {(this.state.areaLand === 30000 || this.state.areaLand === 0) ? '전체' : this.state.areaLand.toLocaleString() + '㎡'}
            </Text>
          </View>

          {/** Slider */}
          <RangeSlider value={this.state.areaLand}
                       step={100}
                       minimumValue={0}
                       maximumValue={30000}
                       LabelMiddle={'15,000㎡ (4,500평)'}
                       contentStyle={{ marginBottom: 24 }}
                       onValueChange={(value) => {
                         this.setState({ areaLand: value });
                       }} />

          <View style={styles.filterDivider}></View>

          {/***** 건축면적 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'건축면적'}</Text>
            </View>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>
              {(this.state.areaBuilding === 30000 || this.state.areaBuilding === 0) ? '전체' : this.state.areaBuilding.toLocaleString() + '㎡'}
            </Text>
          </View>
          {/** Slider */}
          <RangeSlider value={this.state.areaBuilding}
                       step={100}
                       minimumValue={0}
                       maximumValue={30000}
                       LabelMiddle={'15,000㎡ (4,500평)'}
                       contentStyle={{ marginBottom: 24 }}
                       onValueChange={(value) => {
                         this.setState({ areaBuilding: value });
                       }} />

          <View style={styles.filterDivider}></View>

          {/***** 연면적 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'연면적'}</Text>
            </View>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>
              {(this.state.areaTotal === 30000 || this.state.areaTotal === 0) ? '전체' : this.state.areaTotal.toLocaleString() + '㎡'}
            </Text>
          </View>
          {/** Slider */}
          <RangeSlider value={this.state.areaTotal}
                       step={100}
                       minimumValue={0}
                       maximumValue={30000}
                       LabelMiddle={'15,000㎡ (4,500평)'}
                       contentStyle={{ marginBottom: 24 }}
                       onValueChange={(value) => {
                         this.setState({ areaTotal: value });
                       }} />

          <View style={styles.filterDivider}></View>

          {/***** 층수 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'층수'}</Text>
            </View>
          </View>

          {/** Checkbox */}
          <View style={styles.gridRow}>
            {this.state.listFloor.map((item, index) =>
              <View style={[styles.filterCheckWrap, styles.gridColumn]} key={index}>
                <Checkbox checked={item.checked}
                          label={item.label}
                          onPress={() => {
                            this.setState(defaultState => ({
                              ...defaultState,
                              checkList: defaultState.checkList.map((r, i) => {
                                return {
                                  ...defaultState.checkList[i],
                                  checked: i === index ? !defaultState.checkList[i].checked : defaultState.checkList[i].checked
                                };
                              })
                            }));
                          }} /></View>)}
          </View>

          <View style={styles.filterDivider}></View>


          {/***** 층고 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'층고'}</Text>
            </View>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>
              {(this.state.floorHeight === 10 || this.state.floorHeight === 0) ? '전체' : this.state.floorHeight.toLocaleString() + 'm'}
            </Text>
          </View>
          {/** Slider */}
          <RangeSlider value={this.state.floorHeight}
                       step={1}
                       minimumValue={0}
                       maximumValue={10}
                       LabelMiddle={'5m'}
                       contentStyle={{ marginBottom: 24 }}
                       onValueChange={(value) => {
                         this.setState({ floorHeight: value });
                       }} />

          <View style={styles.filterDivider}></View>

          {/***** 준공연차 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'준공연차'}</Text>
            </View>
          </View>

          {/** Checkbox */}
          <View style={styles.gridRow}>
            {this.state.listYear.map((item, index) =>
              <View style={[styles.filterCheckWrap, styles.gridColumn]} key={index}>
                <Checkbox checked={item.checked}
                          label={item.label}
                          onPress={() => {
                            this.setState(defaultState => ({
                              ...defaultState,
                              checkList: defaultState.checkList.map((r, i) => {
                                return {
                                  ...defaultState.checkList[i],
                                  checked: i === index ? !defaultState.checkList[i].checked : defaultState.checkList[i].checked
                                };
                              })
                            }));
                          }} /></View>)}
          </View>

          <View style={styles.filterDivider}></View>

          {/***** 접안방식 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'접안방식'}</Text>
            </View>
          </View>

          {/** Checkbox */}
          <View style={styles.gridRow}>
            {this.state.listMethods.map((item, index) =>
              <View style={[styles.filterCheckWrap, styles.gridColumn]} key={index}>
                <Checkbox checked={item.checked}
                          label={item.label}
                          onPress={() => {
                            this.setState(defaultState => ({
                              ...defaultState,
                              checkList: defaultState.checkList.map((r, i) => {
                                return {
                                  ...defaultState.checkList[i],
                                  checked: i === index ? !defaultState.checkList[i].checked : defaultState.checkList[i].checked
                                };
                              })
                            }));
                          }} /></View>)}
          </View>

          <View style={styles.filterDivider}></View>

          {/***** 보험가입 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'보험가입'}</Text>
            </View>
          </View>

          {/** Checkbox */}
          <View style={styles.gridRow}>
            {this.state.listInsurance.map((item, index) =>
              <View style={[styles.filterCheckWrap, styles.gridColumn]} key={index}>
                <Checkbox checked={item.checked}
                          label={item.label}
                          onPress={() => {
                            this.setState(defaultState => ({
                              ...defaultState,
                              checkList: defaultState.checkList.map((r, i) => {
                                return {
                                  ...defaultState.checkList[i],
                                  checked: i === index ? !defaultState.checkList[i].checked : defaultState.checkList[i].checked
                                };
                              })
                            }));
                          }} /></View>)}
          </View>

          <View style={{ marginBottom: 40, }}>
            <Button mode="contained"
                    style={[styles.btn, styles.btnPrimary]}
                    labelStyle={[styles.btnLabel, styles.btnLabelPrimary, styles.filterOtherBtn]}
                    onPress={() => this._onClickApply()}>적용하기</Button>
          </View>

        </ScrollView>
      </View>
    );
  }

  componentWillUnmount () {
    console.log('::componentWillUnmount::');
  }

  // 컴포넌트 업데이트 직후 호출.
  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  componentDidMount () {
  }
}


// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  console.log('++++++mapStateToProps: ', state);
  return {
    isFilterToggle: state.search.isFilterToggle,
    filterList: state.search.filterList,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {};
}

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(FilterOther);
