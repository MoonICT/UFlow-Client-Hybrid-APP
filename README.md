# react-native-boilerplate

This project is boilerplate based on [react-native](https://reactnative.dev/).

## Environment

This [link](https://reactnative.dev/docs/environment-setup) will help you install and build your first React Native app. 

 
## Install and build setup

``` bash
# install react-navtive-cli
$ npm install -g react-native-cli

# install dependencies
$ npm install # Or yarn install

# Running app on a simulator or virtual device
$ react-native [run-ios|run-android]
```
If you want to run the app on an actual physical device, please follow the instructions [here](https://reactnative.dev/docs/running-on-device).

**[NOTE] If you downloaded it from the git repository, you need to change the domain and package name.**<br/>
[Common]
1. ``./app.json``
```
{
  "name": "[PROJECT_NAME]",
  "displayName": "Uflow"
}
```
[Android]
1. ``/android/app/src/main/AndroidManifest.xml``
```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="[YOUR_DOMAIN]">
    ...
```
2. Changed the subdirectory structure of ``app/src/main/java``.
```
... 
> main
    > java
        > [YOUR_DOMAIN]
            > MainActivity.java 
            > MainApplication.java 
...
```
3. ``app/build.gradle``
```
...
defaultConfig {
    applicationId "[YOUR_DOMAIN]"
...
``` 
4. Package changes for all java files.
```
package [YOUR_DOMAIN]
```
5. ``android/settings.gradle``
```
rootProject.name = '[PROJECT_NAME]'
...
```
6. ``/android/app/src/main/java/[YOUR_DOMAIN]/MainActivity.java``
```
@Override
  protected String getMainComponentName() {
    return "[PROJECT_NAME]";
  }
...
```

[iOS]<br/>
1. `` Target > General > Identity > Bundle Identifier``
    - Change ``Bundle Identifier`` to your domain.


## Project Structure

+ android : 안드로이드 프로젝트.
+ ios : Xcode 프로젝트.
+ Apdp.js : 앰 메인 화면.
+ index.js : 프로젝트 실행 시작점. 
+ src : 프로젝트의 주요 소스.
    + assets : 정적 자원(fonts, images)
    + components : react component 모음(atomic 디자인 패턴을 따름. [참고사이트](https://medium.com/@inthewalter/atomic-design-for-react-514660f93ba))
        + atoms : 가장 작은 단위의 컴포넌트.
        + molecules : atoms 컴포넌트를 조합한 컴포넌트.
        + organisms : atoms와 molecules를 조합한 컴포넌트.
    + screens : App 화면 정의.
    + styles : 스타일 정의.
    + services : API 관련 파일.
    + navigations : 앱 네비게이션 설정.
    + utils : 기타 유틸리티
    + actions : Redux
    + reducers  : Redux
    + store  : Redux
   
+ node_modules : node modules.
+ \_\_tests__ : 테스트 파일.git 
+ .buckconfig : 고성능 빌드 툴 설정파일.
+ .eslintrc.js : ESLint 설정파일.
+ .flowconfig : Flow(정적 타입 체크기) 설정파일.
+ .prettierrc.js : Prettier 설정파일.
+ .gitignore : 깃 제외 파일 관리.
+ .watchmanconfig : Watchman 설정파일(시스템 변화 감지, 성능향상).
+ .app.json : 코드에 속하지 않는 앱의 일부들을 구성.(앱 설정).
+ .babel.config.js : Babel 설정파일
+ .metro.config.js : js bundler 설정파일.
+ .package.json : 프로젝트 정보 및 의존성 관리.


## Feature

+ Version checker for react-native applications.([react-native-version-check](https://github.com/kimxogus/react-native-version-check)) 
+ State management with redux
+ React Native Webview Interface ([React-native-webview](https://github.com/react-native-webview/react-native-webview))
+ Barcode or QRCode Reader ([react-native-camera](https://react-native-camera.github.io/react-native-camera/))
+ App icon and splash image are automatically generated.([@bam.tech/react-native-make](https://github.com/bamlab/react-native-make))
+ Geolocation API ([@react-native-community/geolocation](https://github.com/react-native-geolocation/react-native-geolocation))
+ Local Notification ([zo0r/react-native-push-notification](https://github.com/zo0r/react-native-push-notification))
+ TODO Firebase Cloud Messaging(FCM)
