import react, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import * as XLSX from 'xlsx';
import ReadExcel from './ReadExcel';
import { onDownload } from './download';
// const sheetHead= {header: ['账号', '使用人', '等级']}
// const sheetHead = { header: 
const header = [
  '下单人',
  '联系电话',
  '收货人',
  '团长备注',
  '团员备注',
  '地址',
];
const commodityCol = [];
let sheetData = [];
const address = ['弄号（如168）', '楼号（如10）', '房号（如606）']

const Index = () => {
  const onChangeData = (values) => {
    const v = values.flat(1);
    formatDataToDownloda(v);
  }
  const formatDataToDownloda = (values) => {
    let data = [];
    values.map(itemValue => {
      if (!commodityCol.includes(itemValue['商品'])) {
        commodityCol.push(itemValue['商品']);
      }
      const hasData = data.find(i => i['联系电话'] === itemValue['联系电话']);
      console.log(hasData)
      if (hasData) {
        hasData[itemValue['商品']] = itemValue['数量']
        return;
      }

      // itemValue['地址'] = `${itemValue[address[0]]}-${itemValue[address[1]]}-${itemValue[address[2]]}`;
      itemValue['地址'] = formatAddress(itemValue); // `${itemValue[address[0]]}-${itemValue[address[1]]}-${itemValue[address[2]]}`;
      const obj = {};
      header.map(key => {
        obj[key] = itemValue[key];
      })
      commodityCol.map(key => {
        if (key === itemValue['商品']) {
          obj[key] = itemValue['数量'];
        }
      })
      data.push(obj)
    })
    sheetData = data.sort((i, j) => { return i['地址'] - j['地址'] ? 1: -1})
  }
  const onClickDown = () => {
    onDownload({ sheetHead: { header }, sheetData })
  }
  const regexp1 = /[0-9]/g;
  const formatAddress = (obj) => {
    const c = address.map(i => {
      let a = obj[i].match(regexp1) || [obj[i]];
      a = a.join('');
      if (a < 10) {
        a = '0' + a;
      }
      return a
    }).join('-');
    return c;
  }



  return <div style={{padding: 20}}>
    <ReadExcel onChangeData={onChangeData} />
    <Button onClick={onClickDown}>导出Excel</Button>
  </div>
}
export default Index;