ns = "http://www.w3.org/2000/svg"

flush = (o) ->
  if isNaN(o.x + o.y) or !o.text => return
  text = document.createElementNS ns, \text
  text.appendChild(document.createTextNode(o.text))
  # -1, +2 : offset between DOM and SVG. should find out why there are differences TODO
  text.setAttribute \x, o.x - 1
  text.setAttribute \y, o.y + 2
  text.setAttribute \dominant-baseline, \hanging
  return text

main = (opt = {}) ->
  {text,style} = opt
  div = document.createElement \div
  div.style <<< {
    opacity: 0
    "pointer-events": \none
    "z-index": 0
    "position": \absolute
    top: 0
    left: 0
  } <<< style
  document.body.appendChild div
  if opt.use-range => # seems slower. default disabled.
    div.innerText = text
    range = document.createRange!
    obj = { text: "", x: NaN, y: NaN }
    texts = []
    for j from 0 til div.childNodes.length =>
      t = div.childNodes[j]
      tt = t.textContent
      for i from 0 til t.length =>
        range.setStart t, i
        range.setEnd t, i + 1
        box = range.getBoundingClientRect!
        if obj.y == box.y =>
          obj.text += tt[i]
        else
          if flush(obj) => texts.push that
          obj.text = tt[i]
          obj <<< box{x,y}

    if flush(obj) => texts.push that
    g = document.createElementNS(ns,"g")
  else
    spans = text.split '' .map (t) ->
      div.appendChild span = document.createElement(\span)
      span.appendChild document.createTextNode(t)
      return span
    obj = { text: "", x: NaN, y: NaN }
    texts = []
    spans.map ->
      box = it.getBoundingClientRect!
      if obj.y == box.y =>
        obj.text += it.textContent
      else
        if flush(obj) => texts.push that
        obj.text = it.textContent
        obj <<< box{x,y}
    if flush(obj) => texts.push that
    g = document.createElementNS(ns,"g")

  texts.map -> g.appendChild it
  document.body.removeChild div
  return g

if module? => module.exports = main 
else if window? => window.wrap-svg-text = main
