let index = 0;

const keyValue = (object) => {
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'object') {
      console.log(`>>>> START: ${key} <<<<<`);
      keyValue(value);
      console.log(`>>>> END: ${key} <<<<<`);
    } else
      console.log(`${key}`, `::: ${value}`);
  }
};

export const log = (object1, message) => {
  if (object1) {
    console.log('==== START:' + message + ' ====');
    keyValue(object1);
    console.log('==== END:' + message + ' ====');
  } else
    console.log('==== EMPTY:' + message + ' ==== ');
};
