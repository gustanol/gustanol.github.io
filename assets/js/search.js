/* The JSON content will be put in here */
let data = [];

/* Fetch the JSON file with the page information */
fetch('/assets/search.json')
  .then(res => res.json())
  .then(json => data = json);

/* The elements */
const input = document.getElementById('search-input');
const results = document.getElementById('search-results');

/* Handle the input event */
input.addEventListener('input', () => {
  const query = input.value.toLowerCase();

  results.innerHTML = '';

  /* Try to matches the search expressions */
  const matches = data.filter(item =>
    item.title.toLowerCase().includes(query)
  ).slice(0, 10);

  /* For each match, add to the result element */
  matches.forEach(match => {
    const el = document.createElement('div');
    el.innerHTML = `<a href="${match.url}">${match.title}</a>`;
    results.appendChild(el);
  });
});
