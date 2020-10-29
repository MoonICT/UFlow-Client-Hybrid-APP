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
   * Webview -> Native App
   ************************/

  /**
   * 로그인 이벤트 전달.
   * Request Data
   * {}
   * */
  REQ_LOGIN_EVENT: 'REQ_LOGIN_EVENT',

  /**
   * (필요시)FCM 토큰 요청.
   * Request Data
   * {}
   * Response Data
   * {
   *   token: [String]
   * }
   * */
  REQ_FCM_TOKEN: 'REQ_FCM_TOKEN',
  RES_FCM_TOKEN: 'RES_FCM_TOKEN',

  // TODO ... other message

  /*******************************
   * Native App -> Webview
   *******************************/

  // TODO ... other message

};

// 메세지 데이터 파싱.
function parseMessageData(e) {
  let msgData;
  try {
    msgData = JSON.parse(e.nativeEvent.data) || {};
  } catch (error) {
    console.error(error);
    return;
  }
  return msgData;
}

export default {types, parseMessageData};
