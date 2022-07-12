const isAbsolute = (string: string) => {
  const r = new RegExp("^(?:[a-z+]+:)?//", "i");
  return r.test(string);
};

const makeAbsolute = (string: string) =>
  isAbsolute(string) ? string : `http://${string}`;

export { isAbsolute, makeAbsolute };
