// @flow

import React from 'react';

type PictureProps = {
  right: number,
  width: number,
  height: number,
  visibility: string,
  src: string
};

const Picture = ({
  right,
  width,
  height,
  visibility,
  src,
}: PictureProps) => (
  <div className="img" style={{
    right,
    top: '0',
    width,
    height,
    visibility,
    position: 'absolute',
    overflow: 'hidden',
    transition: 'right 0.75s',
  }} >
    <img className="img__content img__content--no-border" src={src} />
  </div>
);
export default Picture;
