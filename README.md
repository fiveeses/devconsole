# devconsole

devconsole is an overlay to be injected into the page to allow interaction with programs within the page via a commandline.


## Maintenance

This project is created and maintained by [you].


## Linting

Linting the codebas is done with esLint. (https://eslint.org/)


## Testing

### Single-run sweep through the unit tests
> $ npm run test


## Build and Usage

~~devconsole is not yet automated into a build.  The contents of /src/ are presently the form which this code takes for distribution.~~
**rollup** devconsole is built with rollup. Use `npm run rollup` or `npm run rollumd` for es6 or umd, respectively.

In its current state, devconsole is only usable by es6 module loading.

All major modern desktop browsers in their latest stable versions are capable of this, but I'll own up to the fact that I'm really not paying any attention to anything but Chrome, right now.  IE is incapable of making use of this.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
http://kangax.github.io/compat-table/es6/

### File Inclusion
To use devconsole, you'll first need to include its styles, and its script. 

Link /src/index.css in your html, as you would any stylesheet: `<link href="./src/index.css" rel="stylesheet" />`
Index.js exports the devconsole object literal as its default.  Import it into your es6 module, as best suits your application's use (see mdn import link above).

### Script Execution
Once properly inported, devconsole is added to the page by using: `devconsole.init(target[, className]);`

`target` is an HTMLElement and should have a `Content Model` which is explicitly `Flow Content`. Elements with transparent content models may work, but your milage may vary.  For example, if you plan to associate this with canvas, you really need to make this a sibling within the canvas' ParentNode - try wrapping the canvas in a div or a section, and use that wrapper as your target. (For more on content models, see the w3c html5 spec: https://www.w3.org/TR/html5/dom.html#content-models)

`className` is an optional string to apply to the outer-most element of the devconsole as a class.  At present, style and markup are in the normal DOM, so you can apply your own classes and be successful.  Apart from the default values, devconsole currently provides:
```
(no className - default) - A semi-transparent off-white (a little brighter than white smoke).
                           This works MUCH better with overlayed areas which have dark backgrounds.

csbl - "Southern Teal" - A medium green shade of blue, with brighter font and border colors.
                         An in-code comment describes this as futuristic-looking, but that was me thinking of what I'd 
                         like the scheme to be before I ever gave it a whack.  I'm not great at pulling my ideas for UX
                         from my mindspace and making them happen yet.  That futuristic light blue may come, yet, but
                         just not now, and this isn't it.

csorange - "Orange" - A semi-transparent black background with yellow-orange font and border colors.

cssea - "Sea Glass" - A semi-transparent shade of green, intended to look like sea-polished/fristed green glass.
                      This isn't quite the color I'm looking for, yet

cswhite - "Frosted Glass" - Semi-transparent white, with a bluish-tinted white for font and border colors.
```

Semi-transparency can lead to some extremely low-contrast scenarios.  Colors are likely to change a bit as I play with them.

### Example Use
An example use of devconsole is contained in the project root, in `index.html, test.js, and test.css`.

### Multiple Instances in One Page
It is possible, though not an explicitly endorsed or intended use case for multiple devconsole instances to be created on a single page.  Presently, initializing multiple devconsole instances on the same element, or multiple levels within a single tree within the DOM will cause overlapping, and likely unpleasant effects.  At some point, I may safeguard against any of these facets.  Either way, I wouldn't recommend trying this.


## Documentation

Documentation for this project is generated with esDoc. (https://esdoc.org/)  
It has been integrated into npm commands. You may either simply build the documentation, or build and view it.

### Build documentation
> $ npm run builddoc

### Build and view documentation

This will be automated, but isn't yet. For now, follow the build documentation, then in the "doc/" folder, sibling to source, run the index.html.


## Issues
`Oh no! What have you done? This won't go away...`  Yes, that's right - this isn't a functional item, yet.  At a later point, this will be a modal flyout; however, it is just an always-up overlay at present.


## Maintenance / Contact
This item will be curated by FiveEses on github (https://github.com/fiveeses).
For the time being, I'm purposely not leaving more direct contact information; but I'll be adding Twitter information soon enough.

## Legal Voodoo and Hootenanny (also, license)
The idea for devconsole is not at all unique.  I own no patent or trademark, nor am I aware of anyone else holding such an IP claim.  You can see features similar to this appearing in such software titles as Valve's  Halflife.  The work I'm doing on devconsole's sprouting out of my own grey matter, and I am not lifting code for it.

As such, anyone is free to use this within their sites, as long as the code for the devconsole is unedited, and I'm credited along with a link to my github in a visible and location easily accessible location in close proximity to the devconsole's use.

I'm not a lawyer, so probably if you're determined, you are able to find loop holes around what I'm asking.  But the spirit of what I'm saying is that this is that I reserve all rights to the code in this repository, and wish for its use to be restricted to unaltered code, and for that code to be given obvious attribution if/when it's left within something made available for others' consumption. 

Just be kind.

@ 2019 The person behind the FiveEses github.

Everything in this section applies the class/style switching code in the example/test page, too. 


## Project origin
This project began from the template ***es6template_sssss*** by FiveEses.
* Email **FiveEses <<fiveeses@gmail.com>>**
* FiveEses on [**npmjs.org**](https://www.npmjs.com/~fiveeses)
* FiveEses on [**github**](https://github.com/fiveeses)

### Template contents
The template contains:

	- gulp
	- esdoc
	- eslint
	- karma
	- jasmine
	- rollup


