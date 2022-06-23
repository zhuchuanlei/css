import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import * as XLSX from 'xlsx';

const ReadExcel = () => {
  const [fileList, setFileList] = useState([]);
  const onImportExcel = (file) => {
    setFileList([file])
    // 获取上传的文件对象
    let data = [];

    let error = [];

    let output_data = undefined;

    const fileReader = new FileReader();

    fileReader.readAsBinaryString(file);

    fileReader.onload = event => {
      const { result } = event.target;
      // 以二进制流方式读取得到整份excel表格对象
      const workbook = XLSX.read(result, { type: 'binary' });
      // 存储获取到的数据

      // 遍历每张工作表进行读取（这里默认只读取第一张表）
      for (const sheet in workbook.Sheets) {
        // esline-disable-next-line
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          // 利用 sheet_to_json 方法将 excel 转成 json 数据
          output_data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { defval: '' }));
          // break; // 如果只取第一张表，就取消注释这行
        }
      }
      console.log(output_data);
      // 最终获取到并且格式化后的 json 数据
      output_data.forEach(ele => {
        Object.keys(ele).forEach(val => {
          if (val.indexOf('EMPTY') === -1) {
            if (ele[val] === '') {
              error.push(`第${ele.__rowNum__}行:${val}为空`)
            }
          } else {
            delete ele[val]
          }
        })
      })
    };
  }

  return (
    <Upload fileList={fileList} beforeUpload={onImportExcel}>
      <Button type='primary'>上传</Button>
    </Upload>

  );
}
export default ReadExcel;
