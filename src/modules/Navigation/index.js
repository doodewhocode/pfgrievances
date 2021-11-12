
let history
export const registerNav = (ref) => {
  console.log("ref", ref)
  history = ref.history
}

const jumpTo = (uri) => {
  history.push(uri)
}
export const go=(uri)=>{
  history.go(uri)
}
export default jumpTo