function checkInDOMsContain(arrayDOMs, elementDOM) {
  let isContain = false;

  arrayDOMs.forEach((elementOfArray) => {
    if (elementOfArray.contains(elementDOM)) {
      isContain = true;
    }
  });

  return isContain;
}

export { checkInDOMsContain };
