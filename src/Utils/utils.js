function compose(a,b)
{
  return function(c){
    return a(b(c));
  };
}
const deepCopy = compose(JSON.parse,JSON.stringify);

export default deepCopy;