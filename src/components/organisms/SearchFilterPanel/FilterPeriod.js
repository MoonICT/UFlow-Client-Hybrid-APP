/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:29:21
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { withTheme, Text, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

// Local Imports
import { styles } from './style';
import ActionCreator from "@Actions";
import DateTimePickerModal from "react-native-modal-datetime-picker";

class FilterPeriod extends Component {
  constructor (props) {
    super(props);
    this.state = {
      period: 6,
      // 캘린더 오픈 토글.
      isKeepFrom: false,
      isKeepTo: false,
      isTrustFrom: false,
      isTrustTo: false
    };
  }

  /**
   *  필터 닫기.
   *  */
  _onClickCancel () {
    // 취소 시, 값 초기화.
    this.props.setSearchFilter({
      keepFrom: '',
      keepTo: '',
      trustFrom: '',
      trustTo: '',
    });
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
    return (
      <View style={styles.filterContainer}>

        {/** Label */}
        <View style={styles.filterLabelWrap}>
          <View style={styles.filterLabelWrap}>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'임대 가능 기간'}</Text>
          </View>
        </View>

        {/** Date */}
        <View style={{
          marginBottom: 24,
          flexDirection: 'row',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          <View style={{ width: '48%', position: 'relative' }}>
            <Button
              mode="outlined"
              style={styles.btnDefaultOutline}
              color="rgba(0, 0, 0, 0.76)"
              onPress={() => this.setState({ isKeepFrom: true })}>
              {this.props.whFilter.keepFrom ? moment(this.props.whFilter.keepFrom).format('YYYY-MM-DD') : 'YYYY-MM-DD'}
            </Button>
            <DateTimePickerModal
              mode="date"
              isVisible={this.state.isKeepFrom}
              date={this.props.whFilter.keepFrom ? moment(this.props.whFilter.keepFrom).toDate() : new Date()}
              onConfirm={(date) => {
                this.props.setSearchFilter({
                  keepFrom: moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : '',
                });
                this.setState({ isKeepFrom: false });
              }}
              onCancel={() => {
                this.setState({ isKeepFrom: false });
              }}
            />
          </View>
          <View style={{ width: '4%', justifyContent: 'center', alignItems: 'center', height: 37 }}>
            <Text>-</Text>
          </View>
          <View style={{ width: '48%', }}>
            <Button
              mode="outlined"
              style={styles.btnDefaultOutline}
              color="rgba(0, 0, 0, 0.76)"
              onPress={() => this.setState({ isKeepTo: true })}>
              {this.props.whFilter.keepTo ? moment(this.props.whFilter.keepTo).format('YYYY-MM-DD') : 'YYYY-MM-DD'}
            </Button>
            <DateTimePickerModal
              mode="date"
              isVisible={this.state.isKeepTo}
              date={this.props.whFilter.keepTo ? moment(this.props.whFilter.keepTo).toDate() : new Date()}
              onConfirm={(date) => {
                this.props.setSearchFilter({
                  keepTo: moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : '',
                });
                this.setState({ isKeepTo: false });
              }}
              onCancel={() => {
                this.setState({ isKeepTo: false });
              }}
            />
          </View>
        </View>

        {/** Label */}
        <View style={styles.filterLabelWrap}>
          <View style={styles.filterLabelWrap}>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'수탁 가능 기간'}</Text>
          </View>
        </View>

        {/** Date */}
        <View style={{
          marginBottom: 24,
          flexDirection: 'row',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          <View style={{ width: '48%', position: 'relative' }}>
            <Button
              mode="outlined"
              style={styles.btnDefaultOutline}
              color="rgba(0, 0, 0, 0.76)"
              onPress={() => this.setState({ isTrustFrom: true })}>
              {this.props.whFilter.trustFrom ? moment(this.props.whFilter.trustFrom).format('YYYY-MM-DD') : 'YYYY-MM-DD'}
            </Button>
            <DateTimePickerModal
              mode="date"
              isVisible={this.state.isTrustFrom}
              date={this.props.whFilter.trustFrom ? moment(this.props.whFilter.trustFrom).toDate() : new Date()}
              onConfirm={(date) => {
                this.props.setSearchFilter({
                  trustFrom: moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : '',
                });
                this.setState({ isTrustFrom: false });
              }}
              onCancel={() => {
                this.setState({ isTrustFrom: false });
              }}
            />
          </View>
          <View style={{ width: '4%', justifyContent: 'center', alignItems: 'center', height: 37 }}>
            <Text>-</Text>
          </View>
          <View style={{ width: '48%', }}>
            <Button
              mode="outlined"
              style={styles.btnDefaultOutline}
              color="rgba(0, 0, 0, 0.76)"
              onPress={() => this.setState({ isTrustTo: true })}>
              {this.props.whFilter.trustTo ? moment(this.props.whFilter.trustTo).format('YYYY-MM-DD') : 'YYYY-MM-DD'}
            </Button>
            <DateTimePickerModal
              mode="date"
              isVisible={this.state.isTrustTo}
              date={this.props.whFilter.trustTo ? moment(this.props.whFilter.trustTo).toDate() : new Date()}
              onConfirm={(date) => {
                this.props.setSearchFilter({
                  trustTo: moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : '',
                });
                this.setState({ isTrustTo: false });
              }}
              onCancel={() => {
                this.setState({ isTrustTo: false });
              }}
            />
          </View>
        </View>


        {/** Button Group */}
        <View style={styles.gridRow}>
          <View style={styles.gridColumn}>
            <Button mode="outlined"
                    style={[styles.btn, styles.btnPrimaryOutline]}
                    labelStyle={[styles.btnLabel]}
                    onPress={() => this._onClickCancel()}>취소하기</Button>
          </View>
          <View style={styles.gridColumn}>
            <Button mode="contained"
                    style={[styles.btn, styles.btnPrimary]}
                    labelStyle={[styles.btnLabel, styles.btnLabelPrimary]}
                    onPress={() => this._onClickApply()}>적용하기</Button>
          </View>
        </View>
      </View>
    );
  }

  componentWillUnmount () {
    //console.log('//::componentWillUnmount::');
  }

  componentDidMount () {
  }
}


// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    whFilter: state.search.whFilter,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {
    setSearchFilter: status => {
      dispatch(ActionCreator.setSearchFilter(status));
    },
  };
}

// Check Props Type.
FilterPeriod.protoType = {
  onClosed: PropTypes.func,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(FilterPeriod);
