/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Moment from 'moment';
import Select from '@Components/organisms/Select';
import {MyPage} from '@Services/apis';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import {StringUtils, DeepLogs} from '@Services/utils';
import TableInfo from '@Components/atoms/TableInfo';
import {styles as SS} from './style';
import {styles as S} from '../style';

class RequestView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calUnitDvCodes: [],
      calStdDvCodes: [],
    };
  }

  render() {

    /** 요청 응답에 대한 차수 선택 (요청-요청-요청-응답 , 요청-응답 >>> 응답으로 끝나는 부분이 한 차수 (API 로 정리되서 옴.) ) **/
    const {data, typeWH} = this.props;
    let orders = data?.orders[0] || [
      {
        label: StringUtils.dateStr(new Date()) + '(1차)',
        value: StringUtils.dateStr(new Date()) + '(1차)',
      },
    ];

    // console.log('orders==>', orders);
    // console.log('data==>', data);

    const dataSelect = [
      {
        label: StringUtils.dateStr(orders) + '(1차)',
        value: StringUtils.dateStr(orders) + '(1차)',
      },
    ];




    return (
      // <Fragment>{typeWH === 'TRUST' ? viewRequestTrust : viewRequest}</Fragment>
      <></>
    );
  }

  /** when after render DOM */

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');


  }

  componentDidMount() {
    console.log('::componentDidMount::');

    const {data, typeWH} = this.props;

    MyPage.getDetailCodes('WHRG0014').then((res) => {

      if (res.data && res.data._embedded && res.data._embedded.detailCodes) {
        // console.log('detailCodes', res.data._embedded.detailCodes)
        this.setState({
          calStdDvCodes: res.data._embedded.detailCodes
        });
      }
    });

    MyPage.getDetailCodes('WHRG0013').then((res) => {

      if (res.data && res.data._embedded && res.data._embedded.detailCodes) {
        // console.log('detailCodes', res.data._embedded.detailCodes)
        this.setState({
          calUnitDvCodes: res.data._embedded.detailCodes
        });
      }
    });
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    imageStore: state.registerWH.pimages,
  };
}

export default RequestView;

const coverUnit = value => {
  switch (value.status) {
    case 'RQ00':
      // code block
      return;
  }
};
