(function () {

  function footnotes(html) {

    const notes = {};

    /*
     * Find footnote definitions inside paragraphs
     */
    html = html.replace(
      /\[\^(\d+)\]:\s*([^<\n]+)/g,
      function(match, id, text) {
    
        notes[id] = text.trim();
    
        return "";
    
      }
    );


    /*
     * Replace references
     */
    html = html.replace(
      /\[\^(\d+)\]/g,
      function(match, id) {

        return `
<sup>
<a href="#fn-${id}" id="fnref-${id}">
${id}
</a>
</sup>
`;

      }
    );


    if(Object.keys(notes).length === 0){
      return html;
    }


    let ref = `
<hr>
<section class="footnotes">
<h4>References</h4>
<ol>
`;


    Object.keys(notes)
      .sort((a,b)=>a-b)
      .forEach(function(id){

        ref += `
<li id="fn-${id}">
${notes[id]}
<a href="#fnref-${id}">↩</a>
</li>
`;

      });


    ref += `
</ol>
</section>
`;


    return html + ref;

  }



  window.$docsify = window.$docsify || {};


  window.$docsify.plugins =
  (window.$docsify.plugins || [])
  .concat(function(hook){

      hook.afterEach(function(html,next){

          next(
            footnotes(html)
          );

      });

  });


})();
