const value = "aas022:a9";

const selection = {
  column: {
    current: -1,
    start: -1,
    end: -1,
  },
  row: {
    current: -1,
    start: -1,
    end: -1,
  },
};
const range = value.split(":");
let columnCurrent = "";

const reg = /[a-zA-Z]+|[1-9][0-9]*/gi;
const a = range[0].match(reg);
// console.log(a);

const aa = "A";
// const index = aa.charCodeAt(0);
// console.log(index);

function getIndexByCode(code) {
  let index = 0;
  for (let i = 0; i < code.length; i++) {
    const num = code.charCodeAt(i) - 64;
    const bty = Math.pow(24, code.length - i - 1);
    index += num * bty;
  }
  return index;
}
console.log(getIndexByCode(aa));
// if (range[0]) {
//   range[0].replace(columnReg, (m, i) => {
//     if (i === 0) {
//       const code = m.toUpperCase();
//     }
//   });
//   range[0].replace(rowReg, (m, i) => {
//     const index = parseInt(m);
//     console.log(index, i);
//   });
// }
