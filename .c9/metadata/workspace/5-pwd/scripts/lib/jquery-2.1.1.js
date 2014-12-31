{"filter":false,"title":"jquery-2.1.1.js","tooltip":"/5-pwd/scripts/lib/jquery-2.1.1.js","undoManager":{"mark":2,"position":2,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":577,"column":4},"action":"insert","lines":["/*!"," * mustache.js - Logic-less {{mustache}} templates with JavaScript"," * http://github.com/janl/mustache.js"," */","","/*global define: false*/","","(function (global, factory) {","  if (typeof exports === \"object\" && exports) {","    factory(exports); // CommonJS","  } else if (typeof define === \"function\" && define.amd) {","    define(['exports'], factory); // AMD","  } else {","    factory(global.Mustache = {}); // <script>","  }","}(this, function (mustache) {","","  var Object_toString = Object.prototype.toString;","  var isArray = Array.isArray || function (object) {","    return Object_toString.call(object) === '[object Array]';","  };","","  function isFunction(object) {","    return typeof object === 'function';","  }","","  function escapeRegExp(string) {","    return string.replace(/[\\-\\[\\]{}()*+?.,\\\\\\^$|#\\s]/g, \"\\\\$&\");","  }","","  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577","  // See https://github.com/janl/mustache.js/issues/189","  var RegExp_test = RegExp.prototype.test;","  function testRegExp(re, string) {","    return RegExp_test.call(re, string);","  }","","  var nonSpaceRe = /\\S/;","  function isWhitespace(string) {","    return !testRegExp(nonSpaceRe, string);","  }","","  var entityMap = {","    \"&\": \"&amp;\",","    \"<\": \"&lt;\",","    \">\": \"&gt;\",","    '\"': '&quot;',","    \"'\": '&#39;',","    \"/\": '&#x2F;'","  };","","  function escapeHtml(string) {","    return String(string).replace(/[&<>\"'\\/]/g, function (s) {","      return entityMap[s];","    });","  }","","  var whiteRe = /\\s*/;","  var spaceRe = /\\s+/;","  var equalsRe = /\\s*=/;","  var curlyRe = /\\s*\\}/;","  var tagRe = /#|\\^|\\/|>|\\{|&|=|!/;","","  /**","   * Breaks up the given `template` string into a tree of tokens. If the `tags`","   * argument is given here it must be an array with two string values: the","   * opening and closing tags used in the template (e.g. [ \"<%\", \"%>\" ]). Of","   * course, the default is to use mustaches (i.e. mustache.tags).","   *","   * A token is an array with at least 4 elements. The first element is the","   * mustache symbol that was used inside the tag, e.g. \"#\" or \"&\". If the tag","   * did not contain a symbol (i.e. {{myValue}}) this element is \"name\". For","   * all text that appears outside a symbol this element is \"text\".","   *","   * The second element of a token is its \"value\". For mustache tags this is","   * whatever else was inside the tag besides the opening symbol. For text tokens","   * this is the text itself.","   *","   * The third and fourth elements of the token are the start and end indices,","   * respectively, of the token in the original template.","   *","   * Tokens that are the root node of a subtree contain two more elements: 1) an","   * array of tokens in the subtree and 2) the index in the original template at","   * which the closing tag for that section begins.","   */","  function parseTemplate(template, tags) {","    if (!template)","      return [];","","    var sections = [];     // Stack to hold section tokens","    var tokens = [];       // Buffer to hold the tokens","    var spaces = [];       // Indices of whitespace tokens on the current line","    var hasTag = false;    // Is there a {{tag}} on the current line?","    var nonSpace = false;  // Is there a non-space char on the current line?","","    // Strips all whitespace tokens array for the current line","    // if there was a {{#tag}} on it and otherwise only space.","    function stripSpace() {","      if (hasTag && !nonSpace) {","        while (spaces.length)","          delete tokens[spaces.pop()];","      } else {","        spaces = [];","      }","","      hasTag = false;","      nonSpace = false;","    }","","    var openingTagRe, closingTagRe, closingCurlyRe;","    function compileTags(tags) {","      if (typeof tags === 'string')","        tags = tags.split(spaceRe, 2);","","      if (!isArray(tags) || tags.length !== 2)","        throw new Error('Invalid tags: ' + tags);","","      openingTagRe = new RegExp(escapeRegExp(tags[0]) + '\\\\s*');","      closingTagRe = new RegExp('\\\\s*' + escapeRegExp(tags[1]));","      closingCurlyRe = new RegExp('\\\\s*' + escapeRegExp('}' + tags[1]));","    }","","    compileTags(tags || mustache.tags);","","    var scanner = new Scanner(template);","","    var start, type, value, chr, token, openSection;","    while (!scanner.eos()) {","      start = scanner.pos;","","      // Match any text between tags.","      value = scanner.scanUntil(openingTagRe);","","      if (value) {","        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {","          chr = value.charAt(i);","","          if (isWhitespace(chr)) {","            spaces.push(tokens.length);","          } else {","            nonSpace = true;","          }","","          tokens.push([ 'text', chr, start, start + 1 ]);","          start += 1;","","          // Check for whitespace on the current line.","          if (chr === '\\n')","            stripSpace();","        }","      }","","      // Match the opening tag.","      if (!scanner.scan(openingTagRe))","        break;","","      hasTag = true;","","      // Get the tag type.","      type = scanner.scan(tagRe) || 'name';","      scanner.scan(whiteRe);","","      // Get the tag value.","      if (type === '=') {","        value = scanner.scanUntil(equalsRe);","        scanner.scan(equalsRe);","        scanner.scanUntil(closingTagRe);","      } else if (type === '{') {","        value = scanner.scanUntil(closingCurlyRe);","        scanner.scan(curlyRe);","        scanner.scanUntil(closingTagRe);","        type = '&';","      } else {","        value = scanner.scanUntil(closingTagRe);","      }","","      // Match the closing tag.","      if (!scanner.scan(closingTagRe))","        throw new Error('Unclosed tag at ' + scanner.pos);","","      token = [ type, value, start, scanner.pos ];","      tokens.push(token);","","      if (type === '#' || type === '^') {","        sections.push(token);","      } else if (type === '/') {","        // Check section nesting.","        openSection = sections.pop();","","        if (!openSection)","          throw new Error('Unopened section \"' + value + '\" at ' + start);","","        if (openSection[1] !== value)","          throw new Error('Unclosed section \"' + openSection[1] + '\" at ' + start);","      } else if (type === 'name' || type === '{' || type === '&') {","        nonSpace = true;","      } else if (type === '=') {","        // Set the tags for the next time around.","        compileTags(value);","      }","    }","","    // Make sure there are no open sections when we're done.","    openSection = sections.pop();","","    if (openSection)","      throw new Error('Unclosed section \"' + openSection[1] + '\" at ' + scanner.pos);","","    return nestTokens(squashTokens(tokens));","  }","","  /**","   * Combines the values of consecutive text tokens in the given `tokens` array","   * to a single token.","   */","  function squashTokens(tokens) {","    var squashedTokens = [];","","    var token, lastToken;","    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {","      token = tokens[i];","","      if (token) {","        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {","          lastToken[1] += token[1];","          lastToken[3] = token[3];","        } else {","          squashedTokens.push(token);","          lastToken = token;","        }","      }","    }","","    return squashedTokens;","  }","","  /**","   * Forms the given array of `tokens` into a nested tree structure where","   * tokens that represent a section have two additional items: 1) an array of","   * all tokens that appear in that section and 2) the index in the original","   * template that represents the end of that section.","   */","  function nestTokens(tokens) {","    var nestedTokens = [];","    var collector = nestedTokens;","    var sections = [];","","    var token, section;","    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {","      token = tokens[i];","","      switch (token[0]) {","      case '#':","      case '^':","        collector.push(token);","        sections.push(token);","        collector = token[4] = [];","        break;","      case '/':","        section = sections.pop();","        section[5] = token[2];","        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;","        break;","      default:","        collector.push(token);","      }","    }","","    return nestedTokens;","  }","","  /**","   * A simple string scanner that is used by the template parser to find","   * tokens in template strings.","   */","  function Scanner(string) {","    this.string = string;","    this.tail = string;","    this.pos = 0;","  }","","  /**","   * Returns `true` if the tail is empty (end of string).","   */","  Scanner.prototype.eos = function () {","    return this.tail === \"\";","  };","","  /**","   * Tries to match the given regular expression at the current position.","   * Returns the matched text if it can match, the empty string otherwise.","   */","  Scanner.prototype.scan = function (re) {","    var match = this.tail.match(re);","","    if (!match || match.index !== 0)","      return '';","","    var string = match[0];","","    this.tail = this.tail.substring(string.length);","    this.pos += string.length;","","    return string;","  };","","  /**","   * Skips all text until the given regular expression can be matched. Returns","   * the skipped string, which is the entire tail if no match can be made.","   */","  Scanner.prototype.scanUntil = function (re) {","    var index = this.tail.search(re), match;","","    switch (index) {","    case -1:","      match = this.tail;","      this.tail = \"\";","      break;","    case 0:","      match = \"\";","      break;","    default:","      match = this.tail.substring(0, index);","      this.tail = this.tail.substring(index);","    }","","    this.pos += match.length;","","    return match;","  };","","  /**","   * Represents a rendering context by wrapping a view object and","   * maintaining a reference to the parent context.","   */","  function Context(view, parentContext) {","    this.view = view == null ? {} : view;","    this.cache = { '.': this.view };","    this.parent = parentContext;","  }","","  /**","   * Creates a new context using the given view with this context","   * as the parent.","   */","  Context.prototype.push = function (view) {","    return new Context(view, this);","  };","","  /**","   * Returns the value of the given name in this context, traversing","   * up the context hierarchy if the value is absent in this context's view.","   */","  Context.prototype.lookup = function (name) {","    var cache = this.cache;","","    var value;","    if (name in cache) {","      value = cache[name];","    } else {","      var context = this, names, index;","","      while (context) {","        if (name.indexOf('.') > 0) {","          value = context.view;","          names = name.split('.');","          index = 0;","","          while (value != null && index < names.length)","            value = value[names[index++]];","        } else {","          value = context.view[name];","        }","","        if (value != null)","          break;","","        context = context.parent;","      }","","      cache[name] = value;","    }","","    if (isFunction(value))","      value = value.call(this.view);","","    return value;","  };","","  /**","   * A Writer knows how to take a stream of tokens and render them to a","   * string, given a context. It also maintains a cache of templates to","   * avoid the need to parse the same template twice.","   */","  function Writer() {","    this.cache = {};","  }","","  /**","   * Clears all cached templates in this writer.","   */","  Writer.prototype.clearCache = function () {","    this.cache = {};","  };","","  /**","   * Parses and caches the given `template` and returns the array of tokens","   * that is generated from the parse.","   */","  Writer.prototype.parse = function (template, tags) {","    var cache = this.cache;","    var tokens = cache[template];","","    if (tokens == null)","      tokens = cache[template] = parseTemplate(template, tags);","","    return tokens;","  };","","  /**","   * High-level method that is used to render the given `template` with","   * the given `view`.","   *","   * The optional `partials` argument may be an object that contains the","   * names and templates of partials that are used in the template. It may","   * also be a function that is used to load partial templates on the fly","   * that takes a single argument: the name of the partial.","   */","  Writer.prototype.render = function (template, view, partials) {","    var tokens = this.parse(template);","    var context = (view instanceof Context) ? view : new Context(view);","    return this.renderTokens(tokens, context, partials, template);","  };","","  /**","   * Low-level method that renders the given array of `tokens` using","   * the given `context` and `partials`.","   *","   * Note: The `originalTemplate` is only ever used to extract the portion","   * of the original template that was contained in a higher-order section.","   * If the template doesn't use higher-order sections, this argument may","   * be omitted.","   */","  Writer.prototype.renderTokens = function (tokens, context, partials, originalTemplate) {","    var buffer = '';","","    // This function is used to render an arbitrary template","    // in the current context by higher-order sections.","    var self = this;","    function subRender(template) {","      return self.render(template, context, partials);","    }","","    var token, value;","    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {","      token = tokens[i];","","      switch (token[0]) {","      case '#':","        value = context.lookup(token[1]);","","        if (!value)","          continue;","","        if (isArray(value)) {","          for (var j = 0, valueLength = value.length; j < valueLength; ++j) {","            buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);","          }","        } else if (typeof value === 'object' || typeof value === 'string') {","          buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);","        } else if (isFunction(value)) {","          if (typeof originalTemplate !== 'string')","            throw new Error('Cannot use higher-order sections without the original template');","","          // Extract the portion of the original template that the section contains.","          value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);","","          if (value != null)","            buffer += value;","        } else {","          buffer += this.renderTokens(token[4], context, partials, originalTemplate);","        }","","        break;","      case '^':","        value = context.lookup(token[1]);","","        // Use JavaScript's definition of falsy. Include empty arrays.","        // See https://github.com/janl/mustache.js/issues/186","        if (!value || (isArray(value) && value.length === 0))","          buffer += this.renderTokens(token[4], context, partials, originalTemplate);","","        break;","      case '>':","        if (!partials)","          continue;","","        value = isFunction(partials) ? partials(token[1]) : partials[token[1]];","","        if (value != null)","          buffer += this.renderTokens(this.parse(value), context, partials, value);","","        break;","      case '&':","        value = context.lookup(token[1]);","","        if (value != null)","          buffer += value;","","        break;","      case 'name':","        value = context.lookup(token[1]);","","        if (value != null)","          buffer += mustache.escape(value);","","        break;","      case 'text':","        buffer += token[1];","        break;","      }","    }","","    return buffer;","  };","","  mustache.name = \"mustache.js\";","  mustache.version = \"0.8.1\";","  mustache.tags = [ \"{{\", \"}}\" ];","","  // All high-level mustache.* functions use this writer.","  var defaultWriter = new Writer();","","  /**","   * Clears all cached templates in the default writer.","   */","  mustache.clearCache = function () {","    return defaultWriter.clearCache();","  };","","  /**","   * Parses and caches the given template in the default writer and returns the","   * array of tokens it contains. Doing this ahead of time avoids the need to","   * parse templates on the fly as they are rendered.","   */","  mustache.parse = function (template, tags) {","    return defaultWriter.parse(template, tags);","  };","","  /**","   * Renders the `template` with the given `view` and `partials` using the","   * default writer.","   */","  mustache.render = function (template, view, partials) {","    return defaultWriter.render(template, view, partials);","  };","","  // This is here for backwards compatibility with 0.4.x.","  mustache.to_html = function (template, view, partials, send) {","    var result = mustache.render(template, view, partials);","","    if (isFunction(send)) {","      send(result);","    } else {","      return result;","    }","  };","","  // Export the escaping function so that the user may override it.","  // See https://github.com/janl/mustache.js/issues/244","  mustache.escape = escapeHtml;","","  // Export these mainly for testing, but also for advanced usage.","  mustache.Scanner = Scanner;","  mustache.Context = Context;","  mustache.Writer = Writer;","","}));"]}]}],[{"group":"doc","deltas":[{"start":{"row":577,"column":4},"end":{"row":578,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":578,"column":0},"end":{"row":729,"column":4},"action":"insert","lines":["","// Create scrollLeft and scrollTop methods","jQuery.each( { scrollLeft: \"pageXOffset\", scrollTop: \"pageYOffset\" }, function( method, prop ) {","\tvar top = \"pageYOffset\" === prop;","","\tjQuery.fn[ method ] = function( val ) {","\t\treturn access( this, function( elem, method, val ) {","\t\t\tvar win = getWindow( elem );","","\t\t\tif ( val === undefined ) {","\t\t\t\treturn win ? win[ prop ] : elem[ method ];","\t\t\t}","","\t\t\tif ( win ) {","\t\t\t\twin.scrollTo(","\t\t\t\t\t!top ? val : window.pageXOffset,","\t\t\t\t\ttop ? val : window.pageYOffset","\t\t\t\t);","","\t\t\t} else {","\t\t\t\telem[ method ] = val;","\t\t\t}","\t\t}, method, val, arguments.length, null );","\t};","});","","// Add the top/left cssHooks using jQuery.fn.position","// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084","// getComputedStyle returns percent when specified for top/left/bottom/right","// rather than make the css module depend on the offset module, we just check for it here","jQuery.each( [ \"top\", \"left\" ], function( i, prop ) {","\tjQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,","\t\tfunction( elem, computed ) {","\t\t\tif ( computed ) {","\t\t\t\tcomputed = curCSS( elem, prop );","\t\t\t\t// if curCSS returns percentage, fallback to offset","\t\t\t\treturn rnumnonpx.test( computed ) ?","\t\t\t\t\tjQuery( elem ).position()[ prop ] + \"px\" :","\t\t\t\t\tcomputed;","\t\t\t}","\t\t}","\t);","});","","","// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods","jQuery.each( { Height: \"height\", Width: \"width\" }, function( name, type ) {","\tjQuery.each( { padding: \"inner\" + name, content: type, \"\": \"outer\" + name }, function( defaultExtra, funcName ) {","\t\t// margin is only for outerHeight, outerWidth","\t\tjQuery.fn[ funcName ] = function( margin, value ) {","\t\t\tvar chainable = arguments.length && ( defaultExtra || typeof margin !== \"boolean\" ),","\t\t\t\textra = defaultExtra || ( margin === true || value === true ? \"margin\" : \"border\" );","","\t\t\treturn access( this, function( elem, type, value ) {","\t\t\t\tvar doc;","","\t\t\t\tif ( jQuery.isWindow( elem ) ) {","\t\t\t\t\t// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there","\t\t\t\t\t// isn't a whole lot we can do. See pull request at this URL for discussion:","\t\t\t\t\t// https://github.com/jquery/jquery/pull/764","\t\t\t\t\treturn elem.document.documentElement[ \"client\" + name ];","\t\t\t\t}","","\t\t\t\t// Get document width or height","\t\t\t\tif ( elem.nodeType === 9 ) {","\t\t\t\t\tdoc = elem.documentElement;","","\t\t\t\t\t// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],","\t\t\t\t\t// whichever is greatest","\t\t\t\t\treturn Math.max(","\t\t\t\t\t\telem.body[ \"scroll\" + name ], doc[ \"scroll\" + name ],","\t\t\t\t\t\telem.body[ \"offset\" + name ], doc[ \"offset\" + name ],","\t\t\t\t\t\tdoc[ \"client\" + name ]","\t\t\t\t\t);","\t\t\t\t}","","\t\t\t\treturn value === undefined ?","\t\t\t\t\t// Get width or height on the element, requesting but not forcing parseFloat","\t\t\t\t\tjQuery.css( elem, type, extra ) :","","\t\t\t\t\t// Set width or height on the element","\t\t\t\t\tjQuery.style( elem, type, value, extra );","\t\t\t}, type, chainable ? margin : undefined, chainable, null );","\t\t};","\t});","});","","","// The number of elements contained in the matched element set","jQuery.fn.size = function() {","\treturn this.length;","};","","jQuery.fn.andSelf = jQuery.fn.addBack;","","","","","// Register as a named AMD module, since jQuery can be concatenated with other","// files that may use define, but not via a proper concatenation script that","// understands anonymous AMD modules. A named AMD is safest and most robust","// way to register. Lowercase jquery is used because AMD module names are","// derived from file names, and jQuery is normally delivered in a lowercase","// file name. Do this after creating the global so that if an AMD module wants","// to call noConflict to hide this version of jQuery, it will work.","","// Note that for maximum portability, libraries that are not jQuery should","// declare themselves as anonymous modules, and avoid setting a global if an","// AMD loader is present. jQuery is a special case. For more information, see","// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon","","if ( typeof define === \"function\" && define.amd ) {","\tdefine( \"jquery\", [], function() {","\t\treturn jQuery;","\t});","}","","","","","var","\t// Map over jQuery in case of overwrite","\t_jQuery = window.jQuery,","","\t// Map over the $ in case of overwrite","\t_$ = window.$;","","jQuery.noConflict = function( deep ) {","\tif ( window.$ === jQuery ) {","\t\twindow.$ = _$;","\t}","","\tif ( deep && window.jQuery === jQuery ) {","\t\twindow.jQuery = _jQuery;","\t}","","\treturn jQuery;","};","","// Expose jQuery and $ identifiers, even in","// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)","// and CommonJS for browser emulators (#13566)","if ( typeof noGlobal === strundefined ) {","\twindow.jQuery = window.$ = jQuery;","}","","","","","return jQuery;","","}));"]}]}]]},"ace":{"folds":[],"scrolltop":9723,"scrollleft":0,"selection":{"start":{"row":595,"column":6},"end":{"row":595,"column":6},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1419085957408,"hash":"801385451c176d8383455738e2f788381f535d67"}