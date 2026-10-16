export const MAP = ['111111111', '1P00C0001', '101110101', '1C0000101', '101010C01', '1000100E1', '111111111'];
export const FLAMES = MAP.flatMap((row,y) => [...row].flatMap((tile,x) => tile === 'C' ? [`${x},${y}`] : []));
export function newGame() { return {x:1,y:1,moves:0,collected:[],facing:'raven',won:false,message:'Collect every flame, then reach the door.'}; }
export function movePlayer(state,dx,dy) {
 if(state.won) return state;
 const x=state.x+dx,y=state.y+dy,tile=MAP[y]?.[x];
 if(!tile || tile === '1') return state;
 if(tile === 'E' && state.collected.length < FLAMES.length) return {...state,message:'The door is locked. Collect every flame first.'};
 const key=`${x},${y}`;
 const collected=tile === 'C' && !state.collected.includes(key) ? [...state.collected,key] : state.collected;
 const won=tile === 'E';
 return {x,y,moves:state.moves+1,collected,facing:dx<0?'raven_left':dx>0?'raven_right':state.facing,won,message:won?'Map cleared! You made it out.':collected.length===FLAMES.length?'All flames collected. The door is open!':'Collect every flame, then reach the door.'};
}
