import React, { memo } from 'react';

import {
  HerosWapper
} from './style';
import HerosTable from '../../components/herosTable';


const Heros = memo(() => {

  // binding events

  return (
    <HerosWapper>
      <div className='title'>
        ่ฑ้ๅ่กจ
      </div>
      <div className='content'>
        <HerosTable />
      </div>
    </HerosWapper>
  )
})

export default Heros