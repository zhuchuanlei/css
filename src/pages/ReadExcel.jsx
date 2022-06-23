import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import * as XLSX from 'xlsx';

const data = [];

const ReadExcel = (props) => {
  const onImportExcel = (file) => {
    let output_data = undefined;
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = event => {
      const { result } = event.target;
      const workbook = XLSX.read(result, { type: 'binary' });
      const sheet = workbook.Sheets['顾客购买表']
      output_data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      data.push(output_data)

    };
  }
  const onChange = (e) => {
    const noSuccess = e.fileList.find(i => i.status !== "done");
    if (!noSuccess) {
      props.onChangeData(data);
    }
  }
  const onClickClear = () => {
    window.location.reload()
  }

  return (
    <>
    
    <Upload
      maxCount={10}
      multiple={true}
      beforeUpload={onImportExcel}
      onChange={onChange}
    >
      <Button type='primary'>上传</Button>
    </Upload>

<Button onClick={onClickClear}>清除数据</Button>
</>
  );
}
export default ReadExcel;
