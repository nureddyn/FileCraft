import React from 'react';
import { useLocation } from 'react-router-dom';

export default function FunctionPage() {
  const location = useLocation();
  const title = location.state.title;
  
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}
