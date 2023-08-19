export default function PagesCalculator(total, limit, set) {
  const arrayOfPages = [];

  let nbPages = Math.floor(total / limit);
  if (total % limit !== 0) {
    nbPages++;
  }
  for (let i = 0; i < nbPages; i++) {
    arrayOfPages.push(i + 1);
  }

  return set([...arrayOfPages]);
}
