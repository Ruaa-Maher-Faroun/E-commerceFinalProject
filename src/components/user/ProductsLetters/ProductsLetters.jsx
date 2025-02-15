
export default function ProductsLetters({word}) {
  if(word.length > 24){
    return word.slice(0, 24) + '...';
  }
    return word;
}
