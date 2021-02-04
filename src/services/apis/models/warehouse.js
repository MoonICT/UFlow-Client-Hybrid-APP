/**
 * [창고등록] 임대계약 모델
 * */
export const WarehouseKeepsModel = {
  typeCode: "", // "0001", 창고유형 // required
  calUnitDvCode: "", //"CU01", 정산단위 // required
  calStdDvCode: "", // "CS03", 정산기준 // required
  mgmtChrgDvCode: "", // "0001",
  usblYmdFrom: null, //1606310400000,
  usblYmdTo: null, // 1606316400000,
  usblValue: "", //10, // 전용면적
  cmnArea: "", //100, // 공용면적
  splyAmount: "", //100000, // 임대단가
  mgmtChrg: "", //100000, // 관리단가
  remark: "", //"비고란.." // 비고
}

/**
 * [창고등록] 수탁계약 모델
 * */
export const WarehouseTrustsModel = {
  typeCode: "", // 창고유형
  calUnitDvCode: "", // 정산단위
  calStdDvCode: "", // 정산기준
  usblYmdFrom: null, // 가용일자 from
  usblYmdTo: null, // 가용일자 to
  usblValue: "", // 가용수치
  cmnArea: "", // 공용면적
  splyAmount: "", // 보관비
  whinChrg: "", // 입고비
  whoutChrg: "", // 출고비
  psnChrg: "", // 인건비
  mnfctChrg: "", // 가공비
  dlvyChrg: "", // 택배비
  shipChrg: "", // 운송비
  remark: "" // 비고
}

/**
 * [창고등록] 층별상세 모델
 * */
export const WarehouseFloorsModel = {
  flrDvCode: "", // 층 수
  flrArea: "", // 층면적
  opcArea: "", // 사무실면적
  parkArea: "", // 주차장면적
  prvtArea: "", // 전용면적
  cmnArea: "", // 공용면적
  flrHi: "", // 층고
  efctvHi: "", // 유효고
  aprchMthdDvCode: "", // 접안방식
  dockQty: "" // 도크 수
}

/**
 * [창고등록] 창고 모델
 * */
export const WarehouseModel = {
  name: "", // required
  description: "", // required
  entrpNo: "", // 사업자번호 required
  // telNo: "",
  // cnsltPossYn: true,
  // sttsDbCode: "0001",
  // vrfctFailReason: "",
  // 주소정보
  address: {
    zipNo: "", // required
    sidoName: "", // required
    skkCd: "", // required
    skkName: "", // required
    bjdongCd: "", // required
    bjdongName: "", // required
    hjdongCd: "", // required
    hjdongName: "", // required
    roadNmCd: "", // required
    address: "", // required
    detail: "" // required
  },
  roadAddr: {
    zipNo: "", // required
    address: "", // required
    detail: "" // required
  },
  gps: {
    latitude: 0, // required
    longitude: 0 // required
  },
  // 추가 정보.
  cmpltYmd: null, // 준공일자
  prvtArea: "", // 전용면적
  siteArea: "", // 대지면적
  cmnArea: "", // 공용면적
  bldgArea: "", // 건축면적
  totalArea: "", // 연면적
  addOptDvCodes: [], // 추가옵션
  insrDvCodes: [], // 보험 가입 여부
  floors: [
    // {
    //   flrDvCode: "F1", // 층 수
    //   flrArea: 100, // 층면적
    //   opcArea: 100, // 사무실면적
    //   parkArea: 100, // 주차장면적
    //   prvtArea: 100, // 전용면적
    //   cmnArea: 100, // 공용면적
    //   flrHi: 10, // 층고
    //   efctvHi: 15, // 유효고
    //   aprchMthdDvCode: "0001", // 접안방식
    //   dockQty: 2 // 도크 수
    // }
  ],
  thImages: [
    // { name: "/temp/F.JPEG" },
  ],
  whImages: [
    // { name: "/temp/B.JPEG" },
    // { name: "/temp/C.JPEG" },
    // { name: "/temp/D.JPEG" },
    // { name: "/temp/E.JPEG" },
    // { name: "/temp/F.JPEG" },
  ],
  pnImages: [
    // { name: "/temp/A.JPEG" }
  ],
  keeps: [
    // {
    //   typeCode: "", // "0001",
    //   calUnitDvCode: "", //"CU01",
    //   calStdDvCode: "", // "CS03",
    //   mgmtChrgDvCode: "", // "0001",
    //   usblYmdFrom: "", //1606310400000,
    //   usblYmdTo: "", // 1606316400000,
    //   usblValue: "", //10, // 전용면적
    //   cmnArea: "", //100, // 공용면적
    //   splyAmount: "", //100000, // 임대비
    //   mgmtChrg: "", //100000, // 관리비
    //   remark: "", //"비고란.." // 비고
    // }
  ],
  trusts: [
    // {
    //   typeCode: "0001",
    //   calUnitDvCode: "CU03",
    //   calStdDvCode: "CS01",
    //   usblYmdFrom: 1606310400000, //
    //   usblYmdTo: 1606316400000, //
    //   usblValue: 20,
    //   cmnArea: 300,
    //   whinChrg: 100000,
    //   whoutChrg: 200000,
    //   psnChrg: 200000,
    //   mnfctChrg: 200000,
    //   dlvyChrg: 2000,
    //   shipChrg: 2000,
    //   remark: "비고란.."
    // }
  ]
}

/**
 * [창고등록] 창고주 등록 모델
 * */
export const WarehouseProprietorInfo = {
  name: '', //{ 사업자 명 },
  repreNm: '', // { 대표자 명 },
  inchgNm: '', // { 담당자 명 },
  position: '', // { 직함 },
  corpNumber: '', //{ 법인 등록번호 },
  number: '', //{ 사업자번호 },
  regFile: '', //{ 사업자등록증 파일명 },
  phone: '', // { 담당자 휴대폰번호 },
  email: '', //{ 담당장 이메일 },
  taxBillEmail: '', //{ 세금계산서 이메일 },
  jibunAddr: {
    zipNo: "",
    address: "",
    detail: ""
  },
  roadAddr: {
    zipNo: "",
    address: "",
    detail: ""
  },
  gps: {
    latitude: '',
    longitude: ''
  }
}
/**
 * [창고검색] 필터 모델
 * */
export const WarehouseSearchFilterModel = {
  /** Default */
  query: '',
  startDate: '',
  endDate: '',
  size: 20,
  page: 0,
  sort: 'createdDate,desc',

  /** Filter */
  typeCodes: '', // 임대/수탁 KEEP/TRUST (,구분)
  gdsKeepTypeCodes: '', // 상품보관형태 WHRG0001 (,구분)

  keepFrom: '', // YYYY-MM-DD
  keepTo: '', // YYYY-MM-DD
  trustFrom: '', // YYYY-MM-DD
  trustTo: '', // YYYY-MM-DD

  splyAmount: '', // Trust : 임대비 max
  mgmtChrg: '', // Keep : 관리비 max
  whinChrg: '', // Trust : 입고비 max
  whoutChrg: '', // Trust: 출고비 max

  prvtArea: '', // Master : 전용면적 max
  cmnArea: '', // Master, Trust, Keep : 공용면적 max

  siteArea: '', // Master : 대지면적 max
  bldgArea: '', // Master : 건축면적 max
  totalArea: '', // Master : 연면적 max
  flrDvCodes: '', // WHRG0010 층 구분 (복수) (,구분)
  flrHi: '',//  Floor : 층고 max
  cmpltYmds: '', // Master: 준공일자 (,구분) A,B,C
  aprchMthdDvCodes: '', // Floor : WHRG0011 접안 방식 (복수) (,구분)
  insrDvCodes: '', // Master : WHRG0009 보험 (복수) (,구분)
  calUnitDvCodes: '', // Trust/Keep : WHRG0013 정산단위구분 (복수) (,구분)
  calStdDvCodes: '', // Trust/Keep : WHRG0014 산정기준(정산기준구분) (복수) (,구분)

  /** Map */
  latitude: 37.56681068671429,
  longitude: 126.97864660315285,
  distance: 10,
}

/**
 * [창고상세] 임차인 등록 모델
 * */
export const WarehouseTenantInfo = {
  name: '', //{ 사업자명 },
  repreNm: '', //{대표자명},
  inchgNm: '', //{담당자명},
  position: '', // { 직함 },
  corpNumber: '', //{ 법인등록번호 },
  number: '', //{ 사업자번호 },
  regFile: '', //{ 사업자등록증파일명 },
  phone: '', // { 사업자전화번호 },
  email: '', //{ 담당장이메일 },
  taxBillEmail: '', //{ 세금계산서이메일 },
  jibunAddr: {
    zipNo: '', //{ 지번우편번호 },
    address: '', //{ 지번 주소 },
    detail: '', //{ 지번 상세 주소 }
  },
  roadAddr: {
    zipNo: '', //{ 도로명우편번호 },
    address: '', //{ 도로명주소 },
    detail: '', //{ 도로명 상세 주소 }
  },
  gps: {
    latitude: '', //{ 위도 },
    longitude: '', // { 경도 }
  }
}

/**
 * [견적요청] 임대 견적 요청
 * */
export const RequestKeepQuotationModel = {
  idWarehouse: '', // 창고 ID
  seq: '',
  from: null, // 임대기간
  to: null, // 임대기간
  rntlValue: '', // 임대수치(요청면적)
  splyAmount: '', // 임대료(임대단가)
  mgmtChrg: '', // 관리비(관리단가)
  remark: '', // 추가요청사항.
}

/**
 * [견적요청] 수탁 견적 요청
 * */
export const RequestTrustQuotationModel = {
  idWarehouse: '', // 창고 ID
  seq: 0,
  from: null, // 수탁기간
  to: null, // 수탁기간
  rntlValue: 0, // 가용수치(수탁 요청 수량)
  splyAmount: 0, // 보관비(필수)
  whinChrg: 0, // 입고비 (필수)
  whoutChrg: 0, // 출고비 (필수)
  psnChrg: 0, // 인건비(선택) - 창고주가 입력 했을 시 입력가능
  mnfctChrg: 0, // 가공비(선택) - 창고주가 입력 했을 시 입력가능
  dlvyChrg: 0, // 택배비(선택) - 창고주가 입력 했을 시 입력가능
  shipChrg: 0, // 운송비(선택) - 창고주가 입력 했을 시 입력가능
  // gdsTypeCode: '', // 상품유형코드 @Deprecated
  // gdsHgt: 0, // 상품높이 @Deprecated
  remark: '' // 추가요청사항
}
