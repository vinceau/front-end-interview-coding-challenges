// Checks if a node is fully visible
const fits = (child) => {
    const parent = child.parentNode;
    const parentWidth = parent.getBoundingClientRect().width;
    return child.getBoundingClientRect().width + child.offsetLeft < parentWidth;
}

// Splits text into lines
const splitLines = (el) => {
    // Keep track of the lines
    var completeSet = [];
    while (el.childNodes.length > 0) {
        var set = [];
        // Move all the nodes which fit on screen into `set`
        for (var i = 0; i < el.childNodes.length && fits(el.childNodes[i]); i++) {
            set.push(el.childNodes[i]);
        };

        // Create a div with all those elements
        const d = document.createElement("div");
        d.classList.add("line");
        d.style.animationDelay = `${completeSet.length * 0.05}s`;
        set.map(e => {
            el.removeChild(e);
            d.appendChild(e);
        });
        completeSet.push(d);
    }
    completeSet.map(e => el.appendChild(e));
}

// Adds listeners.
// This is because if we just use CSS :hover states,
// the animation might not finish before the mouseexit event.
const addListeners = (el) => {
    el.addEventListener("mouseenter", () => {
        el.classList.add("animate");
    });
    el.addEventListener("webkitAnimationEnd", () => {
        el.classList.remove("animate");
    });
}

const main = () => {
    const el = document.querySelector("h2");
    const words = el.textContent.trim().split(/[ ,]+/);
    // Empty the children
    el.innerHTML = "";

    // Surround each word with a span
    words.map(word => {
        const node = document.createElement("span");
        node.innerText = word;
        el.appendChild(node);
    });

    splitLines(el);
    addListeners(el);
}

main();
