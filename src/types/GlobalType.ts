export type Res<T = string> = {
  status: boolean;
  message: string;
  code: number;
  data: T;
};

export type StoreRes<T = null> = { 
  status: boolean;
  message: string;
  code : number;
  data: T;
} 
