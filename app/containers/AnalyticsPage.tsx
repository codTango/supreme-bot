import React, { useState } from 'react';
import CheckoutList from '../components/checkoutList/CheckoutList';
import CheckoutContent from '../components/checkoutContent/CheckoutContent';

const fakeList = [
  { _id: 1, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', side: 'N/A', totalSpent: 1123.45, totalCheckouts: 123, totalDeclines: 123 },
  { _id: 2, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', side: 'N/A' },
  { _id: 3, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', side: 'N/A' },
  { _id: 4, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', side: 'N/A' }
];

export default function AnalyticsPage() {
  const [ selectedId, setSelectedId ] = useState('');
  const [ selectedCheckout, setSelectedCheckout ] = useState({});

  const handleSelect = async (id) => {
    // const data = await db.findOne('profiles', { _id: id });


      setSelectedId(id);
      // setSelectedCheckout(data);
  }

  return (
    <div className="analytics-page">
      <CheckoutList
        checkoutList={fakeList}
        onSelect={handleSelect}
        selectedId={selectedId}
      />
      <CheckoutContent />
    </div>
  );
}
