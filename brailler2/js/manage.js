/*global IE, BRAILLE, dojo, Option */
/*jslint broswer:true */
/**********************************************
 * Functions used on the Manage course Page.
 **********************************************/
function checkDel(e, type) {
	var del = document.getElementById('del');
	alert(del.selectedIndex);
	if (del.selectedIndex === 0) {
		alert('Please select a ' + type + ' to delete.');
	} else if (confirm('Are you sure you want to delete the ' + type + '" ' + del[del.selectedIndex].text + '"?')) {
		document.getElementById('form_del').submit();
	}
}
function saveStudentDetails(event) {
	var el = (IE() ? event.srcElement : event.target), sel = document.getElementById('courseStudents'),
		stud = (sel.selectedIndex > -1 ? studs[sel[sel.selectedIndex].value] : null);
	if (stud === null) {
		return;
	}
	if (el.id == 'disabled') {
		stud.disabled = el.checked;
	} else if (el.id == 'notes') {
		stud.notes += String.fromCharCode(IE() ? event.keyCode : event.which);
	} else if (el.id == 'newEnd') {
		var str = [];
		if (/(0?\d|1[0-2])\/(0?\d|[12]\d|3[01])\/\d{4}/.test(el.value)) {
			str = el.value.match(/(0?\d|1[0-2])\/(0?\d|[12]\d|3[01])\/(\d{4})/);
			str[0] += ' 23:59:59';
		} else if (/\d{4}-(0?\d|1[0-2])-(0?\d|[12]\d|3[01])/.test(el.value)) {
			str = el.value.match(/(\d{4})-(0?\d|1[0-2])-(0?\d|[12]\d|3[01])/);
			str[0] = str[2] + '/' + str[3] + '/' + str[1] + ' 23:59:59';
			str[4] = str[1];	// Temp storage.
			str[1] = str[2];	// Month
			str[2] = str[3];	// Day
			str[3] = str[4];	// year;
			str.splice(-1);		// remove the temporary index
		}
		var date = new Date(str[0]);
		if (typeof str[0] != 'undefined' && date == (IE() ? 'NaN' : 'Invalid Date')
		 && (date.getFullYear() != str[3] || (date.getMonth() + 1) != str[1] || date.getDate() != str[2])) {
			alert('The new end date entered is not a valid date please reenter it.');
			document.getElementById('newEnd').focus();
			return cancelEvent(event);
		}
		stud.newEnd = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		document.getElementById('end').innerHTML = stud.newEnd;
		document.getElementById('courseStudents').disabled = false;
	}
}

function showStudentDetails(event) {
	var el = (IE() ? event.srcElement : event.target), sel = document.getElementById('courseStudents'),
		stud = (sel.selectedIndex > -1 ? studs[sel[sel.selectedIndex].value] : null);
	if (el.id == 'courseStudents') {
		document.getElementById('details').style.display = 'block';
		document.getElementById('name1').innerHTML = stud.fname + ' ' + stud.lname;
		document.getElementById('start').innerHTML = stud.start;
		document.getElementById('last').innerHTML = stud.last;
		document.getElementById('end').innerHTML = (stud.newEnd ? stud.newEnd : stud.end);
		document.getElementById('newEnd').disabled = (stud.end == 'unknown');
		document.getElementById('notes').value = '';
		document.getElementById('notes').value = stud.notes;
		document.getElementById('disabled').checked = (stud.disabled == 1);
	} else {
		document.getElementById('details').style.display = 'none';
	}
}

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
	for (var i = 0; i < mods.length && mods[0] !== null; i++) {
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
	if ([1, -1].indexOf(dir) == -1) {
		alert('No direction specified.');
	} else if (cm === null) {
		alert('Could not find select box!');
	} else if (cm.selectedIndex == -1) {
		alert('No lesson(s) selected.');
	} else if (cm.options.length > 1) {
		var i = (dir == 1) ? 0 : cm.length - 1;
		document.getElementById('modChanged').value = 1;
		while ((dir == 1 && i < cm.length) || (dir == -1 && i >= 0)) {
			if (cm.options[i].selected) {
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
			(dir == 1) ? i++ : i--;
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
	var course = document.getElementById('');
	for (var i = 0; i < cs.options.length; i++) {
		if (!cs.options[i].selected) {
			cs.options[i].selected = true;
		}
	}
	return true;
}

function leave(e) {
	if (document.getElementById('modChanged') && document.getElementById('modChanged').value == 1
	 && confirm('This course has been updated do you want to save the changes?')) {
		var redirect = document.getElementById('modChanged');
		redirect.name = 'redirect';
		redirect.value = e.target.activeElement;
		document.getElementById('modify').click();
		prep();
		return cancelEvent(e);
	}
	return true;
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
			if (mods[i] !== null && mods[i].deleted === 0 && mods[i].Value == sel[sel.selectedIndex].value) {
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