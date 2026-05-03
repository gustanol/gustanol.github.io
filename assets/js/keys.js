document.addEventListener("DOMContentLoaded", () => {

	/* The elements to be modified */
	const content = document.querySelector(".main-content");
	const headings = Array.from(content.querySelectorAll("h2, h3, h4"));
	const search = document.getElementById("search-input");

	/* Global variables */
	let currentIndex = 0;
	let lastKey = null;

	/* Helper function to scroll to a specific heading */
	function goToHeading(index) {
		  if (index < 0 || index >= headings.length) return;

		  const id = headings[index].id;
		  if (!id) return;

		  window.location.hash = id;
	}

	function getCurrentHeadingIndex() {
		let index = 0;

		headings.forEach((h, i) => {
			const rect = h.getBoundingClientRect();
			if (rect.top <= 120) {
				index = i;
			}
		});

		return index;
	}

	document.addEventListener("keydown", (e) => {

		// Ignore typing in inputs
		if (document.activeElement.tagName === "INPUT") return;

		/* Vim-style double key (gg) */
		if (lastKey === "g" && e.key === "g") {
			window.scrollTo({ top: 0, behavior: "smooth" });
			lastKey = null;
			return;
		}

		lastKey = e.key;

		switch (e.key) {
			case "j":
				window.scrollBy({ top: 80, behavior: "smooth" });
				break;

			case "k":
				window.scrollBy({ top: -80, behavior: "smooth" });
				break;

			case "G":
				window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
			break;

			case "n":
				goToHeading(getCurrentHeadingIndex() + 1);
				break;

			case "p":
				goToHeading(getCurrentHeadingIndex() - 1);
				break;

			case "/":
				e.preventDefault();
				if (search) search.focus();
				break;
		}
	});

	function highlightTOC() {
		const links = document.querySelectorAll(".toc a");
		const current = getCurrentHeadingIndex();

		links.forEach((link, i) => {
			link.classList.toggle("active", i === current);
		});
	}

	window.addEventListener("scroll", highlightTOC);
});
