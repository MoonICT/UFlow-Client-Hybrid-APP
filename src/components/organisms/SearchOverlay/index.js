/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Searchbar, List, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Highlighter from 'react-native-highlight-words';

// Local Imports
import { styles } from './style';
import ActionCreator from "@Actions";

class SearchOverlay extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: '합정',
    };
  }

  /**
   * On change search query.
   * TODO 검색어 변경 시, 조회 처리.
   * */
  _onChangeSearchQuery (query) {
    if (query.length > 0) {
      this.setState({ query: query });
    }
  }

  render () {
    // Temp array
    let arr = [
      {
        title: '합정역',
        description: '',
        icon: 'bus',
      },
      {
        title: '서울특별시 마포구 합정동',
        description: '',
        icon: 'map-marker',
      },
      {
        title: '합정',
        description: '서울특별시 마포구 합정동',
        icon: 'map',
      },
      {
        title: '합정물류',
        description: '서울특별시 마포구 합정동',
        icon: 'map',
      },
      {
        title: '서울합정물류창고',
        description: '서울특별시 마포구 합정동',
        icon: 'map',
      }
    ];
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
            <Text style={styles.searchListLabel}>{'최근 검색'}</Text>
            <TouchableOpacity style={styles.searchListBtn} onPress={() => {
              alert('검색기록 전체삭제');
            }}>
              <Text style={styles.searchListBtnLabel}>{'검색기록 전체삭제'}</Text>
            </TouchableOpacity>
          </View>

          {/** List */}
          {arr.map((r, index) => <List.Item
            key={index}
            title={<Highlighter
              highlightStyle={{ color: this.props.theme.colors.primary }}
              searchWords={[this.state.query]}
              textToHighlight={r.title}
            />}
            description={r.description}
            style={styles.listItem}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
            left={props => <List.Icon {...props} icon={r.icon} color={'rgba(0, 0, 0, 0.54)'}
                                      style={styles.listItemIcon} />}
          />)}
        </ScrollView>
      </View>
    )
      ;
  }
}


// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  console.log('++++++mapStateToProps: ', state);
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

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(SearchOverlay);
