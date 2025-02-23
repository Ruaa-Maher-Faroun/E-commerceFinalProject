
export default function ProductsLetters({word,number}) {
  if(word.length > number){
    return word.slice(0, number) + '...';
  }
    return word;
}
