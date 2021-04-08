declare namespace API {
  //http请求结果
  export interface Response {
    data: ResponseData;
    errMsg: string;
    statusCode: number;
    header: any;
  }

  //API接口返回数据
  export interface ResponseData {
    code: number;
    data: any;
    status: string;
  }

  export interface Error extends ErrorConstructor {
    code: number;
    text: string;
    data: any;
    status: string;
  }
}
