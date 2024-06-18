export enum OperateType {
  Add = 'Add',
  Up = 'Up',
  See = 'See',
  Del = 'Del',
  Search = 'Search'
}
export enum OperateCode {
  Add = 0x1,
  Up = 0x2,
  See = 0x4,
  Del = 0x8,
  Search = 0x10
}
export const OperateCode_edit = OperateCode.Up | OperateCode.Add | OperateCode.Del
export const OperateCode_All = ~0
export const OperateCode_View = OperateCode.See | OperateCode.Search
export const OperateCode_NoSearch = OperateCode_All & ~OperateCode.Search
export interface OperateTypeInfo {
  name: string
  op_code: number
  title: string
}

export const OperateTypeList: { [key: string]: OperateTypeInfo } = {
  Add: { name: OperateType.Add, title: '新增', op_code: OperateCode.Add },
  Up: { name: OperateType.Up, title: '修改', op_code: OperateCode.Up },
  See: { name: OperateType.See, title: '查看', op_code: OperateCode.See },
  Del: { name: OperateType.Del, title: '删除', op_code: OperateCode.Del },
  Search: { name: OperateType.Search, title: '搜索', op_code: OperateCode.Search }
}
