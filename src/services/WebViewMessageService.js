/**
 * Post Message
 * 2020.09.1 Deokin
 *
 * [Web code]
 *
 * // Send
 * window.ReactNativeWebView.postMessage(JSON.stringify({
 *   type: <Any Type>,
 *   data: <Any Data>
 * }))
 *
 * // Receive for Android
 * window.document.addEventListener('message', (e) => {
 *    let msgData = JSON.parse(e.data)
 *    switch (msgData.type) {
 *      case <Any Type>>:
 *        // Any action...
 *        break;
 *      ...
 *    }
 * })
 * // Receive for iOS
 * window.addEventListener('message', (e) => {
 *    // Same as android
 * })
 *
 * */

// 웹-앱 간 요청/응답 메소드 타입 정의.
const types = {
  /************************
   * Common
   ************************/

  /************************
   * Webview -> Native App
   ************************/

  /**
   * console log 함수 호출.
   * Request Data
   * {...arguments}
   * */
  CONSOLE_LOG: 'CONSOLE_LOG',

  /**
   * 사용자으 지도 조작으로 센터가 변경된 경우.
   * Request Data
   * {}
   * */
  CHANGE_MAP_CENTER_POSITION: 'CHANGE_MAP_CENTER_POSITION',


  /*******************************
   * Native App -> Webview
   *******************************/

  /**
   * 필터가 변경 되었을 때 호출.
   * Request Data
   * {...Filter Data}
   * */
  CHANGE_SEARCH_FILTER: 'CHANGE_SEARCH_FILTER',

  /**
   * 검색 결과 클릭 하면 중심좌표 변경하기.
   * Request Data
   * {}
   * */
  CHANGE_SEARCH_CENTER_POSITION: 'CHANGE_SEARCH_CENTER_POSITION',


};

// 메세지 데이터 파싱.
function parseMessageData (e) {
  let msgData;
  // console.log('parse data : ', e.nativeEvent.data)
  try {
    msgData = JSON.parse(e.nativeEvent.data) || {};
  } catch (error) {
    console.error(error);
    return;
  }
  return msgData;
}

export default { types, parseMessageData };
