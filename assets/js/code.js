document.addEventListener("DOMContentLoaded", () => {

	/* Select all code blocks */
	const blocks = document.querySelectorAll("pre > code");

	blocks.forEach((code) => {
		const pre = code.parentElement;

		/* Create wrapper */
		const wrapper = document.createElement("div");
		wrapper.className = "codeblock";

		/* Create header */
		const header = document.createElement("div");
		header.className = "codeblock-header";

		/* Language label */
		const lang = code.className.match(/language-(\w+)/);
		const label = document.createElement("span");
		label.className = "codeblock-lang";
		label.textContent = lang ? lang[1] : "text";

		/* Copy button */
		const button = document.createElement("button");
		button.className = "codeblock-copy";
		button.innerHTML = '<svg class="icon"><use href="#icon-copy"></use></svg>';

		button.addEventListener("click", () => {
			navigator.clipboard.writeText(code.textContent);
			button.textContent = "copied!";
			setTimeout(() => (button.innerHTML = '<svg class="icon"><use href="#icon-copy"></use></svg>'), 1500);
		});

		// Assemble header
		header.appendChild(label);
		header.appendChild(button);

		// Insert into DOM
		pre.parentNode.insertBefore(wrapper, pre);
		wrapper.appendChild(header);
		wrapper.appendChild(pre);
	});
});
