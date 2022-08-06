const Mover = (
  Old: string,
  New: string,
  State: object,
  unhighlight: string[]
) => {
  let newState: any = { ...State };

  // move to an empty spot
  if (newState[New].type == null) {
    [newState[Old], newState[New]] = [newState[New], newState[Old]];
  } else{
    let emptySpot = { type: null, highlighted: false };
    [newState[Old], newState[New]] = [emptySpot, newState[Old]];
  }

  // unhighlight after the move
  for (let i in unhighlight) {
    newState[unhighlight[i]].highlighted = false;
  }
  return newState;
};

export default Mover;
