var view;
view = new ldView({
  root: document.body,
  initRender: false,
  handler: {
    "inplace-div": function(){},
    "inplace-svg": function(arg$){
      var node, t1, ret;
      node = arg$.node;
      t1 = Date.now();
      ret = wrapSvgText({
        node: view.get('inplace-div')
      });
      node.appendChild(ret);
      return console.log("inplace mode: elapsed time: ", Date.now() - t1);
    },
    svg: function(arg$){
      var node, t1, i$, i, ret;
      node = arg$.node;
      t1 = Date.now();
      for (i$ = 0; i$ < 1; ++i$) {
        i = i$;
        node.appendChild(ret = wrapSvgText({
          useRange: true,
          style: {
            width: (node.getBoundingClientRect().width - 40) + "px",
            whiteSpace: 'pre-line'
          },
          text: "Thank you, Chairman Rayon To Go(聽不懂他的發音人名), Chairman 還有我們President, 還有各位美僑商, 美國商會所有的好朋友, 還有各位新聞界的女士先生.\n\n今天中午, 非常榮幸受到美國商會的邀請來這裡做一場, 從高雄市政到台灣未來的短短的演講. 這個一場的演講對我來說是不可思議的奇幻之旅, 因為38年前 當我在大學讀書的時候, while I was the freshmale (freshman) of the college。 晚上上班就在American Club (美國人商會) 白天是student 晚上是 American Club, Security Guard (用security 就行了)\n\n所以門進來 第一個就看到我了  I just sit there (我就坐在那裡) and check the card 然後看一下你是不是member(會員) if you are not member, please just go away (如果你不是會員請離去)\n\n所以我的tuition in the fee(很好的文法XD, 講tuition就可) 我的大學的生活費 都是American Champer(應該是Chamber) pay me（美國人商會付給我) (應該要用pay to me)\n\n然後一直讀一直讀, 邊讀大學, 邊在American Club 所以在那個38年之前, 的心情工作跟今天的感覺截然不同 那個時候我們一個窮學生, 騎著一台野狼摩托車, 然後看到American Chamber 的會員進來, 哇! 都是感覺大老闆來了, 大老闆被刮死(聽不懂), 今天再來, 感覺跟各位 big boss  (感謝底下大大破譯出來XD)\n\n美國商界企業界在台灣的好朋友共聚於一堂 這個事對我來講是一個很奇幻的一場演講,這在38年以前來講這是不可思議的,不可思議的，所以說跟美國商會, 所以說跟美國商會結緣應該是很久以前就結緣, 所以再一次感謝美國商會今天熱情的邀請, 而且特別重要! 非政治性的演講. 謝謝"
        }));
      }
      ret.setAttribute('transform', "translate(20,20)");
      return console.log("js mode: elapsed time: ", Date.now() - t1);
    }
  }
});
setTimeout(function(){
  return view.render();
}, 100);