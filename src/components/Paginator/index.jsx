// @flow
import React from 'react';

const PAGE_UPPER_LIMIT = 2000;
const PAGE_RANGE = 10;

type PaginatorProps = {
  dec: () => void,
  inc: () => void,
  onClickPage: (page: number) => void,
  curPage: number,
  max: number,
};

const Paginator = ({
  dec,
  inc,
  onClickPage,
  curPage,
  max = PAGE_UPPER_LIMIT,
}: PaginatorProps) => {
  const pages = [];
  const min = 1;
  let range = PAGE_RANGE;
  if (range > max) {
    range = max;
  }
  let start = curPage - Math.floor(range / 2);
  start = Math.max(start, min);
  start = Math.min(start, min + max - range);
  for (let i = start; i < (start + range); i++) {
    pages.push(i);
  }
  if (max === 2000) {
    return <div></div>;
  }
  return (
    <ul className="pagination">
      <li className="pagination__item"><a className="pagination__box" onClick={dec}><span>&lt;</span></a></li>
      {
        pages.map((page, index) => (
          <li key={index + 1} className="pagination__item">
            <a
              className={(curPage === page) ? 'pagination__box active' : 'pagination__box'}
              onClick={() => onClickPage(page)}>
                 {page}
            </a>
          </li>
        ))
      }
      <li className="pagination__item"><a className="pagination__box" onClick={inc}><span>&gt;</span></a></li>
    </ul>
  );
};
export default Paginator;
