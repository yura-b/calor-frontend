import React, { useState } from 'react';
import style from '@/PurchasedGoods.module.scss';
import purchasedGoodsImg from '@assets/cartImages/purchasedGoodsImg.svg';
import deleteIcon from '@/assets/cartImages/deleteIcon.svg'

interface Props {
    title: string;
    // onClose: () => void;
  }
  
  const PurchasedGoods: React.FC<Props> = (): React.ReactElement => {
    const [count, setCount] = useState(1);
    const incrementCount = () => {
      setCount(prevCount => prevCount + 1);
    };
  
    const decrementCount = () => {
      if (count > 0) {
        setCount(prevCount => prevCount - 1);
      }
    };
    const purchasedGoodsArr = [0];
    return (
     
            <div className={style.purchasedGoodsCard}>
              <div><img src={purchasedGoodsImg} /></div>
              <div style={{width: '100%'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems: 'center'}}>
                  <p className={style.title}>Sunrise</p>
                  <div><img src={deleteIcon} /></div>
                </div>
                <div style={{marginTop: '10px'}}><span style={{fontWeight: 'bold'}}>Size:</span> 38</div>
                <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center', fontWeight: 'bold' }}>
                  <p>$ XXX</p>
                  <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center', minWidth:'50px', marginTop:'10px' }}>
                  <div onClick={decrementCount}>-</div>
                  <div><span>{count}</span></div>
                  <div onClick={incrementCount}>+</div>
                  </div>
                </div>
                <p>This product is custom-made and delivered to you in X weeks.</p>
              </div>
            </div>
           
     
    );
  };
  
  export default PurchasedGoods;