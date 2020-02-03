export const POLLING_INTERVAL = 1000;

export const theme = {
  maxWidth: "1000px"
};

export function roundToTwo(num) {
  const roundedNumber = +(Math.round(num + "e+2") + "e-2");
  return isNaN(roundedNumber) ? "####" : roundedNumber;
}

export const uniqueMergeByProperty = (target, source, prop) => {
  source.forEach(sourceElement => {
    let targetElement = target.find(targetElement => {
      return sourceElement[prop] === targetElement[prop];
    });
    if (targetElement) return Object.assign(targetElement, sourceElement);
  });
  return target;
};
