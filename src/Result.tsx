import React from 'react';
import { useSearchParams } from 'react-router-dom';

function ResultContents() {
  const [search] = useSearchParams();

  // eslint-disable-next-line no-console
  console.log(search);
  if (Array.from(search.values()).length === 0) return <>없음</>;

  return <>{search.get('number')}</>;
}

function Result() {
  return (
    <div>
      <h2>결과</h2>
      <ResultContents />
    </div>
  );
}

export default Result;
