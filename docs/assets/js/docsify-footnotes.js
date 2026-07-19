(function () {

  function parseFootnotes(html) {

    const footnotes = {};

    /*
     * Extract footnote definitions
     *
     * Example:
     *
     * <p>[^1]: Reference text</p>
     *
     * Supports multi-line paragraphs
     */

    html = html.replace(
      /<p>\[\^(\d+)\]:\s*([\s\S]*?)<\/p>/g,
      function(match, id, content) {

        footnotes[id] = content.trim();

        return "";
      }
    );


    /*
     * Replace references
     *
     * [^1] -> superscript link
     */

    const used = {};

    html = html.replace(
      /\[\^(\d+)\]/g,
      function(match, id) {

        used[id] = true;

        let count = used[id];

        return `
<sup class="footnote-ref">
<a href="#footnote-${id}" 
   id="footnote-ref-${id}">
${id}
</a>
</sup>`;
      }
    );


    if (Object.keys(footnotes).length === 0) {
      return html;
    }


    /*
     * Generate bibliography
     */

    let output = `
<hr>

<section class="footnotes">

<h4>References</h4>

<ol>
`;


    Object.keys(footnotes)
      .sort(function(a,b){
        return Number(a)-Number(b);
      })
      .forEach(function(id){

        output += `
<li id="footnote-${id}">

${footnotes[id]}

<a href="#footnote-ref-${id}"
   class="footnote-backref">
↩
</a>

</li>
`;

      });


    output += `

</ol>

</section>
`;


    return html + output;

  }



  window.$docsify = window.$docsify || {};


  window.$docsify.plugins =
    (window.$docsify.plugins || [])
    .concat(function(hook, vm){

      hook.afterEach(function(html, next){

        next(
          parseFootnotes(html)
        );

      });

    });


})();
