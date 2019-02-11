import devconsole from "./src/index.js";
function log(...params) {
    const c = console;
    c.log(`[${Date.now()}] DC`, ...params);
}

(function iife() {
    log("iife()");

    // arrange
    const target = document.getElementById("target");

    // arrange style switcher
    const stylediv = document.createElement("section");
    const bodyClasses = [document.createElement("span"), document.createElement("span"), document.createElement("span")];
    const consoleClasses = [document.createElement("span"), document.createElement("span"), document.createElement("span")];
    const bc = [["Default", null],["Ultima II", "u2"],["Inverse UII", "iu2"]];
    const cc = [["Default", null],["Orange","csorange"],["Southern Teal","csbl"],["Frosted Glass","cswhite"],["Sea Glass","cssea"]];
    function applyClassSwitcher(desc, switchElements, classes, affectedElement, checkDefault) {
        const vars = {
            selected: null,
            elements: []
        };
        function toggleClass(index) {
            // remove current selection from affectedElement
            let selected = vars.selected;
            vars.selected = null;
            if ((typeof selected === "number") && (selected < vars.elements.length) && (0 <= selected)) {
                // element styling
                const removeClassName = classes[selected] && classes[selected][1];
                if (removeClassName) {
                    affectedElement.classList.remove(removeClassName);
                }
                // selector styling
                const unstyle = vars.elements[selected].style;
                unstyle.fontWeight = null;
                unstyle.textDecoration = null;
                unstyle.color = null;
            }
            // select index if index != selectedClass
            if (selected !== index) {
                vars.selected = index;
                // element styling
                const addClassName = classes[index] && classes[index][1];
                if (addClassName) {
                    affectedElement.classList.add(addClassName)
                }
                // selector styling
                console.log(this === vars.elements[index], vars.elements[index], this);
                const style = vars.elements[index].style;
                style.fontWeight = "600";
                style.textDecoration = "none";
                style.color = "inherit";
            } else { 
                toggleClass(0);
            }
        }
        switchElements[0].innerText = `${desc} style: [`;
        switchElements[2].innerText = "]";
        const fill = switchElements[1];
        let defaultClass = -1;
        classes.forEach((c, i) => {
            if (c[1] && affectedElement.classList.contains(c[1])) {
                // if (defaultClass === -1) {
                    defaultClass = i
                    // nevermind the other comments, I'm switching to LIFO
                //} else {
                //    defaultClass = -2; // bail to default if multiple of the desired classes already are applied to affectedElement
                //}
            }
            const el = document.createElement("a");
            el.setAttribute("href", `javascript:// Toggle application of "${c[0]}" styles to "${desc}"`);
            el.addEventListener("click", toggleClass.bind(el, i));
            el.innerText = c[0];
            vars.elements.push(el);
            fill.appendChild(el);
            if (i < (classes.length - 1)) {
                const comma = document.createElement("span");
                comma.innerText = ", ";
                fill.appendChild(comma);
            }
        });
        stylediv.append(...switchElements, document.createElement("br"));
        toggleClass((checkDefault && (defaultClass > -1)) ? defaultClass : 0);
    }

    // act
    log("initializing devconsole(target)", devconsole, target);
    // make the dev console
    const dc = devconsole.init(target, "csbl");
    // apply style switcher
    const ct = [["body", bodyClasses, bc, (document.body), true],["console", consoleClasses, cc, dc, true]];
    ct.forEach((data) => { applyClassSwitcher(...data); });
    document.body.insertBefore(stylediv, target);

    log("end iife");
}());

// eof