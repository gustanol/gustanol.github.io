/* Variable where JSON data will be placed */
let data = [];

/* Fetch it */
fetch('/assets/search.json')
	.then(res => res.json())
	.then(json => data = json);

/* Elements */
const input = document.getElementById('search-input');
const overlay = document.getElementById('search-overlay');
const results = document.getElementById('search-results');
const html = document.documentElement;

/* Open the overlay */
function openSearch() {
	overlay.classList.remove('hidden');
}

/* Close the overlay */
function closeSearch() {
	overlay.classList.add('hidden');
	input.value = '';
}

/* Input event */
input.addEventListener('input', () => {

	/* Open the overlay element now */
	openSearch();

	html.style.overflowY = 'hidden';

	const query = input.value.toLowerCase().trim();

	results.innerHTML = '';

	/* Treat null cases */
	if (!query) {
		closeSearch();
		html.style.overflowY = 'auto';
		return;
	}

	/* Treat flags */
	const isTagSearch = query.startsWith('#');
	const cleanQuery = isTagSearch ? query.slice(1) : query;

	/* Get each match */
	const matches = data.filter(item => {
		if (isTagSearch) {
			return item.tags?.includes(cleanQuery);
		}

		/* Title and tags */
		return (
			item.title.toLowerCase().includes(cleanQuery) ||
			item.tags?.join(' ').toLowerCase().includes(cleanQuery)
		);
	});

	/* For each match, treat it */
	matches.forEach(match => {
		const li = document.createElement('li');

		li.innerHTML = `
			<a href="${match.url}">
			<img src="${match.icon}">
			<div>
				<strong>${match.title}</strong><br/>
				<div>${match.description}</div>
				<div>${match.tags?.join(', ') || ''}</div>
			</div>
			</a>
		`;

		results.appendChild(li);
	});
});

document.addEventListener('keydown', (e) => {

	/* ESC close the overlay element */
	if (e.key === 'Escape') {
		html.style.overflowY = 'auto';
		closeSearch();
	}
});

document.addEventListener("click", (e) => {
	const box = document.querySelector(".search-box");

	/* Treat mouse clicks outside the element */
	if (!box.contains(e.target) && !input.contains(e.target)) {
		html.style.overflowY = 'auto';
		closeSearch();
	}
});
