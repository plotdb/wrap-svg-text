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
  style = opt.style or {}
  text = opt.text or ''
  if opt.node =>
    div = opt.node
    if !text => text = div.textContent
    div.textContent = ""
  else
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

  if opt.use-range =>
    # seems slower, but doesn't modify DOM. default disabled.
    div.innerText = text
    divbox = div.getBoundingClientRect!
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
        if obj.y == box.y - divbox.y =>
          obj.text += tt[i]
        else
          if flush(obj) => texts.push that
          obj.text = tt[i]
          obj.x = box.x - divbox.x
          obj.y = box.y - divbox.y

    if flush(obj) => texts.push that
    g = document.createElementNS(ns,"g")
  else
    spans = text.split '' .map (t) ->
      div.appendChild span = document.createElement(\span)
      span.appendChild document.createTextNode(t)
      return span
    divbox = div.getBoundingClientRect!
    obj = { text: "", x: NaN, y: NaN }
    texts = []
    spans.map ->
      box = it.getBoundingClientRect!
      if obj.y == box.y - divbox.y =>
        obj.text += it.textContent
      else
        if flush(obj) => texts.push that
        obj.text = it.textContent
        obj.x = box.x - divbox.x
        obj.y = box.y - divbox.y
    if flush(obj) => texts.push that
    g = document.createElementNS(ns,"g")

  texts.map -> g.appendChild it
  if !opt.node => document.body.removeChild div
  else div.textContent = div.textContent
  return g

if module? => module.exports = main 
else if window? => window.wrap-svg-text = main
