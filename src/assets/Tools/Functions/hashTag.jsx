export default function hashtag(value) {
  let keywords = "#";
  if (value.includes(",")) {
    return (keywords += value.replaceAll(",", `#`));
  } else return (keywords += value.replaceAll(" ", " #"));
}
