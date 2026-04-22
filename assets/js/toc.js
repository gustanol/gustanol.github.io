document.addEventListener("DOMContentLoaded", () => {
	/* The elements */
	const content = document.querySelector(".content");
	const toc = document.getElementById("toc");

	/* Do nothing if they are not there */
	if (!content || !toc) return;

	/* The headings to be placed at TOC */
	const headings = content.querySelectorAll("h2, h3, h4");

	/* Hide the TOC if there's no enough headings */
	if (headings.length === 0) {
		toc.style.display = "none";
		return;
	}

	/* Create a list */
	const ul = document.createElement("ul");

	/* Iterate for each heading in the page */
	headings.forEach((heading) => {
		if (!heading.id) {
			heading.id = heading.textContent
			  .toLowerCase()
			  .replace(/[^\w]+/g, "-");
		}

		/* For each of them, create list object */
		const li = document.createElement("li");
		li.classList.add(`level-${heading.tagName.toLowerCase()}`);

		/* Anchor it */
		const a = document.createElement("a");
		a.href = `#${heading.id}`;
		a.textContent = heading.textContent;

		/* Add them to its parents */
		li.appendChild(a);
		ul.appendChild(li);
	});

	/* Add everything to TOC */
	toc.appendChild(ul);
});
