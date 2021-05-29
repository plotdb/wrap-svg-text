# wrap-svg-text

Generate multiline svg texts directly through a text string and a set of css style. Example:

    wrapSvgText({
        text: "Thank you, Chairman Rayon To Go(聽不懂他的發音人名), Chairman 還有我們President, 還有各位美僑商, 美國商會所有的好朋友, 還有各位新聞界的女士先生."
        style: {
            fontSize: "32px",
            width: "300px",
            whiteSpace: "pre-line"
        }
    });

## Usage

install:

    npm install --save wrap-svg-text

include:

    <script src="path-to-wrap-svg-text.js"></script>


call:

    ret = wrapSvgText({text: '...', style: { ... }});
    myGroup.textContent = ""; /* clear myGroup content */
    myGroup.appendChild(ret)


with prepared div `node` so we don't have to mimic its style ( content inside ):

    ret = wrapSvgText({node: node});
    myGroup.textContent = ""; /* clear myGroup content */
    myGroup.appendChild(ret)


## Options

 - `text`: string. text to render.
 - `style`: object containing styles for rendering above text. optional.
 - `node`: when provided, use this node to layout content.
    - content may be altered due to algorithm in `wrap-svg-text`. check `useRange` for more detail.
    - `node` should contain plain text only. 
    - `text` can be omitted if there are contents already in `node`
    - `style` will be ignored when node is provided.
 - `useRange`: if true, use `document.range` for position calculation. default false. see below.


### useRange

`wrap-svg-text` by default get characters' position by wrapping them in span. however, this may touch node's content if user provide `node` as a paramter when calling `wrap-svg-text`. This may causing re-layout and change the position of elements, leading to incorrect result.

In this case, user can alternatively enable `useRange` and let `wrap-svg-text` calculate the position with `range.getBoundingClientRect`. However, this is 2 times slower so only suggested using for short text.



## Mechanism

wrap-svg-text simply calculates layouts of texts with the help of browser layout engine. Input texts with specified style are added directly in a hidden div, with every single glyph wrapped in span. Then, span are joined based on their y coordinate, and added back as a `<text>` tag in a `<g>` tag, which is returned from `wrapSvgText` function call.


## Note

Layout is calculated directly based on CSS and DOM, thus it's important to make sure that when running wrap-svg-text, CSS and DOM are ready and correctly rendered, otherwise wrap-svg-text may give incorrect result due to style updating.


## Credit

Sample text from '[HolyMosquito](https://www.facebook.com/HolyMosquito/posts/2428227354121577)'s transcription of [Han](https://zh.wikipedia.org/zh-tw/%E9%9F%93%E5%9C%8B%E7%91%9C)'s speech in AmCham Taipei, a good example of English / Chinese mixed context.


## License

MIT
