import { Rule } from 'antd/es/form'
import React from 'react'
import { SearchOpKey, Search_string2Ops } from './search.entity'

export enum FieldType {
  Input_type = 'input',
  Tree_type = 'tree',
  Select_type = 'select',
  TextArea_type = 'textarea',
  Input_number = 'input_number'
}
export interface prop_field {
  [k: string]: any
  placeholder?: string
}
export class FieldInfo {
  field_name: string = ''
  field_Element: any = null
  label: string = ''
  //这个字段可以进行的操作
  field_operate: number = 0
  SelectOpsRender?: () => React.ReactNode
  //search bar
  search_Element?: any = null
  search_rules?: Rule[] = []
  search_Ops?: SearchOpKey[] = Search_string2Ops
  search_props?: prop_field = {}

  //edit 相关
  edit_rules?: Rule[] = []
  edit_props?: prop_field = {}
}

export function getFileElementName(field?: FieldInfo) {
  if (!field) return ''
  return (field.search_Element || field.field_Element).displayName
}
