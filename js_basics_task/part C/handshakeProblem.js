function getParticipants(handshakes){
    let d = 1 + 4 * 2 * handshakes;
    let farmers = Math.max(Math.ceil((1 + Math.sqrt(d))/2), Math.ceil((1-Math.sqrt(d))/2));
    return farmers;
  }

console.log(getParticipants(0));//, 1)
console.log(getParticipants(1));//, 2)
console.log(getParticipants(3));//, 3)
console.log(getParticipants(6));//, 4)
console.log(getParticipants(7));//, 5)

console.log(getParticipants(15))