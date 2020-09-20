declare type ObjectId = string;

declare interface IToken {
  _user: ObjectId;
  client: String;
  token: String;
  created: Number;
}

declare interface IAccessToken extends IToken {}
declare interface IRefreshToken extends IToken {}