/**
 * 2019.03.29
 * @author Deokin Kim
 *
 * @fileoverview
 * [vue-oauth2-code.js]
 * Oauth2.0의 Authorization Code Grant 방식을 간편하게 이용할 수 있는 기능을 제공함.
 * state 및 access_token의 저장소는 쿠키를 이용함.
 *
 * 기능 1. SNS 로그인 버튼을 눌렀을 때, 해당 SNS 로그인 페이지로 이동시킴.
 *        이때, 필요한 정보를 Query string에 넣어줌.(일반적으로 response_type, client_id, redirect_uri, state 는 필수임.)
 * 기능 2. SNS 로그인이 완료되고 redirect_uri로 돌아온 후에, 응답 받은 authorization code를 서비스 서버에 전달하여 access_token을 수령하고 이를 쿠키에 저장함.
 *        이때, promise를 return하여 작업 페이지에서 추가 처리를 할 수 있도록 함. (*** 본 플러그인을 사용하기 위해서는 redirect_uri에 맵핑되는 페이지가 반드시 있어야 함.)
 *
 * 부가 기능
 *   - state를 쿠키에 저장할 때의 key name은 '{provider name}-state'로 사용함.
 *   - redirectUri에는 query string을 사용할 수가 없어서, state value 맨 뒤에 '-innerQs-${qs}' 형식으로 넣어서 사용함.
 *     (redirectUri는 SNS의 앱 관리 콘솔에서 등록해야하는데 query string까지 정확하게 입력해야 정상작동 함. 그런데 query string은 사이트에서 매우 유동적이므로 왭 관리 콘솔에 전부 등록할 수 없음.)
 *     innerQs는 redirectUri 페이지에서 state를 해독하여 자유롭게 사용하면 됩.
 *
 * @package
 * >> dependencies
 *   - js-cookie (https://github.com/js-cookie/js-cookie)
 *   - moment (https://momentjs.com)
 *   - url-template (https://github.com/bramstein/url-template)
 *   - axios (https://github.com/axios/axios)
 */
import Cookie from 'js-cookie'
import moment from 'moment'
import urlTemplate from 'url-template'
import axios from 'axios'
import getConfig from "next/config";

// next.config.js 파일에서 메타 정보 설정 가능.
const { publicRuntimeConfig } = getConfig();
const { API_SERVER_ADDRESS, API_CLIENT_ADDRESS, ACCESS_TOKEN_NAME } = publicRuntimeConfig.env;

let _window = null
if (typeof window !== 'undefined') {
  _window = window
}

// 전역 설정값
export const variables = {
  baseUrl: 'https://api.360seoul.co.kr', // 서비스 서버의 API domain
  // baseUrl: API_SERVER_ADDRESS, // 서비스 서버의 API domain
  tokenName: ACCESS_TOKEN_NAME, // 토큰을 저장될 때의 key name
  cookieInfo: {
    domain: _window ? _window.location.hostname : API_CLIENT_ADDRESS,
    path: '/',
    expires: new Date(moment().add(7, 'days').format('x')),
    secure: false // process.env.NODE_ENV === 'production' // https지원하고, 배포일 때만 secure 설정
  },
  provider: {
    facebook: {
      // provider 이름
      name: 'facebook',
      // provider에게 code를 받으면, 이를 전달할 서비스 API 주소
      url: '/api/v1/auth/facebook',
      // provider에서 전달하는 앱 ID
      clientId: '111111111111',
      // provider의 로그인 화면에서 로그인 성공 후에 되돌아올 서비스 페이지 url
      redirectUri: (_window ? _window.location.origin : API_CLIENT_ADDRESS) + '/account/oauth2/facebook',
      // provider에게 code를 요청하는 주소
      authUrl: 'https://www.facebook.com/v4.0/dialog/oauth',
      // CSRF 방지를 위한 값
      state: `nb-oauth-state-${Date.now()}`,
      // Desktop과 Mobile에서 SNS 로그인 페이지를 표시할 방법. (ex. popup, page, mobile 등)
      display: {
        desktop: 'popup',
        mobile: 'page'
      },
      // SNS에서 authorization code를 응답할 때 사용하는 query string의 key name 명시
      responseParams: {
        code: 'code',
        clientId: 'clientId',
        redirectUri: 'redirectUri',
        state: 'state'
      },
      scope: [
        'email'
      ]
    },
    kakao: {
      // provider 이름
      name: 'kakao',
      // provider에게 code를 받으면, 이를 전달할 서비스 API 주소
      url: '/api/v1/kakao-login',
      // provider에서 전달하는 앱 ID
      clientId: 'c7e96d10b823ec83557952b90a9b7695',
      // provider의 로그인 화면에서 로그인 성공 후에 되돌아올 서비스 페이지 url
      redirectUri: (_window ? _window.location.origin : API_CLIENT_ADDRESS) + '/account/oauth2/kakao',
      // provider에게 code를 요청하는 주소
      authUrl: 'https://kauth.kakao.com/oauth/authorize',
      // CSRF 방지를 위한 값
      state: `nb-oauth-state-${Date.now()}`,
      // Desktop과 Mobile에서 SNS 로그인 페이지를 표시할 방법. (ex. popup, page, mobile 등)
      display: {
        desktop: 'popup',
        mobile: 'page'
      },
      // SNS에서 authorization code를 응답할 때 사용하는 query string의 key name 명시
      responseParams: {
        code: 'code',
        clientId: 'clientId',
        redirectUri: 'redirectUri',
        state: 'state'
      }
    },
    naver: {
      // provider 이름
      name: 'naver',
      // provider에게 code를 받으면, 이를 전달할 서비스 API 주소
      url: '/api/v1/naver-login',
      // provider에서 전달하는 앱 ID
      clientId: 'IkgYk9i7Qq6rPmdgPqix',
      // provider의 로그인 화면에서 로그인 성공 후에 되돌아올 서비스 페이지 url
      redirectUri: (_window ? _window.location.origin : API_CLIENT_ADDRESS) + '/account/oauth2/naver',
      // provider에게 code를 요청하는 주소
      authUrl: 'https://nid.naver.com/oauth2.0/authorize',
      // CSRF 방지를 위한 값
      state: `nb-oauth-state-${Date.now()}`,
      // Desktop과 Mobile에서 SNS 로그인 페이지를 표시할 방법. (ex. popup, page, mobile 등)
      display: {
        desktop: 'popup',
        mobile: 'page'
      },
      // SNS에서 authorization code를 응답할 때 사용하는 query string의 key name 명시
      responseParams: {
        code: 'code',
        clientId: 'clientId',
        redirectUri: 'redirectUri',
        state: 'state'
      }
    }
  }
}

// 기능 1 구현
/**
 * @param {String} provider arg1 : SNS 로그인을 제공하는 인증공급자의 이름
 * @param {String} option arg2 : 인증 절차 중에 부가적으로 설정할 옵션
 *                               option = {
 *                                  isMobile(boolean): true면 SNS에서 제공하는 모바일 로그인 페이지로 감.
 *                                  redirectUriQueryString(String): redirectUri에 붙일 query string. 호출자에서 query string을 완성하여 넘기게 하여 자유도를 높임.
 *                               }
 */
export const oauth2Login = function (provider, { isMobile = false, redirectUriQueryString = '' } = {}) {
  // 필수 매개변수 없으면 에러 출력
  if (!provider) {
    console.error('vue-oauth2-code :: getToken :: All or Some arguments is not entered.')
    return
  }
  // 설정되지 않은 provider 입력 시 에러 출력
  if (!variables.provider[provider]) {
    console.error('vue-oauth2-code :: oauth2Login :: Entered provider is not supported.')
    return
  }

  if (window) {
    let stateValue = variables.provider[provider].state + (redirectUriQueryString === '' ? '' : '-innerQs-' + redirectUriQueryString)
    // SNS 로그인 페이지로 이동 시키기 전에 state를 쿠키에 저장함.
    Cookie.set(variables.provider[provider].name + '-state', stateValue)

    // SNS 로그인 페이지로 이동하기 전에 필요한 query string을 구성.
    let redirectEndpointTemplate = urlTemplate.parse(`${variables.provider[provider].authUrl}{?response_type,client_id,redirect_uri,state,encode_state,display,scope}`)
    let redirectEndpoint = redirectEndpointTemplate.expand({
      response_type: 'code',
      client_id: variables.provider[provider].clientId,
      redirect_uri: variables.provider[provider].redirectUri,
      state: stateValue,
      encode_state: variables.provider[provider].state !== '' ? true : undefined,
      display: (isMobile && variables.provider[provider].display.mobile !== '') ? variables.provider[provider].display.mobile : (variables.provider[provider].display.desktop !== '' ? variables.provider[provider].display.desktop : undefined),
      scope: (variables.provider[provider].scope && variables.provider[provider].scope.length > 0) ? variables.provider[provider].scope.toString() : undefined
    })

    // SNS 로그인 페이지로 이동.
    if (variables.provider[provider].display) {

    }
    //window.open(url, name, specs, replace);
    window.location.href = redirectEndpoint
  } else {
    console.error('vue-oauth2-code :: oauth2Login :: This function must be called on Client-side(Web Browser).')
  }
}

// 기능 2 구현
/**
 * @param {String} provider arg1 : SNS 로그인을 제공하는 인증공급자의 이름
 * @param {String | Object} responseQueryString arg2 : SNS 인증서버에서 응답해준 query string
 * @param {Object} addtionalBody arg3 : 서비스 서버에 access_token을 요청할 때 추가적으로 body에 담을 parameters
 */
export const getToken = function (provider, responseQueryString, addtionalBody) {
  let code
  let state

  let respQs = responseQueryString

  return new Promise(function (resolve, reject) {
    // 응답 query string을 String이나 Object로 받지 않으면 에러 출력
    if (!(typeof respQs === 'string' || typeof respQs === 'object')) {
      reject(new Error('vue-oauth2-code :: getToken :: second argument(responseQueryString) is must be String or Object type.'))
    }

    // 응답 query string을 문자열로 받으면, 먼저 object로 만듬.
    if (typeof respQs === 'string') {
      // 첫글자 물음표로 시작하면 물음표 제거
      if (respQs.substring(0, 1) === '?') {
        respQs = respQs.substring(1)
      }

      // object로 변환
      let qsArray = respQs.split('&')
      let qsObj = {}
      qsArray.forEach(item => {
        let tempArr = item.split('=')
        qsObj[tempArr[0]] = tempArr[1]
      })
      respQs = qsObj
    }

    // 최종 확인
    // console.log('vue-oauth2-code :: getToken :: Final Response Query String.')
    // console.log(respQs)

    // query string에서 필수 요소 추출
    code = respQs[variables.provider[provider].responseParams.code]
    state = respQs[variables.provider[provider].responseParams.state]

    // 필수 매개변수 없으면 에러 출력
    if (!provider || !state || !code) {
      reject(new Error('vue-oauth2-code :: getToken :: All or Some arguments is not entered.'))
    }
    // 설정되지 않은 provider 입력 시 에러 출력
    if (!variables.provider[provider]) {
      reject(new Error('vue-oauth2-code :: getToken :: Entered provider is not supported.'))
    }

    // (1) state 검증
    let stateCookie = Cookie.get(variables.provider[provider].name + '-state')
    if (!stateCookie || !state || (stateCookie !== state)) {
      // 비정상 접속에 대한 reject
      reject(new Error('vue-oauth2-code :: getToken :: Invaild state.'))
    }

    // (2) 서비스 서버로 access token 요청
    let requestBody = {
      code,
      redirectUri: variables.provider[provider].redirectUri
    }
    if (addtionalBody && typeof addtionalBody === 'object') {
      let addtionalBodyKeys = Object.keys(addtionalBody)
      addtionalBodyKeys.forEach(item => {
        requestBody[item] = addtionalBody[item]
      })
    } else {
      // console.warn('vue-oauth2-code :: getToken :: additionalBody is undefined or not Object type. so, It is ignored.')
    }
    axios.post(variables.baseUrl + variables.provider[provider].url, requestBody).then(function (resp) {
      if (resp.data.access_token) {
        Cookie.set(variables.tokenName, resp.data.access_token)
        resolve(resp)
      } else {
        reject(new Error('vue-oauth2-code :: getToken :: No access_token.'))
      }
    }).catch(function (err) {
      reject(err)
    })
  })
}