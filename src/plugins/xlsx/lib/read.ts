/* eslint-disable @typescript-eslint/no-unused-vars */
import { reject } from "lodash";
import { DataSourceType, ReadOption } from "../type";
function base64Decode(input: string) {
  const base64_map =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let o = "";
  let c1 = 0;
  let c2 = 0;
  let c3 = 0;
  let e1 = 0;
  let e2 = 0;
  let e3 = 0;
  let e4 = 0;
  input = input
    .replace(/^data:([^\/]+\/[^\/]+)?;base64\,/, "")
    .replace(/[^\w\+\/\=]/g, "");
  for (let i = 0; i < input.length; ) {
    e1 = base64_map.indexOf(input.charAt(i++));
    e2 = base64_map.indexOf(input.charAt(i++));
    c1 = (e1 << 2) | (e2 >> 4);
    o += String.fromCharCode(c1);
    e3 = base64_map.indexOf(input.charAt(i++));
    c2 = ((e2 & 15) << 4) | (e3 >> 2);
    if (e3 !== 64) {
      o += String.fromCharCode(c2);
    }
    e4 = base64_map.indexOf(input.charAt(i++));
    c3 = ((e3 & 3) << 6) | e4;
    if (e4 !== 64) {
      o += String.fromCharCode(c3);
    }
  }
  return o;
}

function firstByte(data: Array<unknown> | string, type: DataSourceType) {
  const getCharCode8 = (source: string | Array<unknown>) => {
    const target: unknown[] = [];
    for (let i = 0; i < 8; i++) {
      if (Array.isArray(source)) {
        target.push(source[i]);
      } else {
        target.push(source.charCodeAt(i));
      }
    }
    return target;
  };
  switch (type) {
    case DataSourceType.buffer:
      return getCharCode8(data);
    case "base64":
      return getCharCode8(base64Decode(data.slice(0, 12) as string));
    case "binary":
      return getCharCode8(data);
    case "array":
      return getCharCode8(data);
    default:
      throw new Error(`Unrecognized type ${type}`);
  }
}

// async function read(data: Array<unknown> | string | File, opts: ReadOption) {
//   let bytes: unknown[] | null = null;
//   if (opts.type === "file") {
//     if (data instanceof File) {
//       const res = await readBinaryFromFile(data);
//       bytes = firstByte(res, DataSourceType.binary);
//     }
//   } else {
//     if (!(data instanceof File)) {
//       bytes = firstByte(data, opts.type);
//     }
//   }
//   if (bytes) {
//     const key = bytes[0];
//     switch (key) {
//       case 0xd0:
//         if (
//           bytes[1] === 0xcf &&
//           bytes[2] === 0x11 &&
//           bytes[3] === 0xe0 &&
//           bytes[4] === 0xa1 &&
//           bytes[5] === 0xb1 &&
//           bytes[6] === 0x1a &&
//           bytes[7] === 0xe1
//         ) {
//           return read_cfb(CFB.read(d, o), o);
//         }

//         break;
//       case 0x09:
//         if (bytes[1] <= 0x08) {
//           return parse_xlscfb(d, o);
//         }
//         break;
//       case 0x3c:
//         return parse_xlml(d, o);
//       case 0x49:
//         if (bytes[1] === 0x49 && bytes[2] === 0x2a && bytes[3] === 0x00) {
//           throw new Error("TIFF Image File is not a spreadsheet");
//         }
//         if (bytes[1] === 0x44) {
//           return read_wb_ID(d, o);
//         }
//         break;
//       case 0x54:
//         if (bytes[1] === 0x41 && bytes[2] === 0x42 && bytes[3] === 0x4c) {
//           return DIF.to_workbook(d, o);
//         }
//         break;
//       case 0x50:
//         if (bytes[1] === 0x4b && bytes[2] < 0x09 && bytes[3] < 0x09) {
//           return read_zip(d, o);
//         }
//         return read_prn(data, d, o, str);
//       case 0xef:
//         if (bytes[1] === 0x4b && bytes[2] < 0x09 && bytes[3] < 0x09) {
//           return parse_xlml(d, o);
//         }
//         return read_prn(data, d, o, str);
//       case 0xff:
//         if (bytes[1] === 0xfe) {
//           return read_utf16(d, o);
//         } else if (
//           bytes[1] === 0x00 &&
//           bytes[2] === 0x02 &&
//           bytes[3] === 0x00
//         ) {
//           return WK_.to_workbook(d, o);
//         }
//         break;
//       case 0x00:
//         if (bytes[1] === 0x00) {
//           if (bytes[2] >= 0x02 && bytes[3] === 0x00) {
//             return WK_.to_workbook(d, o);
//           }
//           if (bytes[2] === 0x00 && (bytes[3] === 0x08 || bytes[3] === 0x09))
//             return WK_.to_workbook(d, o);
//         }
//         break;
//       case 0x03:
//       case 0x83:
//       case 0x8b:
//       case 0x8c:
//         return DBF.to_workbook(d, o);
//       case 0x7b:
//         if (bytes[1] === 0x5c && bytes[2] === 0x72 && bytes[3] === 0x74) {
//           return rtf_to_workbook(d, o);
//         }
//         break;
//       case 0x0a:
//       case 0x0d:
//       case 0x20:
//         return read_plaintext_raw(d, o);
//       case 0x89:
//         if (bytesn[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47)
//           throw new Error("PNG Image File is not a spreadsheet");
//         break;
//       case 0x08:
//         if (bytes[1] === 0xe7)
//           throw new Error("Unsupported Multiplan 1.x file!");
//         break;
//       case 0x0c:
//         if (bytes[1] === 0xec)
//           throw new Error("Unsupported Multiplan 2.x file!");
//         if (bytes[1] === 0xed)
//           throw new Error("Unsupported Multiplan 3.x file!");
//         break;
//     }
//   }

//   var o = opts || {};
//   if (o.codepage && typeof $cptable === "undefined")
//     console.error(
//       "Codepage tables are not loaded.  Non-ASCII characters may not give expected results"
//     );
//   if (typeof ArrayBuffer !== "undefined" && data instanceof ArrayBuffer)
//     return readSync(
//       new Uint8Array(data),
//       ((o = dup(o)), (o.type = "array"), o)
//     );
//   if (
//     typeof Uint8Array !== "undefined" &&
//     data instanceof Uint8Array &&
//     !o.type
//   )
//     o.type = typeof Deno !== "undefined" ? "buffer" : "array";
//   var d = data,
//     n = [0, 0, 0, 0],
//     str = false;
//   if (o.cellStyles) {
//     o.cellNF = true;
//     o.sheetStubs = true;
//   }
//   _ssfopts = {};
//   if (o.dateNF) _ssfopts.dateNF = o.dateNF;
//   if (!o.type) o.type = has_buf && Buffer.isBuffer(data) ? "buffer" : "base64";
//   if (o.type == "file") {
//     o.type = has_buf ? "buffer" : "binary";
//     d = read_binary(data);
//     if (typeof Uint8Array !== "undefined" && !has_buf) o.type = "array";
//   }
//   if (o.type == "string") {
//     str = true;
//     o.type = "binary";
//     o.codepage = 65001;
//     d = bstrify(data);
//   }
//   if (
//     o.type == "array" &&
//     typeof Uint8Array !== "undefined" &&
//     data instanceof Uint8Array &&
//     typeof ArrayBuffer !== "undefined"
//   ) {
//     // $FlowIgnore
//     var ab = new ArrayBuffer(3),
//       vu = new Uint8Array(ab);
//     vu.foo = "bar";
//     // $FlowIgnore
//     if (!vu.foo) {
//       o = dup(o);
//       o.type = "array";
//       return readSync(ab2a(d), o);
//     }
//   }
//   switch ((n = firstbyte(d, o))[0]) {
//     case 0xd0:
//       if (
//         n[1] === 0xcf &&
//         n[2] === 0x11 &&
//         n[3] === 0xe0 &&
//         n[4] === 0xa1 &&
//         n[5] === 0xb1 &&
//         n[6] === 0x1a &&
//         n[7] === 0xe1
//       )
//         return read_cfb(CFB.read(d, o), o);
//       break;
//     case 0x09:
//       if (n[1] <= 0x08) return parse_xlscfb(d, o);
//       break;
//     case 0x3c:
//       return parse_xlml(d, o);
//     case 0x49:
//       if (n[1] === 0x49 && n[2] === 0x2a && n[3] === 0x00)
//         throw new Error("TIFF Image File is not a spreadsheet");
//       if (n[1] === 0x44) return read_wb_ID(d, o);
//       break;
//     case 0x54:
//       if (n[1] === 0x41 && n[2] === 0x42 && n[3] === 0x4c)
//         return DIF.to_workbook(d, o);
//       break;
//     case 0x50:
//       return n[1] === 0x4b && n[2] < 0x09 && n[3] < 0x09
//         ? read_zip(d, o)
//         : read_prn(data, d, o, str);
//     case 0xef:
//       return n[3] === 0x3c ? parse_xlml(d, o) : read_prn(data, d, o, str);
//     case 0xff:
//       if (n[1] === 0xfe) {
//         return read_utf16(d, o);
//       } else if (n[1] === 0x00 && n[2] === 0x02 && n[3] === 0x00)
//         return WK_.to_workbook(d, o);
//       break;
//     case 0x00:
//       if (n[1] === 0x00) {
//         if (n[2] >= 0x02 && n[3] === 0x00) return WK_.to_workbook(d, o);
//         if (n[2] === 0x00 && (n[3] === 0x08 || n[3] === 0x09))
//           return WK_.to_workbook(d, o);
//       }
//       break;
//     case 0x03:
//     case 0x83:
//     case 0x8b:
//     case 0x8c:
//       return DBF.to_workbook(d, o);
//     case 0x7b:
//       if (n[1] === 0x5c && n[2] === 0x72 && n[3] === 0x74)
//         return rtf_to_workbook(d, o);
//       break;
//     case 0x0a:
//     case 0x0d:
//     case 0x20:
//       return read_plaintext_raw(d, o);
//     case 0x89:
//       if (n[1] === 0x50 && n[2] === 0x4e && n[3] === 0x47)
//         throw new Error("PNG Image File is not a spreadsheet");
//       break;
//     case 0x08:
//       if (n[1] === 0xe7) throw new Error("Unsupported Multiplan 1.x file!");
//       break;
//     case 0x0c:
//       if (n[1] === 0xec) throw new Error("Unsupported Multiplan 2.x file!");
//       if (n[1] === 0xed) throw new Error("Unsupported Multiplan 3.x file!");
//       break;
//   }
//   if (DBF_SUPPORTED_VERSIONS.indexOf(n[0]) > -1 && n[2] <= 12 && n[3] <= 31)
//     return DBF.to_workbook(d, o);
//   return read_prn(data, d, o, str);
// }
