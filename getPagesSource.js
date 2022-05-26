// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    var html = '';
    //, node = document_root.firstChild;
    var table = document_root.getElementById('dscTable'),
      rows = table.rows, rowcount = rows.length, r,
      cells, cellcount, c, cell;
    for (r=0; r<rowcount; r++) {
      cells = rows[r].cells;
      cellcount = cells.length;
      for( c=0; c<cellcount; c++) {
        cell = cells[c];
        cls = cell.getAttribute('class');
        if (cls === "ellipsis c3") {
          taxid = cell.firstChild.firstChild.href.match(/id=([0-9]+)/)[1];
          html += cell.innerText + ' ' + taxid + ' ';
        }
        else if (cls === "c8") {
          html += cell.innerText + '\n';
        }
      }
    }
    // while (node) {
    //     switch (node.nodeType) {
    //     case Node.ELEMENT_NODE:
    //         html += node.outerHTML;
    //         break;
    //     case Node.TEXT_NODE:
    //         break;
    //         html += node.nodeValue;
    //         break;
    //     case Node.CDATA_SECTION_NODE:
    //         break;
    //         html += '<![CDATA[' + node.nodeValue + ']]>';
    //         break;
    //     case Node.COMMENT_NODE:
    //         break;
    //         html += '<!--' + node.nodeValue + '-->';
    //         break;
    //     case Node.DOCUMENT_TYPE_NODE:
    //         break;
    //         // (X)HTML documents are identified by public identifiers
    //         html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
    //         break;
    //     }
    //     node = node.nextSibling;
    // }
    return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
