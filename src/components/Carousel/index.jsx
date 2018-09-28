// @flow

import React, { Component } from 'react';
import Banner from './Banner';
import Picture from './Picture';

type Item = {
  visibility: string,
  right: number,
  src: string,
}

type CarouselState = {
  items: Array<Item>,
  initialPos: number,
};

type CarouselProps = {
  imgs: Array<string>,
  width: number,
  height: number,
};

class Carousel extends Component<CarouselProps, CarouselState> {
  timerID: IntervalID

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      items: props.imgs.map((item, index) => ({
        visibility: 'visible',
        right: props.width * (1 - index),
        src: item,
      })),
      initialPos: -1 * props.width * (props.imgs.length - 2),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() { // used with changing banner
    const items = this.state.items.concat();
    items.forEach((item) => {
      if (item.right === this.props.width) { // return item to end of list. Hide whilst moving
        item.right = this.state.initialPos;
        item.visibility = 'hidden';
      } else {
        item.right += this.props.width;
        item.visibility = 'visible';
      }
    });

    this.setState({ items });
  }

  render() {
    const { width, height } = this.props;
    const { items } = this.state;
    return (
      <section className="banner" style={{ width, height }}>
        { items.map((item, index) => (
          <Picture
            key={index}
            width={width}
            height={height}
            src={item.src}
            visibility={item.visibility}
            right={item.right}
          />))
        }
        <Banner />
      </section>
    );
  }
}

export default Carousel;
