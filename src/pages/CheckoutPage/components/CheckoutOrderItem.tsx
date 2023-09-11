import React from 'react';

const CheckoutOrderItem = () => {
  return (
    <div>
      <h3 className="font-bold mt-5">Order № XXX</h3>
      <p className="text-[#A7A7A7]">Date </p>
      <hr className="lg:hidden mt-3 mb-3" />
      <div className="flex">
        <div>
          Item Name Qty:x <br /> Color: Color Name / Category
        </div>
        <div className="ml-10">$ XXX</div>
      </div>
      <hr className="lg:hidden mt-3 mb-3" />
    </div>
  );
};

export default CheckoutOrderItem;
