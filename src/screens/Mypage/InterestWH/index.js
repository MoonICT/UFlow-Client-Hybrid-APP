/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-paper';
import { Fav, Warehouse } from '@Services/apis';
import Loading from '@Components/atoms/Loading';
import { debounce } from "lodash";

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import CardMypage from '@Components/organisms/CardMypage';
import ActionCreator from '@Actions';
import box from '@Assets/images/box.png';
import card from '@Assets/images/card-img.png';
import { styles as S } from '../style';
import { StringUtils } from '@Services/utils';
import AsyncStorage from "@react-native-community/async-storage";
import { Account } from '@Services/apis';
import { TOKEN } from '@Constant';

class InterestWarehouse extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.state = {
      listItem: [],
      loading: false
    };

    this.navigation = props.navigation;
  }

  async UNSAFE_componentWillMount () {

  }


  /** when after render DOM */
  async componentDidMount () {
    const value = await AsyncStorage.getItem(TOKEN);
    // console.log('More Token ==>', value);
    Account.getMe()
      .then(res => {
        console.log('::::: Get Me :::::', res);
        const status = res.status;
        if (status === 200) {
          this.setState({
            isLogin: true,
            email: res.data.email,
            fullName: res.data.fullName,
          });
        }
        this.getDataFavorite();
        this.reRenderSomething = this.props.navigation.addListener('focus', () => {
          this.getDataFavorite();
        });
      })
      .catch(err => {
        console.log('errHome', err);
      });
    if (value) {
      this.setState({ token: value });
    }

    // this.getDataFavorite();
  }

  // setDebounce = debounce((callback) => {
  //   callback();
  // },100);

  // componentDidUpdate (prevProps, prevState) {
  //   if (prevState.isLoading !== this.state.isLoading) {
  //     console.log('vaodya')
  //     this.setDebounce(() => {
  //       this.setState({ isLoading: !this.state.isLoading })
  //     });
  //   }
  // }
  componentWillUnmount () {
    this.reRenderSomething;
  }

  UNSAFE_componentWillReceiveProps (newProps) {
    this.setState({ loading: !this.state.loading });
  }

  getDataFavorite = () => {
    console.log('getDataFavoritedddddddđ :>> ');
    this.props.setProgress({ is: true, });

    Fav.page().then(res => {
      console.log('resFavvvvvvvvvvvvv :>> ', res);
      let resultData = res.data && res.data._embedded && res.data._embedded.mbspUserFavResBodies ? res.data._embedded.mbspUserFavResBodies : [];
      let dataConvert = [];

      resultData.forEach(element => {
        dataConvert.push({
          data: [
            {
              type: '창고 유형',
              value: `${element.keep ? '임대창고' : ''}${element.keep && element.trust ? ', ' : ''}${element.trust ? '수탁창고' : ''}${!element.keep && !element.trust ? '-' : ''}`
            },
            {
              type: '창고 주소',
              value: element.warehouse.address
            },
            {
              type: '임대 요약',
              value: `${this.renderSummaryInfo('KEEP', element)}`
            },
            {
              type: '수탁 요약',
              value: `${this.renderSummaryInfo('TRUST', element)}`
            }
          ],
          title: element.warehouse.warehouse,
          image: element.warehouse.thumbnail,
          id: element.warehouseId
        })
      });

      console.log('dataConvert', dataConvert);

      this.setState({
        listItem: dataConvert
      });

      this.props.setProgress({ is: false, });
    }).catch(error => {
      alert(error.response.data.message);
    });
  }

  renderSummaryInfo = (type, WHItem) => {
    let resultArr = []

    switch (type) {
      case 'KEEP':
        if (WHItem.keep && WHItem.keep.subTitle) {
          resultArr.push(`최대 ${WHItem.keep.subTitle}`)
        }
        if (WHItem.keep && WHItem.keep.splyAmount) {
          resultArr.push(`임대단가 ${StringUtils.money(WHItem.keep.splyAmount)} ~/${WHItem.keep ? WHItem.keep.unit : ''}`)
        }
        if (WHItem.keep && WHItem.keep.mgmtChrg) {
          resultArr.push(`관리단가 ${StringUtils.money(WHItem.keep.mgmtChrg)} ~/${WHItem.keep ? WHItem.keep.unit : ''}`)
        }
        return resultArr.join(', ')
      case 'TRUST':
        if (WHItem.trust && WHItem.trust.subTitle) {
          resultArr.push(`최대 ${StringUtils.numberComma(WHItem.trust.subTitle)}`)
        }
        if (WHItem.trust && WHItem.trust.whinChrg) {
          resultArr.push(`보관단가 ${StringUtils.money(WHItem.trust.whinChrg)} ~/${WHItem.trust ? WHItem.trust.unit : ''}`)
        }
        if (WHItem.trust && WHItem.trust.whoutChrg) {
          resultArr.push(`관리단가 ${StringUtils.money(WHItem.trust.whoutChrg)} ~/${WHItem.trust ? WHItem.trust.unit : ''}`)
        }
        return resultArr.join(', ')
    }
  }

  removeFavorite = (id) => {
    Warehouse.toggleFav(id)
      .then(res => {
        alert('삭제가 완료되었습니다.');
        this.getDataFavorite();
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  }

  render () {
    const { listItem, loading } = this.state;
    let view =
      listItem &&
      listItem.map((item, index) => {
        return (
          <CardMypage
            key={index}
            onPressHeader={() => this.navigation.navigate('DetailsWH', { id: item.id })}
            bgrImage={item.image ? { uri: item.image } : card}
            headerComponent={
              <View>
                <Text
                  style={[
                    DefaultStyle._titleWH,
                    // { padding: 15, marginLeft: 16, marginTop: 16 },
                  ]}>
                  관심 창고
                </Text>
                <Text
                  style={[DefaultStyle._headerCardTitle, { paddingTop: 4 }]}>
                  {item.title}
                </Text>
              </View>
            }
            data={item.data}
            borderRow={false}
            styleLeft={DefaultStyle._leftTableCard}
            styleRight={DefaultStyle._rightTableCard}
            footer={
              <View
                style={[
                  DefaultStyle._listBtn,
                  { marginTop: 16, marginBottom: 0, padding: 0 },
                ]}>
                <TouchableOpacity
                  style={[DefaultStyle._btnOutline, { borderColor: '#000000' }]}
                  onPress={() => this.removeFavorite(item.id)}>
                  <Text
                    style={[DefaultStyle._textButton, { color: '#000000' }]}>
                    삭제
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        );
      });
    return (
      <ScrollView style={[DefaultStyle._body, DefaultStyle.mb_20]}>
        <View style={DefaultStyle._titleCard}>
          <Text style={[DefaultStyle._textTitleCard]}>관심 창고</Text>
          {/* <Text
            style={DefaultStyle._textRightTitleCard}
            onPress={() => this.setState({ listItem: [] })}>
            전체삭제
          </Text> */}
        </View>
        {listItem.length > 0 ? (
          view
        ) : (
          <View style={S.boxNodata}>
            <View style={{
              marginTop: 30,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image style={{ flex: 1 }} source={box ? box : { url: 'null' }} />
            </View>
            <Text style={[DefaultStyle._textDF3, { marginTop: 40, textAlign: 'center', marginBottom: 24, }]}>
              관심 창고로 등록한 창고가 없습니다.
            </Text>
            <TouchableOpacity
              style={[DefaultStyle._btnInline,]}
              onPress={() => {
                this.navigation.navigate('Search')
              }}>
              <Text
                style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                창고 조회하기
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Loading loading={loading} />
      </ScrollView>
    );
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   // Progress
  //   console.log('is Progress !!!')
  //   this.props.setProgress({ is: true, });
  //   return true;
  // }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    setProgress: status => {
      dispatch(ActionCreator.setProgress(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InterestWarehouse);
