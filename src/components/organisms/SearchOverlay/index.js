/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:37:45
 */

import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Searchbar, List, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Highlighter from 'react-native-highlight-words';
import { WhrgSearch } from "@Services/apis";
import DefaultStyle from '@Styles/default';
import Progress from '@Components/organisms/Progress';
import { debounce } from "lodash";

// Local Imports
import { styles } from './style';
import ActionCreator from "@Actions";
import PropTypes from "prop-types";

class SearchOverlay extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: '', // 검색 쿼리
      isProgress: false,  // 검색 로딩
      searchAddress: [], // 검색결과(지역)
      searchWarehouse: [], // 검색결과(창고)
    };
  }

  /**
   * Debounce Utils
   * */
  setDebounce = debounce((callback) => {
    callback();
  }, 500);

  /**
   * On change search query.
   * */
  _onChangeSearchQuery (keyword) {
    if (keyword.length > 0) {
      this.setState({
        isProgress: true,
        query: keyword
      });

      this.setDebounce(() => {
        WhrgSearch.searchKeywords({ query: keyword }).then(res => {

          if (res) {
            this.setState({
              searchAddress: res.addresses,
              searchWarehouse: res.warehouses
            });
          }

          setTimeout(
            function () {
              this.setState({
                isProgress: false
              });
            }.bind(this), 300);
        }).catch(err => {
          alert('서버에러:', err.response.message);
        });
      });
    } else {
      this.props.searchToggle(false);
    }
  }

  /**
   * 검색 결과 클릭 하면 중심좌표 변경하기.
   * */
  handleClickSearchResult = (resultItem) => {
    this.props.searchToggle(false);
    this.props.onSelect(resultItem);
  }


  renderSearchWarehouse = () => {
    const { searchAddress, searchWarehouse, isProgress, query } = this.state;

    return (
      (searchWarehouse.length > 0 || searchAddress.length > 0) ?
        <View style={{ paddingBottom: 30 }}>
          {/* 주소 */}
          {searchAddress && searchAddress.map((addr, index) =>
            <TouchableOpacity onPress={() => this.handleClickSearchResult(addr)}>
              <List.Item
                key={'addr' + index}
                title={<Highlighter
                  highlightStyle={{ color: this.props.theme.colors.primary }}
                  searchWords={[query]}
                  textToHighlight={addr.address}
                />}
                style={styles.listItem}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
                left={props => <List.Icon {...props} icon={'map-marker'} color={'rgba(0, 0, 0, 0.54)'}
                                          style={styles.listItemIcon} />}
              />
            </TouchableOpacity>
          )}
          {/* 창고 */}
          {searchWarehouse && searchWarehouse.map((wh, index) =>
            <TouchableOpacity onPress={() => this.handleClickSearchResult(wh)}>
              <List.Item
                key={'wh' + index}
                title={<Highlighter
                  highlightStyle={{ color: this.props.theme.colors.primary }}
                  searchWords={[query]}
                  textToHighlight={wh.name}
                />}
                description={wh.address}
                style={styles.listItem}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
                left={props => <List.Icon {...props} icon={'city'} color={'rgba(0, 0, 0, 0.54)'}
                                          style={styles.listItemIcon} />}
              />
            </TouchableOpacity>)}
        </View>

        :
        <View style={[DefaultStyle.d_center, DefaultStyle.w_100, DefaultStyle.h_150]}>
          <Text style={DefaultStyle._textDF}>{isProgress ? '창고 검색 중입니다.' : '검색 결과가 없습니다.'}</Text>
        </View>
    );
  }

  render () {
    const { isProgress } = this.state;

    return (
      <View style={styles.container}>
        {/** Input Search */}
        <View style={[styles.searchBarWrap]}>
          <Searchbar
            placeholder="지역명이나 창고명을 검색하세요."
            icon={'arrow-left'}
            onChangeText={query => this._onChangeSearchQuery(query)}
            onIconPress={() => this.props.searchToggle(false)}
            value={this.state.query}
            style={[styles.searchBar]}
            inputStyle={styles.searchInput}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && this.state.query.length < 2) {
                this.setState({ query: '' });
              }
            }}
          />
        </View>

        {/** Scroll */}
        <ScrollView style={{}}>
          {/** Header */}
          <View style={styles.searchListHeader}>
            <Text style={styles.searchListLabel}>{'검색 결과'}</Text>
            {/* <TouchableOpacity style={styles.searchListBtn} onPress={() => {
              alert('검색기록 전체삭제');
            }}>
              <Text style={styles.searchListBtnLabel}>{'검색기록 전체삭제'}</Text>
            </TouchableOpacity> */}
          </View>

          {
            isProgress ?
              <View style={[DefaultStyle.d_center, DefaultStyle.w_100, DefaultStyle.h_200]}>
                <Progress />
              </View>
              :
              this.renderSearchWarehouse()
          }
        </ScrollView>
      </View>
    )
      ;
  }
}


// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    isSearchToggle: state.search.isSearchToggle,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {
    searchToggle: status => {
      dispatch(ActionCreator.searchToggle(status));
    },
  };
}

// Check Props Type.
SearchOverlay.protoType = {
  onSelect: PropTypes.func,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(SearchOverlay);
