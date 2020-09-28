import React from 'react';
import CheckoutList from '../components/checkoutList/CheckoutList';

const fakeList = [
  { id: 1, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', side: 'N/A' },
  { id: 2, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', side: 'N/A' },
  { id: 3, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', side: 'N/A' },
  { id: 4, name: 'Chucky Doll', date: '01/01/2021', mode: 'browser safe', checkoutDelay: 500, color: 'N/A', side: 'N/A' }
];

export default function AnalyticsPage() {
  return (
    <div className="analytics-page">
      <CheckoutList checkoutList={[]} />
    </div>
  );
}
