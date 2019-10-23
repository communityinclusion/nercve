/*global IE, BRAILLE, JSON, Option */
/*jslint broswer:true */
var keys = [0,0,0,0,0,0], text = [], line = '', remainder = 0, getById = function(i) { return document.getElementById(i); };
function cancelEvent(e) {
	e.returnValue = false;
	e.cancel = true;
	if (!IE()) {
		e.stopPropagation();
		e.preventDefault();
	}
	return false;
}

function load() {
	var e = getById('email');
	if (e !== null) {
		e.focus();
	}
}

function del() {
	var t = getById('text');
	if (typeof t != 'undefined' && text.length > 0) {
		var chr = text.pop().charCodeAt(0);
		//if (BRAILLE()) {
			t.innerHTML = t.innerHTML.substr(0, -1);
            /*} else if (chr != '\n') {
			t.removeChild(t.lastChild);
		}*/
		if (remainder - line.length < -1) {
			line = line.substr(0, -1); // while there is no room on the previous line just remove a char
		} else if (!BRAILLE()) { //  p 1st, p2 2nd,  p3 3rd br tags.
			var p = 0, p2 = -1, p3 = -1, fakes = 0;	// 83 = 40 cells/line * 2 lines + 2 returns - 1 from length.
			for (var i = Math.max(0, t.childNodes.length - 83); i < t.childNodes.length; i++) {
				if (t.childNodes[i].nodeName == 'BR') {
					p3 = p2; p2 = p; p = i; fakes += ([' ', '\n'].indexOf(text[p2]) == -1 && p2 > 0);
				}
			}
			// Since we just came to a new line take the text from the 2nd to last return.
			line = (text[text.length - 1] == '\n') ? '' : text.slice(p2 + (p2 > 0) - fakes).join('');
			// Calculate the remainder the line before the one we just returned to.  On the first
			// line i.e. p3 == -1, there is no line above and with hard returns there is no remainder.
			remainder = (p3 > -1 && text[p2] != '\n') ? 40 - p2 + p3 + (p3 > 0) : 0;
			if (text[p] == ' ') { // if the last line break was a space the change the br to a space.
				var span = document.createElement('span');
				span.className = 'b0';
				t.replaceChild(span, t.childNodes[p]);
			} else if (chr == 13 || [' ', '\n'].indexOf(text[text.length - 1]) == -1) {
				// Remove the br tag in case of a hard return or a line without a space.
				t.removeChild(t.lastChild);
			}
		} else if (BRAILLE()) {
			var nl = text.lastIndexOf(String.fromCharCode(13));
			line = (chr == 13 ? text.slice(nl > -1 ? nl : 0).join('') : '');
		}
		getById('field').value = line;
	}
}

function filter(e) {
	var kc = (IE() ? e.keyCode : e.which), t = getById('text'), f = getById('field');
	if (!IE() && ([9, 37, 39].indexOf(e.keyCode) != -1 || e.altKey || e.ctrlKey)) {
		// Allow tab, left and right arrow, and any combination with ALT or CRTL keys in FF and Opera.
		return true;
	}
	if (!BRAILLE()) {
		switch(kc) {
			case 68:	case 100:	keys[1] = 1; break;
			case 70:	case 102:	keys[0] = 1; break;
			case 74:	case 106:	keys[3] = 1; break;
			case 75:	case 107:	keys[4] = 1; break;
		 	case 76:	case 108:	keys[5] = 1; break;
			case 83:	case 115:	keys[2] = 1; break;
			case 32:				keys = [0,0,0,0,0,0]; break;
			//case 8:	// While FF picks up the backspace key on onkeypress IE doesn't so del() is
						// dispatched by the onkeydown event handler cancel().
			case 13:	// Don't put a break here! Putting break will submit the form.
				t.innerHTML += '\n'
				remainder = 0;
				text.push('\n');
				f.value = text.join('')
			default:
				return cancelEvent(e);
		}
	} else if (kc == 13) {
		text.push('\n');
		f.value = line = text.join('');
		t.innerHTML += '\n';
		return cancelEvent(e);
	} else if (kc > 31) {
		chr = e.charCode ? e.charCode : kc;
		chr = String.fromCharCode(chr /*+ (e.shiftKey ? (chr < 95 ? +32 : 32) : 0)*/);
		text.push(chr);
		line += chr;
		t.innerHTML += chr;
		f.value = text.join('');
		return true;
	}
	return false;
}

function isArray(a) {
	return (a !== null && a.constructor.toString().indexOf('Array') != -1);
}

function cancel(e) {
	var kc = IE() ? e.keyCode : e.which, t = getById('text');
	if ([8, 46].indexOf(kc) != -1) {
		//del();
        chr = text.pop();
        getById('field').value = text.join('')
        t.innerHTML = t.innerHTML.substr(0, -1)
	} else if ([37, 39, 9, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123].indexOf(e.keyCode) != -1 || BRAILLE()) {
		return true;
	} else if ([0, 68, 100, 70, 102, 74, 106, 75, 107, 76, 108, 83, 115, 32, 13].indexOf(kc) != -1) {
		return false;
	}
	return cancelEvent(e);
}

function imgName(a) {
	k = a.join('');
	if (k.match('/[^01]/')) {
		return false;
	}
	k = parseInt(k, 2);
	if (isNaN(k) || k < 0 || k > 63) {
		return false;
	}
    //console.log(k);
	return k;
}

function ascii(k) {
	if (k === null || !isArray(k)) {
		return false;
	}
	k = k.join('');
	if (k.match('/[^01]/')) {
		return false;
	}
	k = parseInt(k, 2);
	if (isNaN(k) || k < 0 || k > 63) {
		return false;
	}
	switch(k) {
		case  0: return ' ';  case  1: return ',';	case  2: return '"'; case  3: return ';';
		case  4: return '@';  case  5: return '.';	case  6: return '^'; case  7: return '_';
		case  8: return '\''; case  9: return '-';	case 10: return '9'; case 11: return '0';
		case 12: return '/';  case 13: return '+';	case 14: return '>'; case 15: return '#';
		case 16: return '1';  case 17: return '5';	case 18: return '3'; case 19: return '4';
		case 20: return 'i';  case 21: return '[';	case 22: return 'j'; case 23: return 'w';
		case 24: return '2';  case 25: return '8';	case 26: return '6'; case 27: return '7';
		case 28: return 's';  case 29: return '!';	case 30: return 't'; case 31: return ')';
		case 32: return 'a';  case 33: return '*';	case 34: return 'e'; case 35: return ':';
		case 36: return 'c';  case 37: return '%';	case 38: return 'd'; case 39: return '?';
		case 40: return 'k';  case 41: return 'u';	case 42: return 'o'; case 43: return 'z';
		case 44: return 'm';  case 45: return 'x';	case 46: return 'n'; case 47: return 'y';
		case 48: return 'b';  case 49: return '<';	case 50: return 'h'; case 51: return '\\';
		case 52: return 'f';  case 53: return '$';	case 54: return 'g'; case 55: return ']';
		case 56: return 'l';  case 57: return 'v';	case 58: return 'r'; case 59: return '(';
		case 60: return 'p';  case 61: return '&';	case 62: return 'q'; case 63: return '=';
	}
}

function getImage(e) {
	var kc = IE() ? e.keyCode : e.which,  f = getById('field'),
		t = getById('text')/*, imageName = imgName(keys)*/, chr = ascii(keys);
    //console.log('getImage', kc, keys, imageName, chr)
	if ([37, 39].indexOf(e.keyCode) != -1) {
		return;
	}
	if (!BRAILLE() && (chr != ' ' || kc === null || (chr == ' ' && kc == 32))) {
		text.push(chr);
		//line += chr;
		//var span = document.createElement('span');
		//span.className = 'b'+imageName;
		t.innerHTML += chr;
		/*if (line.length == 41 && text.length > 39) {
			for (var i = t.childNodes.length - 1; i >= t.childNodes.length - 41; i--) {
				if (t.childNodes[i].className == 'b0') {
					t.replaceChild(document.createElement('br'), t.childNodes[i]);
					remainder = 40 - line.lastIndexOf(' ');
					line = line.substr(40 - remainder + 1);
					break;
				}
			}
			if (i == t.childNodes.length - 42) {	// i will get decremented when it leaves the loop
				t.insertBefore(document.createElement('br'), t.lastChild);
				line = chr;
				remainder = 0;
			}
		}*/
		f.value = text.join('');
	}
	keys = [0,0,0,0,0,0];
}

/*function dumpProps(obj, parent) {
	// Go through all the properties of the passed-in object
	for (var i in obj) {
		//if (i.indexOf('on') !== 0) { continue; }
		// if a parent (2nd parameter) was passed in, then use that to
		// build the message. Message includes i (the object's property name)
		// then the object's property value on a new line
		var msg = (parent) ? parent + "." + i + "\n" + obj[i] : i + "\n" + obj[i];
		// Display the message. If the user clicks "OK", then continue. If they
		// click "CANCEL" then quit this level of recursion
		if (!confirm(msg)) { return; }
		// If this property (i) is an object, then recursively process the object
		if (typeof obj[i] == "object") {
			if (parent) { dumpProps(obj[i], parent + "." + i); } else { dumpProps(obj[i], i); }
		}
	}
}*/

function clearAnswer(e) {
	if ((IE() ? e.srcElement : e.target).id == 'field') {	// prevents the current text in field from being selected.
		getById('answer').focus();
	}
	getById('answer').innerHTML = '';
	getById('field').focus();
	return cancelEvent(e);
}

function checkBraille() {
	getById('field').value = '';
	getById('hb').value = text.join('');
	getById('brailler').submit();
}
function hint() {
	var a = getById('real_answer').childNodes, a_words = [], b_words = [],
        b = getById('your_answer').childNodes, j = 0, word = { nodes: [], classes: ''}, space = { nodes: [], classes: ''};
    for (var i = 0; i < a.length; i++) {
        e = a.item(i);
        s = e.nodeName == 'SPAN'
        if ((s && ['ab0', 'ab13', 'b0', 'b64'].indexOf(e.className) > -1) || (a[i].nodeName == '#text' && /\n/.test(a[i].textContent))) {
            if (word.classes) a_words.push(word)
            space.nodes.push(e)
            space.classes += e.className
            word = { nodes: [], classes: '' }
        } else if (s && /b[0-9]/.test(e.className)) {
            if (space.classes) a_words.push(space)
            space = { nodes: [], classes: '' };
            word.nodes.push(e)
            word.classes += e.className
        }
    }
    if (space.classes) a_words.push(space)
    if (word.classes) a_words.push(word)
    word = { nodes: [], classes: ''}
    space = { nodes: [], classes: ''}
    for (i = 0; i < b.length; i++) {
        e = b.item(i)
        s = e.nodeName == 'SPAN'
        if ((s && ['ab0', 'ab13', 'b0', 'b64'].indexOf(e.className) > -1)) {
            if (word.classes) b_words.push(word)
            space.nodes.push(e)
            space.classes += e.className
            word = { nodes: [], classes: '' }
        } else if (s && /b[0-9]/.test(e.className)) {
            if (space.classes) b_words.push(space)
            space = { nodes: [], classes: '' }
            word.nodes.push(e)
            word.classes += e.className
        }
    }
    if (space.classes) b_words.push(space)
    if (word.classes) b_words.push(word)
	for (var i = 0; i < b_words.length; i++) {
		if (!(i in a_words) || a_words[i].classes != b_words[i].classes) {
            //console.log('do\'h')
			for (j in b_words[i].nodes) {
                b_words[i].nodes[j].className += ' error';
            }
		}
	}
    /*if (b.length < a.length) {
        s = document.createElement('span')
        s.className = 'b0 error';
        //s.style.backgroundColor = 'red';
        b[0].parentElement.insertBefore(s, b[b.length - 2])
    }*/
}

//This prototype is provided by the Mozilla foundation and
//is distributed under the MIT license.
//http://www.ibiblio.org/pub/Linux/LICENSES/mit.license
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elt /*, from*/)  {
		var len = this.length, from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) {
			from += len;
		}
		for (; from < len; from++) {
			if (from in this && this[from] === elt) {
				return from;
			}
		}
		return -1;
  	};
}
if (!Array.prototype.lastIndexOf) {
	Array.prototype.lastIndexOf = function(elt /*, from*/) {
		var len = this.length, from = Number(arguments[1]) || len - 1;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) {
			from = len + from;
		}
		if (from >= len || from < 0) {
			from = len - 1;
		}
		for (; from > 0; from--) {
			if (from in this && this[from] === elt) {
				return from;
			}
		}
		return -1;
	};
}

String.prototype.substr = function(start /*, len*/)  {
	if (typeof arguments[1] == 'number' && arguments[1] === 0) {
		return '';
	}
	var len = Number(arguments[1]) || this.length, ret = '';
	if (start < 0) {
		start += this.length;
	}
	len = (len < 0) ? Math.abs((this.length + len) % this.length) : Math.floor(len);
	len = (len > this.length - start) ? this.length - start : len;

	for (; len > 0; len--) {
		ret += this.charAt(start);
		start++;
	}
	return ret;
};
window['load'] = load
window['filter'] = filter
window['cancel'] = cancel
window['clearAnswer'] = clearAnswer
window['getImage'] = getImage
window['hint'] = hint
window['checkBraille'] = checkBraille
