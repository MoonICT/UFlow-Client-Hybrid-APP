import Toast from "react-native-root-toast";

export function ToastShow(message = '') {
  let toast = Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
      console.log('Toast:onShow')
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
      console.log('Toast:onShown')
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
      console.log('Toast:onHide')
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
      console.log('Toast:onHidden')
    }
  });

// You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  setTimeout(function () {
    Toast.hide(toast);
  }, 50000);
}
