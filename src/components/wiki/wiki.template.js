
export default function (content) {

  return `
  <!doctype html>
  
  <html>
    <head>
      <meta charset="utf-8">
    
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Droid Sans", "Helvetica Neue", sans-serif;
          font-size: 16px;
        }
        
        .java.code.title {
          color: #CCC;
        }

        .text.tab {
          white-space: nowrap;
        }
        
        .wiki.cutDots {
          color: #9F9F9F;
        }
        
        .wiki a, .wiki a:visited {
          color: #1866C5;
          text-decoration: none;
        }
       
        
        .monospace {
          font-family: monospace;
          overflow-x: auto;
          overflow-y: hidden;
        }
        
        .wiki.tooltip {
          position: absolute;
          background: #FFFFD0;
          border: 2px #000000;
          padding: 5px;
        }


        .wiki.text {
          overflow-x: auto;
          overflow-y: hidden;
          white-space: pre-wrap;
          h1 {
            font-size: 160%;
          }
          h2 {
            font-size: 150%;
          }
          h3 {
            font-size: 140%;
          }
          h4 {
            font-size: 125%;
          }
          h5 {
            font-size: 110%;
          }
          h6 {
            font-size: 100%;
          }
          ul {
            padding-left: 2em;
            margin-left: 25px;
            list-style: disc outside;
            li {
              list-style-position: outside;
            }
          }
          ol {
            padding-left: 2em;
            margin-left: 25px;
            list-style: decimal outside;
            li {
              list-style-position: outside;
            }
          }
          del {
            text-decoration: line-through;
          }
          ol.wiki-list0 {
            list-style-type: decimal;
            padding-left: 0;
          }
          ol.wiki-list1 {
            list-style-type: upper-alpha;
          }
          ol.wiki-list2 {
            list-style-type: lower-alpha;
          }
          ul.wiki-list0 {
            list-style-type: disc;
            padding-left: 0;
          }
          ul.wiki-list1 {
            list-style-type: circle;
          }
          ul.wiki-list2 {
            list-style-type: square;
          }
        }
        
        .wiki-parsed-html {
          white-space: pre-wrap;
        }
        
        .wiki.quote {
          border-left: 1px solid blue;
          padding-left: 1em;
          margin: 0;
          display: inline-block;
        }
        
        pre.code {
          .keyword {
            color: #2505a3;
            font-weight: bold;
          }
        
          .string {
            color: green;
          }
        
          .number {
            color: blue;
          }
        
          .comment {
            font-style: italic;
            color: $ring-gray-color;
          }
        }
        
        .wiki-tbl {
          width: auto !important;
          table-layout: auto !important;
          border-collapse: collapse !important;
          border-spacing: 0 !important;
          border: 1px solid $ring-dark-gray-color;
          margin-left: 1px;
          margin-top: 1px;
        }
        

        .wiki-tbl-td {
          padding: 2px;
          border: 1px solid #888;
        }
        
        .wiki-tbl-th {
          padding: 2px;
          font-weight: bold;
          color: black;
          border: 1px solid #888;
          background-color: #d4d5d6;
        }
        
        .wiki {
          ul {
            padding-left: 2em;
            margin-left: 25px;
            list-style: disc outside;
          }
          li {
            list-style-position: outside;
          }
          ol {
            padding-left: 2em;
            margin-left: 25px;
            list-style: decimal outside;
            li {
              list-style-position: outside;
            }
          }
          del {
            text-decoration: line-through;
          }
        }
        

        ol.wiki-list0 {
          list-style-type: decimal;
          padding-left: 0;
        }
        
        ol.wiki-list1 {
          list-style-type: upper-alpha;
        }
        
        ol.wiki-list2 {
          list-style-type: lower-alpha;
        }
        
        ul.wiki-list0 {
          list-style-type: disc;
          padding-left: 0;
        }
        
        ul.wiki-list1 {
          list-style-type: circle;
        }
        
        ul.wiki-list2 {
          list-style-type: square;
        }
        
        .dsLink {
          text-decoration: none;
          cursor: default;
          color: black;
        }
        
        .dsLink:hover {
          color: black;
        }
        
        .dsLinkEnabled {
          cursor: pointer;
        }
        
        .wiki-exception-wrapper {
          position: relative;
          white-space: nowrap;
        }
        
        .wiki-plus {
          float: left;
          margin-right: 4px;
          border: 1px solid #888;
          cursor: pointer;
          color: #CCC;
          text-align: center;
        
          display: inline-block;
          width: 12px;
          height: 12px;
        }
        
        .wiki-plus:before {
          content: "";
          line-height: 13px;
          font-size: 15px;
          white-space: nowrap;
        }
        
        .wiki-minus:before {
          content: "";
        }
        
        .wiki-hellip {
          display: none;
        }
        
        .yt-issue-comment_focused .wiki-hellip {
          background-color: #eaf8ff;
        }
        
        .wiki-hidden {
          display: none !important;
        }
        
        .wikicode {
          background-color: #f9f9f9;
          border: 1px dashed #2f6fab;
          color: black;
          line-height: 140%;
          padding: 5px 10px;
          overflow-x: auto;
        }
        
        .wikicode .wikicode {
          border: none;
        }
        
        .js-wrapper {
          display: inline;
          white-space: nowrap;
        }
        
        .wiki-exception, .wiki-exception-title, .wikicode, .monospace, .prettyprinted {
          margin: 0;
          color: #6e6e6e;
          line-height: 16px;
        }
        
        .wiki-exception {
          margin-left: 18px;
          white-space: pre;
        }
        
        .wiki-exception-title {
          display: inline-block;
          overflow: hidden;
        }
        
        .wiki.picture {
          img {
            max-width: 100%;
          }
        }

      </style>
    </head>
    
    <body>
      <div id="content">
        ${content}
      </div>
      
      <script>
        function listenImageClicks () {
          var images = document.querySelectorAll('img');
          [].forEach.call(images, function(image) {
            image.addEventListener('click', function(e) {
              window.postMessage(JSON.stringify({name: 'image-click', src: image.src}));
            });
          });
        }
      
        function updateHeight () {
          var wrapper = document.getElementById('content');
          var height = wrapper.scrollHeight;
          try {
            window.postMessage(JSON.stringify({name: 'height-update', height: height}), 'http://foo.bar');
          } catch (e) {
            alert(e.message)
          }
        }
        
        listenImageClicks();
        
        window.addEventListener('resize', updateHeight);
        
        document.addEventListener('DOMContentLoaded', function() {
          setTimeout(updateHeight);
        }, false);

        setTimeout(updateHeight, 100);
      </script>
    </body>
  </html>
`;
}
