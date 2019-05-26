import { devconsole, clog } from "lib/devconsole.js";

(function iife() {

    // arrange
    const layout = document.getElementById("layout");
    const target = document.getElementById("target");
    const side = document.getElementById("side");

    // arrange style switcher
    const stylediv = document.createElement("section");

    function createSwitcherSpans() {
        return [document.createElement("span"), document.createElement("span"), document.createElement("span")];
    }

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

    // make the dev console
    const dc = devconsole.init(target, "csbl", true);
    const dcTwo = devconsole.init(side, "csbl", true);

    // apply style switcher
    const ct = [
        ["body", (createSwitcherSpans()), bc, (document.body), true],
        ["console", (createSwitcherSpans()), cc, dc, true],
        ["side console", (createSwitcherSpans()), cc, dcTwo, true]
    ];

    ct.forEach((data) => { applyClassSwitcher(...data); });

    document.body.insertBefore(stylediv, layout);

    stylediv.append(
        document.createTextNode("press ` to toggle the devconsole")
    );
    function handleKeyup(e) {
        switch(e.key) {
            case "`" : { dc.toggle(); } break;
            case "=" : { dcTwo.toggle(); } break;
        }
        return e;
    };
    document.body.addEventListener("keyup", handleKeyup);

    function handle(str) {
        return this.enterLine(`handle: ${str}`);
    }
    dc.addTab({ execute: handle, title: "Secondary Tab"});

    document.body.focus();
}());

// eof