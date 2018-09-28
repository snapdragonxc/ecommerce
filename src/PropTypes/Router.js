// @flow

export type Location = {
  pathname: string,
};

export type History = {
  action: string,
  block: () => void,
  canGo: () => void,
  createHref: () => void,
  entries: Array<Location>,
  go: () => void,
  goBack: () => void,
  goForward: () => void,
  index: number,
  length: number,
  listen: (callback: (location: Location, action: string) => void) => () => void,
  location: Location,
  push: (string) => void,
  replace: () => void,
};
