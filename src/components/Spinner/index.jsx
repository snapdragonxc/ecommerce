// @flow
import React from 'react';

type SpinnerProps = {
  value: number,
  sub: () => void,
  add: () => void,
};

export function Spinner({
  value,
  sub,
  add,
}: SpinnerProps) {
  return (
    <span className="widget__spinner">
      <span className="widget__spinner-sub" onClick={sub}>-</span>
      <span className="widget__spinner-input">{value}</span>
      <span className="widget__spinner-add" onClick={add}>+</span>
    </span>
  );
}

export function SmallSpinner({
  value,
  sub,
  add,
}: SpinnerProps) {
  return (
    <span className="widget__spinner">
      <span className="widget__spinner-sub widget__spinner-sub--small" onClick={sub}>-</span>
      <span className="widget__spinner-input widget__spinner-input--small">{value}</span>
      <span className="widget__spinner-add widget__spinner-add--small" onClick={add}>+</span>
    </span>
  );
}
