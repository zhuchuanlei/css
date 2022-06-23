import react from 'react';
import { Upload, Button, message } from 'antd';
import * as XLSX from 'xlsx';
import ReadExcel from './ReadExcel';

const Index = () => {
  console.log('更新')
  return <div>
    <ReadExcel />
  </div>
} 
export default Index;