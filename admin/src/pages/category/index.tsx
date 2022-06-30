import React, { memo } from 'react';

import {
  CategoryWapper
} from './style'

const Categroy = memo(() => {
  return (
    <CategoryWapper>
      <div className='title'>
        分类列表
      </div>
    </CategoryWapper>
  )
})

export default Categroy