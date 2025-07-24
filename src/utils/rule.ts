export type errMessageModel = {
  noInPut: string;
  noNull: string;
  noArray: string;
  numberOnly: string;
  noSpace: string;
  phoneNumber: string;
  english: string;
  email: string;
  countingNumber: string;
  cron: string;
  lowerCase: string;
  upperCase: string;
  lengthPassword: string;
  urlError: string;
  noSpaceOnly: string;
};

export type regexModel = {
  UUID: string;
  CID: string;
  number: RegExp;
  space: RegExp;
  english: RegExp;
  email: RegExp;
  countingNumber: RegExp;
  cron: RegExp;
  lowerCase: RegExp;
  upperCase: RegExp;
  url: RegExp;
};

export type ruleModel = {
  noInPut: (v: string) => string | boolean;
  notNull: (v: string) => boolean | string;
  noArray: (v: []) => boolean | string;
  noSpace: (v: string) => boolean | string;
  numberOnly: (v: string) => boolean | string;
  phoneNumber: (v: string) => boolean | string;
  englishOnly: (v: string) => boolean | string;
  emailOnly: (v: string) => boolean | string;
  countingNumberOnly: (v: string) => boolean | string;
  cronFormat: (v: string) => boolean | string;
  noLowerCase: (v: string) => boolean | string;
  noUpperCase: (v: string) => boolean | string;
  lengthPassword: (v: string) => boolean | string;
  urlFormat: (v: string) => boolean | string;
  noSpaceOnly: (v: string) => boolean | string;
};

const errMessage: errMessageModel = {
  noInPut: 'กรุณากรอกข้อมูล',
  noNull: 'กรุณาเลือกข้อมูล',
  noArray: 'กรุณาเลือกข้อมูล',
  numberOnly: 'กรุณากรอกตัวเลขเท่านั้น',
  noSpace: 'ห้ามมีช่องว่าง',
  phoneNumber: 'กรุณากรอกหมายเลขโทรศัพท์มือถือ 10 หลัก',
  english: 'ภาษาอังกฤษเท่านั้น',
  email: 'รูปแบบอีเมลไม่ถูกต้อง',
  countingNumber: 'กรุณากรอกตัวเลข 1 - 9999',
  cron: 'รูปแบบไม่ถูกต้อง (* * * */1 9)',
  lowerCase: 'ต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว',
  upperCase: 'ต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว',
  lengthPassword: 'ต้องมีรหัสผ่านอย่างน้อย 6 ตัว',
  urlError: 'รูปแบบ url ไม่ถูกต้อง',
  noSpaceOnly: 'กรุณากรอกข้อมูล'
};

const regex: regexModel = {
  UUID: '',
  CID: '',
  number: /^\d+$/,
  space: /^\S+$/,
  english: /[^A-Za-z0-9@!_.-]/,
  email: /^\S+@\S+\.\S+$/,
  countingNumber: /^(?:[1-9]\d{0,4})$/,
  cron: /^((\*|([0-5]?\d)|\*\/[0-5]?\d)\s+){4}(\*|([0-5]?\d)|\*\/[0-5]?\d)$/,
  lowerCase: /[a-z]/g,
  upperCase: /[A-Z]/g,
  url: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:[0-9]{1,5})?(\/[^\s]*)?$/
};

const rule: ruleModel = {
  noInPut: (v: string) => isEmpty(v) || errMessage.noInPut,
  notNull: (v: string) => isNull(v) || errMessage.noNull,
  noArray: (v: []) => isArray(v) || errMessage.noArray,
  noSpace: (v: string) => isSpace(v) || errMessage.noSpace,
  numberOnly: (v: string) => isNumber(v) || errMessage.numberOnly,
  phoneNumber: (v: string) => isPhoneNumber(v) || errMessage.phoneNumber,
  englishOnly: (v: string) => isEnglish(v) || errMessage.english,
  emailOnly: (v: string) => isEmail(v) || errMessage.email,
  countingNumberOnly: (v: string) => isCountingNumber(v) || errMessage.countingNumber,
  cronFormat: (v: string) => ifCron(v) || errMessage.cron,
  noLowerCase: (v: string) => isNoLowerCase(v) || errMessage.lowerCase,
  noUpperCase: (v: string) => isNoUpperCase(v) || errMessage.upperCase,
  lengthPassword: (v: string) => islengthPassword(v) || errMessage.lengthPassword,
  urlFormat: (v: string) => ifUrlFormat(v) || errMessage.urlError,
  noSpaceOnly: (v: string) => isSpaceOnly(v) || errMessage.noSpaceOnly
};

// function
function isEmpty(v: string) {
  return !!v;
}
function isNull(v: string) {
  return v !== null;
}
function isArray(v: []) {
  return v != null && v.length !== 0;
}
function isSpace(v: string) {
  return regex.space.test(v);
}
function isNumber(v: string) {
  return regex.number.test(v);
}
function isPhoneNumber(v: string) {
  return v !== null && v.length === 10;
}
function isEnglish(v: string) {
  return !regex.english.test(v);
}
function isEmail(v: string) {
  return regex.email.test(v);
}
function isCountingNumber(v: string) {
  return regex.countingNumber.test(v);
}
function ifCron(v: string) {
  return regex.cron.test(v);
}
function isNoLowerCase(v: string) {
  let validate: boolean = false;
  if (v !== '' && v !== null && v !== undefined) {
    const match: any = v.match(regex.lowerCase);
    validate = match !== null && match.length !== 0;
  }
  return validate;
}
function isNoUpperCase(v: string) {
  let validate: boolean = false;
  if (v !== '' && v !== null && v !== undefined) {
    const match: any = v.match(regex.upperCase);
    validate = match !== null && match.length !== 0;
  }
  return validate;
}
function islengthPassword(v: string) {
  return v !== null && v !== '' && v.length >= 6;
}
function ifUrlFormat(v: string) {
  return regex.url.test(v);
}

function isSpaceOnly(v: string) {
  if(v !== ""){
    const value: string = v.trim();
    if (value === '') {    
      return false;
    } else {
      return true;
    }
  }else{
    return true
  }
 
}
export { rule, isNoLowerCase, isNoUpperCase, islengthPassword };
