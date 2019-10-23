/*global IE, BRAILLE, JSON, Option */
/*jslint broswer:true */
var keys = [0,0,0,0,0,0], text = [], line = '', curLineNum = 0;
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
	var e = document.getElementById('email');
	if (e !== null) {
		e.focus();
	}
}

function getCaretPosition(ctrl) {
	if (document.selection) {
		return Math.abs(document.selection.createRange().moveStart('character', -ctrl.value.length));
	} else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
		return ctrl.selectionStart;
	}
	return 0;
}

function setCaretPosition(ctrl, pos){
	if(ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);
	} else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

function del() {
	var t = document.getElementById('text');
	if (typeof t != 'undefined' && text.length > 0) {
		var chr = text.pop(), answer = text.join(''), imgs = t.innerHTML.split((BRAILLE() ? '': '<'));
		if (line.length > 1) {
			line = line.substr(0, line.length - 1);
		} else {
			if ((line.length == 1 && answer.substr(-1) != '\n' && !BRAILLE()) || line.length === 0) {
				// this was a word wrap generated return so remove the new line. Or it was a hard return
				// and now we are deleting the return char.
				imgs.pop();
			}
			// first check for hard returns.
			var len = answer.lastIndexOf('\n');
			// if no hard retruns then take the last 41 characters (40 chars place a space)
			len = (len == -1 || answer.length - len > 41) ? -41 : len + 1;
			// if len is asking for more chars than answers has then just take answer.
			len = ((len * -1) > text.length) ? 0 : len;
			line = answer.substr(len);
			// Now check to see where the last space is and cut from there if no newline was found.
			line = (len == -41) ? line.substr(line.indexOf(' ') + 1) : line;
		}
		if (chr != '\n' || BRAILLE()) {
			imgs.pop(); // Closing span tag or single char
			if (!BRAILLE() || chr == '\n') {
				imgs.pop(); // Opening <span class="b...">
			}
		}
		//		IE capitalizes the tags.
		var nl = ((IE()) ? 'BR>' : 'br>'), pos = imgs.lastIndexOf(nl), pos2 = imgs.lastIndexOf(nl, pos - 1);
		// 2 tags per cell, 40 cells per line and 2 br tags = 82 tags.
		if (pos2 != -1 && (pos != -1 || imgs.length < 82) && answer.substr(text.length - line.length - 1, 1) == ' ') {
			// i.e. there are 2 new lines chars in the past 40 characters or it's the first line and
			// the latter new line char is a soft retrun.
			imgs = imgs.slice(0, pos).concat(['span class="b0">','/span>'], imgs.slice(pos + 1));
			if (answer.length > 40) {
				var space = answer.substr(answer.length - 41).indexOf(' ');
				line = answer.substr(answer.length - 40 + space);
			} else {
				line = answer;
			}
		}
		t.innerHTML = imgs.join((BRAILLE() ? '' : '<'));
		document.getElementById('field').value = line;
	}
}

function filter(e) {
	var keynum = (IE() ? e.keyCode : e.which), t = document.getElementById('text');
	if (!IE() && keynum === 0 && [9, 37, 39].indexOf(e.keyCode) != -1) {
		// Allow tabs, left and right arrows in FF and Opera.
		return true;
	}
	if (BRAILLE() === false) {
		switch(keynum) {
			case 68:	case 100:	keys[1] = 1; break;
			case 70:	case 102:	keys[0] = 1; break;
			case 74:	case 106:	keys[3] = 1; break;
			case 75:	case 107:	keys[4] = 1; break;
			case 76:	case 108:	keys[5] = 1; break;
			case 83:	case 115:	keys[2] = 1; break;
			case 32:				keys = [0,0,0,0,0,0]; break;
			//case 8:	// While FF picks up the backspace key on onkeypress IE doesn't so the del() is dispatched by the onkeydown event handler cancel()
			case 13:	// Don't put a break here! Putting break will submit the form.
				t.innerHTML += '<br />';
				text.push('\n');
				document.getElementById('field').value = line = '';
			default:
				return cancelEvent(e);
		}
	} else if (keynum == 13) {
		return cancelEvent(e);
	}
	return false;
}

function isArray(a) {
	return (a !== null && a.constructor.toString().indexOf('Array') != -1);
}

function cancel(e) {
	var keynum = (IE()) ? e.keyCode : keynum = e.which;
	if ([8, 46].indexOf(keynum) != -1) {
		del();
	} else if ([37, 39].indexOf(e.keyCode) != -1) {
		return true;
	} else if ([0, 68, 100, 70, 102, 74, 106, 75, 107, 76, 108, 83, 115, 32, 13].indexOf(keynum)) {
		return false;
	}
	return cancelEvent(e);
}

function imgName(a) {
	var s = '';
	if (a === null || !isArray(a)) {
		return false;
	}
	for (var i = 0; i < 6; i++) {
		s += (a[i] == 1) ? '' + (i + 1) : '';
	}
	s = (s === '') ? '0' : s;
	return s;
}

/*function getLetter(k) {
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
		case  0: return ' space ';		case  1: return ' dot 6 ';	case  2: return ' dot 5 ';
		case  3: return ' dots 5 6 ';	case  4: return ' dot 4 ';	case  5: return ' dots 4 6 ';
		case  6: return ' dots 4 5 ';	case  7: return '_';		case  8: return ' dot 3 ';
		case  9: return ' dots 3 6 ';	case 10: return 'in';		case 11: return '"';
		case 12: return 'st';			case 13: return 'ing';		case 14: return 'ar';
		case 15: return '#';			case 16: return ' dot 2 ';	case 17: return 'en';
		case 18: return '(low) c';		case 19: return '(low) d';	case 20: return 'i';
		case 21: return 'ow';			case 22: return 'j';		case 23: return 'w';
		case 24: return '(low) b';		case 25: return '?';		case 26: return '(low) f';
		case 27: return '(paren)';		case 28: return 's';		case 29: return 'the';
		case 30: return 't';			case 31: return '(with)';	case 32: return 'a';
		case 33: return 'ch';			case 34: return 'e';		case 35: return 'wh';
		case 36: return 'c';			case 37: return 'sh';		case 38: return 'd';
		case 39: return 'th';			case 40: return 'k';		case 41: return 'u';
		case 42: return 'o';			case 43: return 'z';		case 44: return 'm';
		case 45: return 'x';			case 46: return 'n';		case 47: return 'y';
		case 48: return 'b';			case 49: return 'gh';		case 50: return 'h';
		case 51: return 'ou';			case 52: return 'f';		case 53: return 'ed';
		case 54: return 'g';			case 55: return 'er';		case 56: return 'l';
		case 57: return 'v';			case 58: return 'r';		case 59: return '(of)';
		case 60: return 'p';			case 61: return '(and)';	case 62: return 'q';
		case 63: return '(for)';
	}
}*/

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
	var keynum = (IE() ? e.keyCode : e.which),  f = document.getElementById('field'),
		t = document.getElementById('before'), imageName = imgName(keys),
		chr = (BRAILLE()) ? (keynum == 13 ? '\n' : f.value.substr(-1)) : ascii(keys);
	if ([37, 39].indexOf(e.keyCode) != -1) {
		return true;
	}
	if (BRAILLE() || imageName != '0' || keynum === null || (imageName == '0' && keynum == 32)) {
		var curPos = getCaretPosition((IE() ? e.srcElement : e.target));
		if (text.length === 0) {
			text.push(chr);
		} else {
			text[curLineNum] = text[curLineNum].substr(0, curPos) + chr + text[curLineNum].substr(curPos);
		}
		line = text[curLineNum].substr(1);
		if (BRAILLE()) {
			t.innerHTML += (keynum == 13 ? '<br />' : chr);
			return;
		}
		var imgs = t.innerHTML.split('<');
		imgs.push('span class="b' + imageName + '">', '/span>');
		if (text[curLineNum].length == 41 /* && text.length > 39*/) {
			for (var i = imgs.length - 1; i > 0 && i > imgs.length - 81; i--) {
				if (imgs[i].indexOf('b0') > 0) {
					alert('i:'+i+' line:'+line.lastIndexOf(' '));
					//alert(t.innerHTML.replace(/<s/,"\n<s"));
					imgs[i] = 'br />';
					imgs = imgs.slice(0, i + 1).concat(imgs.slice(i + 2));
					var piece = line.substr(line.lastIndexOf(' ') + 1);
					text[curLineNum] = text[curLineNum].substr(0, -piece.length);
					(curLineNum == text.length - 1) ? text.push(chunk) : text[curLineNum + 1] += piece;
					if (curPos > line.lastIndexOf(' ')) {
						curLineNum++;
					}
					break;
				}
			}
			if (i === 0) {  // If i = 0 then there hasn't been a space in the last 40 characters.
				i = imgs.length;
				imgs[i] = imgs[i - 1];
				imgs[i - 1] = imgs[i - 2];
				imgs[i - 2] = 'br />';
				curLineNum++;
			}
		}
		t.innerHTML = imgs.join('<');
	}
	f.value = text[curLineNum];
	keys = [0,0,0,0,0,0];
}

/*function dumpProps(obj, parent) {
	// Go through all the properties of the passed-in object
	for (var i in obj) {
		//if ((i + '').substr(0, 2) != 'on') { continue; }
		// if a parent (2nd parameter) was passed in, then use that to
		// build the message. Message includes i (the object's property name)
		// then the object's property value on a new line
		if (parent) { var msg = parent + "." + i + "\n" + obj[i]; } else { var msg = i + "\n" + obj[i]; }
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
	document.getElementById('field').focus();
	return cancelEvent(e);
}

function checkBraille() {
	document.getElementById('field').value = '';
	document.getElementById('hb').value = text.join('');
	document.getElementById('brailler').submit();
}

function hint() {
	var a = document.getElementById('real_answer').childNodes, lc = 1, cc = 1,
		b = document.getElementById('your_answer').childNodes;
	for (var i = 0; i < Math.min(a.length, b.length); i++) {
		if (a[i].className != b[i].className) {
			alert('First error occurred at Line: ' + lc + ' Column: ' + cc);
			return;
		} else if (a[i].nodeName == 'BR') {
			lc++;
			cc = 0;
		}
		cc++;
	}
	alert('First error occurred at Line: ' + lc + ' Column: ' + cc);
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

/**********************************************
 * Functions used on the Manage course Page.
 **********************************************/
function moveStudent(src, dest) {
	src = document.getElementById(src);
	dest = document.getElementById(dest);
	if (dest === null || src === null) {
		alert('Dest or src not found!');
		return;
	}
	for (var i = 0; i < src.options.length; i++) {
		if (src.options[i].selected) {
			document.getElementById('modChanged').value = 1;
			dest.options[dest.length] = new Option(src.options[i].text, src.options[i].value);
			for (var j = dest.length - 1; j > 0; j--) { // the comparison must be j > 0 to allow for the checking of the j - 1th element
				if  (dest.options[j].text < dest.options[j - 1].text) {
					var o = dest.options[j - 1];
					dest.options[j - 1] = new Option(dest.options[j].text, dest.options[j].value);
					dest.options[j] = o;
				}
			}
			src.options[i] = null;
			i--;
		}
	}
}

function manLesson(src, dest) {
	src = document.getElementById(src);
	dest = document.getElementById(dest);
	if (dest === null || src === null) {
		alert('Dest or src not found!');
		return;
	}
	var mods = JSON.parse(document.getElementById('mods').value), nextNew = -1;
	for (var i = 0; i < mods.length && mods[0] != null; i++) {
		if (mods[i] === null) {
			continue;
		}
		var j = parseInt(mods[i].Value, 10);
		if (isNaN(j) && j <= nextNew) {
			nextNew = j - 1; // new nums are always decreasing negative numbers
		}
	}
	for (i = 0; i < src.options.length; i++) {
		if (src.options[i].selected && dest.id == 'courseModules') {
			document.getElementById('modChanged').value = 1;
			dest.options[dest.length] = new Option(src.options[i].text, nextNew);
			mods[mods.length] = {"Value" : nextNew, "modID" : src.options[i].value, "Option" : src.options[i].text,
								 "deleted" : 0, "mode" : 0, "emailResults" : 0, "avail" : 0, "sDate" : '', "eDate" : '',
								 'ongoing' : 0, 'unit' : 0, 'UC' : 0};
			nextNew--;
		} else if (src.options[i].selected && src.id == 'courseModules') {
			document.getElementById('modChanged').value = 1;
			for (j = 0; j < mods.length; j++) {
				if (mods[j].Value == src.options[i].value) {
					mods[j].deleted = 1;
				}
			}
			src.options[i] = null;
			i--;
		}
	}
	document.getElementById('mods').value = JSON.stringify(mods);
}

function swapPos(val1, val2) {
	var mods = JSON.parse(document.getElementById('mods').value);
	if (mods.length > 1 && val1 != val2) {
		var num1 = -1, num2 = -1;
		for (var i = 0; i < mods.length; i++) {
			if (mods[i].Value == val1) {
				num1 = i;
			} else if (mods[i].Value == val2) {
				num2 = i;
			}
			if (num1 != -1 && num2 != -1) {
				break;
			}
		}
		if (num1 == -1 || num2 == -1) {
			alert('Can\'t swap positions one or both lessons not found.');
			return;
		}
		var n = mods[num1];
		mods[num1] = mods[num2];
		mods[num2] = n;
		document.getElementById('mods').value = JSON.stringify(mods);
	} else if (val1 != val2) {
		alert("Not enought Lesson available to swap");
	}
}

function moveV(dir) {
	var cm = document.getElementById('courseModules');
	if (typeof dir == 'undefined' || dir === 0) {
		alert('No direction specified.');
	} else if (cm.selectedIndex == -1) {
		alert('No lesson(s) selected.');
	} else {
		var i = (dir === 1) ? 0 : cm.length - 1;
		while ((dir === 1 && i < cm.length) || (dir === -1 && i >= 0)) {
			if (cm.options[i].selected) {
				document.getElementById('modChanged').value = 1;
				var o = new Option(cm.options[i].text, cm.options[i].value, true);
				if (dir === 1 && i > 0) {
					cm.options[i] = new Option(cm.options[i - 1].text, cm.options[i - 1].value);
					cm.options[i - 1] = o;
					swapPos(cm.options[i].value, cm.options[i - 1].value);
				} else if (dir == -1 && i < (cm.length - 1)) { // down
					cm.options[i] = new Option(cm.options[i + 1].text, cm.options[i + 1].value);
					cm.options[i + 1] = o;
					swapPos(cm.options[i + 1].value, cm.options[i].value);
				} else if ((dir == -1 && i == (cm.length - 1)) || (dir == 1 && i === 0)) {
					return;
				}
			}
			if (dir == 1) { i++; } else { i--; }
		}
	}
}

function update(doc) {
	doc = (doc === null || typeof doc == 'undefined') ? document : doc;
	var ae = doc.getElementById('availEvent'), m = doc.getElementById('ongoing'), unit = doc.getElementById('unit'),
		ao = doc.getElementById('ongoingAlways'), e = doc.getElementById('event'), af = doc.getElementById('availDates'),
		sd = doc.getElementById('sDate'), ed = doc.getElementById('eDate');
	if (ae.checked === true) {
		e.disabled = m.disabled = unit.disabled = ao.disabled = false;
		sd.disabled = ed.disabled = true;
	} else if (af.checked === true) {
		m.disabled = e.disabled = unit.disabled = ao.disabled = true;
		sd.disabled = ed.disabled = false;
	}
}

function prep() {	//used when on unload
	document.getElementById('modChanged').value = 0;
	var cs = document.getElementById('courseStudents');
	for (var i = 0; i < cs.options.length; i++) {
		if (!cs.options[i].selected) {
			cs.options[i].selected = true;
		}
	}
	return true;
}

function leave(e) {
	if (document.getElementById('modChanged').value == 1 && confirm('This course has been updated do you want to save the changes?')) {
		var redirect = document.getElementById('modChanged');
		redirect.name = 'redirect';
		redirect.value = e.target.activeElement;
		document.getElementById('modify').click();
		prep();
		return cancelEvent(e);
	} else {
		return true;
	}
}

function editLesson() {
	window.resizeTo(900, 360);
	window.moveTo((window.screen.width/2)-450, (window.screen.height/2)-180);
	var sel = window.opener.document.getElementById('courseModules'), editWin = document,
		id = editWin.getElementById('hCMID'), mods = JSON.parse(window.opener.document.getElementById('mods').value);
	if (sel === null || sel.selectedIndex == -1 || typeof mods != 'object') {
		alert('No Lesson Selected');
		window.close();
		return;
	} else if (sel.selectedIndex >= 0 && id.value == '0') {
		var mod = null;
		for (var i in mods) {
			if (mods[i].deleted === 0 && mods[i].Value == sel[sel.selectedIndex].value) {
				mod = mods[i];
				break;
			}
		}

		if (mod === null) {
			alert('Could not find lesson!');
			window.close();
			return;
		}
		id.value = mod.Value;
		editWin.getElementById('h1').innerHTML = 'Edit Lesson #' + (sel.selectedIndex + 1) + ': ' + mod.Option;
		mod.aval = (typeof mod.avail != 'undefined') ? mod.avail : 0;
		editWin.getElementById('availDates').checked = (mod.avail == 1); // Same as AVAIL_FIXED in constants.php
		editWin.getElementById('availEvent').checked = (mod.avail == 2); // Same as AVAIL_EVENT in constants.php
		update();
		var event = editWin.getElementById('event');
		for (i = 0; i < event.length; i++) {
			if (event.options[i].value == mod.event) {
				event.options[i].selected = true;
				break;
			}
		}
		editWin.getElementById('ongoing').value = (parseFloat(mod.ongoing) != 'NaN' && mod.ongoing > 0) ? mod.ongoing : '';
		var unit = editWin.getElementById('unit');
		mod.unit = (typeof mod.unit != 'undefined' && mod.unit > 0 && mod.unit < 4) ? mod.unit : 0;
		for (i = 0; i < unit.length; i++) {
			if (unit.options[i].value == mod.unit) {
				unit.options[i].selected = true;
			}
		}
		editWin.getElementById('ongoingAlways').checked = (parseInt(mod.ongoing, 10) === 0 && mod.avail == 2);
		editWin.getElementById('sDate').value = (typeof mod.sDate != 'undefined') ? mod.sDate : '';
		editWin.getElementById('eDate').value = (typeof mod.eDate != 'undefined') ? mod.eDate : '';
		editWin.getElementById('UC').checked = (typeof mod.UC != 'undefined' && mod.UC === 1) ? true : false;
		var mode = editWin.getElementById('mode');
		mod.mode = (typeof mod.mode != 'undefined') ? mod.mode : 0;
		for (i = 0; i < mode.length; i++) {
			if (mode.options[i].value == mod.mode) {
				mode.options[i].selected = true;
				break;
			}
		}
		var er = editWin.getElementById('emailResults');
		mod.emailResults = (typeof mod.emailResults != 'undefined') ? mod.emailResults : 0;
		for (i = 0; i < er.length; i++) {
			if (er.options[i].value == mod.emailResults) {
				er.options[i].selected = true;
			}
		}
	}
}

function saveLesson() {
	var d = document, id = document.getElementById('hCMID').value;
	if (id !== 0) {
		var mod = {}, i = 0, aEvent = d.getElementById('availEvent').checked, uc = d.getElementById('UC').checked,
			ongoing = d.getElementById('ongoing'), unit = d.getElementById('unit'), mode = d.getElementById('mode'),
			oa = d.getElementById('ongoingAlways').checked, sDate = d.getElementById('sDate').value,
			eDate = d.getElementById('eDate').value, er = d.getElementById('emailResults'),
			mods = JSON.parse(window.opener.document.getElementById('mods').value), event = d.getElementById('event');
		for (i = 0; i < mods.length; i++) {
			if (mods[i].Value == id) {
				mod = mods[i];
				break;
			}
		}
		if (typeof mod.modID == 'undefined') {
			alert('This lesson was not found in the current list of lessons for this course, it cannot be save.');
		}
		mod.avail = (aEvent) ? 2 : 1;
		if (mod.avail == 2) {
			mod.event = event[event.selectedIndex].value;
			mod.ongoing = (oa.checked) ? 0 : parseFloat(ongoing.value);
			if (mod.ongoing == 'NaN') {
				alert('The amount of time provided for On-demant is not a value decimal number, please fix this.');
				return;
			}
			mod.unit = unit[unit.selectedIndex].value;
			mod.sDate = mod.eDate = '';
		} else {
			mod.ongoing = 0;
			mod.unit = 0;
			sDate = (sDate.length > 0) ? new Date(sDate) : '';
			if (sDate !== '' && sDate != 'Invalid Date') {
				mod.sDate = (sDate.getMonth() + 1) + '/' + sDate.getDate() + '/';
				if ((IE() && sDate.getYear() < 2000) || !IE()) {
					mod.sDate += (1900 + sDate.getYear());
				} else if (IE() && sDate.getYear() >= 2000) {
					mod.sDate += sDate.getYear();
				}
			} else {
				alert('The Start Date is not valid a date, please fix this.');
				return;
			}
			eDate = (eDate.length > 0) ? new Date(eDate) : '';
			if (eDate !== '' && eDate != 'Invalid Date') {
				mod.eDate = (eDate.getMonth() + 1) + '/' + eDate.getDate() + '/';
				if ((IE() && eDate.getYear() < 2000) || !IE) {
					mod.eDate += (1900 + eDate.getYear());
				} else if (IE() && eDate.getYear() >= 2000) {
					mod.eDate += eDate.getYear();
				}
			} else if (eDate !== '') {
				alert('The End Date is not valid a date, please fix this.');
				return;
			}
		}
		mod.UC = uc;
		mod.mode = mode[mode.selectedIndex].value;
		mod.emailResults = er[er.selectedIndex].value;
		mods[i] = mod;
		window.opener.document.getElementById('mods').value = JSON.stringify(mods);
		window.opener.document.getElementById('modChanged').value = 1;
		window.close();
	}
}