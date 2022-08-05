const Mover = (Old: string, New: string, State: object, unhighlight: string[]) => {
  let newState: any = {...State};
  [newState[Old],newState[New]] = [newState[New],newState[Old]];
  for (let i in unhighlight){
    newState[unhighlight[i]].highlighted = false;
  }
  return newState;
};

export default Mover;
