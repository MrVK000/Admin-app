

export interface IEmployee {
  id?: number,
  admin_id?: number,
  name?: string,
  gender?: string,
  job?: string,
  profile_img?: null,
  profile_picture?: string,
  count?: number
}

export interface IUserJobList {
  [key: string]: number
}

export interface IResponseObj {
  recordsets?: IEmployee[],
  recordset?: IEmployee[],
  output?: {},
  rowsAffected?: number[]
}

export interface IResponse {
  email: string,
  admin_id: number,
  first_name: string,
  last_name: string,
  token: string
}



