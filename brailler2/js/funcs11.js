
var keys=[0,0,0,0,0,0],text=[],line='',remainder=0;function cancelEvent(e){e.returnValue=false;e.cancel=true;if(!IE()){e.stopPropagation();e.preventDefault();}
return false;}
function load(){var e=document.getElementById('email');if(e!==null){e.focus();}}
function del(){var t=document.getElementById('text');if(typeof t!='undefined'&&text.length>0){var chr=text.pop(),split=(BRAILLE()?'':'<'),imgs=t.innerHTML.split(split);if(chr!='\n'||BRAILLE()){imgs.pop();if(!BRAILLE()||chr=='\n'){imgs.pop();}}
if(remainder-line.length<0){line=line.substr(0,-1);}else{var p=0,p2=-1,p3=-1,temp=0,br=0,nl=(IE()?'BR>':'br>');while((temp=imgs.indexOf(nl,p+1))!=-1){p3=p2;p2=p;p=temp;br++;}
remainder=(br>1&&text[(p2+br-1)/2-1]!='\n')?40-(p2-p3-1)/2:0;line=text.slice((p2+br-(chr=='\n'?(br==1?81:3):1))/2).join('');if(text[(p+br)/2-1]==' '){imgs=imgs.slice(0,p).concat(['span class="b0">','/span>'],imgs.slice(p+1));}else if(chr=='\n'||[' ','\n'].indexOf(text[text.length-1])==-1){imgs.pop();}else if(text[text.length-1]=='\n'){line='';}}
t.innerHTML=imgs.join(split);document.getElementById('field').value=line;}}
function filter(e){var keynum=(IE()?e.keyCode:e.which),t=document.getElementById('text');if(!IE()&&([9,37,39].indexOf(e.keyCode)!=-1||e.altKey||e.crtlKey)){return true;}
if(BRAILLE()===false){switch(keynum){case 68:case 100:keys[1]=1;break;case 70:case 102:keys[0]=1;break;case 74:case 106:keys[3]=1;break;case 75:case 107:keys[4]=1;break;case 76:case 108:keys[5]=1;break;case 83:case 115:keys[2]=1;break;case 32:keys=[0,0,0,0,0,0];break;case 13:t.innerHTML+='<br />';text.push('\n');remainder=0;document.getElementById('field').value=line='';default:return cancelEvent(e);}}else if(keynum==13){return cancelEvent(e);}
return false;}
function isArray(a){return(a!==null&&a.constructor.toString().indexOf('Array')!=-1);}
function cancel(e){var keynum=(IE())?e.keyCode:keynum=e.which;if([8,46].indexOf(keynum)!=-1){del();}else if([37,39,9,112,113,114,115,116,117,118,119,120,121,122,123].indexOf(e.keyCode)!=-1){return true;}else if([0,68,100,70,102,74,106,75,107,76,108,83,115,32,13].indexOf(keynum)!=-1){return false;}
return cancelEvent(e);}
function imgName(a){var s='';if(a===null||!isArray(a)){return false;}
for(var i=0;i<6;i++){s+=(a[i]==1)?''+(i+1):'';}
s=(s==='')?'0':s;return s;}
function ascii(k){if(k===null||!isArray(k)){return false;}
k=k.join('');if(k.match('/[^01]/')){return false;}
k=parseInt(k,2);if(isNaN(k)||k<0||k>63){return false;}
switch(k){case 0:return' ';case 1:return',';case 2:return'"';case 3:return';';case 4:return'@';case 5:return'.';case 6:return'^';case 7:return'_';case 8:return'\'';case 9:return'-';case 10:return'9';case 11:return'0';case 12:return'/';case 13:return'+';case 14:return'>';case 15:return'#';case 16:return'1';case 17:return'5';case 18:return'3';case 19:return'4';case 20:return'i';case 21:return'[';case 22:return'j';case 23:return'w';case 24:return'2';case 25:return'8';case 26:return'6';case 27:return'7';case 28:return's';case 29:return'!';case 30:return't';case 31:return')';case 32:return'a';case 33:return'*';case 34:return'e';case 35:return':';case 36:return'c';case 37:return'%';case 38:return'd';case 39:return'?';case 40:return'k';case 41:return'u';case 42:return'o';case 43:return'z';case 44:return'm';case 45:return'x';case 46:return'n';case 47:return'y';case 48:return'b';case 49:return'<';case 50:return'h';case 51:return'\\';case 52:return'f';case 53:return'$';case 54:return'g';case 55:return']';case 56:return'l';case 57:return'v';case 58:return'r';case 59:return'(';case 60:return'p';case 61:return'&';case 62:return'q';case 63:return'=';}}
function getImage(e){var keynum=(IE()?e.keyCode:e.which),f=document.getElementById('field'),t=document.getElementById('text'),imageName=imgName(keys),chr=(BRAILLE())?(keynum==13?'\n':f.value.substr(-1)):ascii(keys);if([37,39].indexOf(e.keyCode)!=-1){return;}
if(BRAILLE()){text.push(chr);line+=chr;t.innerHTML+=(keynum==13?'<br />':chr);}else if(imageName!='0'||keynum===null||(imageName=='0'&&keynum==32)){text.push(chr);line+=chr;var imgs=t.innerHTML.split('<'),i=-1;imgs.push('span class="b'+imageName+'">','/span>');if(line.length==41&&text.length>39&&(i=imgs.lastIndexOf('span class="b0">'))>(imgs.length-81)){imgs[i]='br />';imgs=imgs.slice(0,i+1).concat(imgs.slice(i+2));remainder=40-line.lastIndexOf(' ');line=line.substr(40-remainder+1);}else if(line.length==41&&text.length>39){imgs=imgs.slice(0,-2).concat(['br />'],imgs.slice(-2));line=line.substr(40);remainder=0;}
t.innerHTML=imgs.join((BRAILLE()?'':'<'));}
f.value=line;keys=[0,0,0,0,0,0];}
function clearAnswer(e){if((IE()?e.srcElement:e.target).id=='field'){document.getElementById('answer').focus();}
document.getElementById('answer').innerHTML='';document.getElementById('field').focus();return cancelEvent(e);}
function checkBraille(){document.getElementById('field').value='';document.getElementById('hb').value=text.join('');document.getElementById('brailler').submit();}
function hint(){var a=document.getElementById('real_answer').childNodes,lc=1,cc=1,b=document.getElementById('your_answer').childNodes;for(var i=0;i<Math.min(a.length,b.length);i++){if(a[i].className!=b[i].className){alert('First error occurred at Line: '+lc+' Column: '+cc);return;}else if(a[i].nodeName=='BR'){lc++;cc=0;}
cc++;}
alert('First error occurred at Line: '+lc+' Column: '+cc);}
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(elt){var len=this.length,from=Number(arguments[1])||0;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0){from+=len;}
for(;from<len;from++){if(from in this&&this[from]===elt){return from;}}
return-1;};}
if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=function(elt){var len=this.length,from=Number(arguments[1])||len-1;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0){from=len+from;}
if(from>=len||from<0){from=len-1;}
for(;from>0;from--){if(from in this&&this[from]===elt){return from;}}
return-1;};}
String.prototype.substr=function(start){if(typeof arguments[1]=='number'&&arguments[1]===0){return'';}
var len=Number(arguments[1])||this.length,ret='';if(start<0){start+=this.length;}
len=(len<0)?Math.abs((this.length+len)%this.length):Math.floor(len);len=(len>this.length-start)?this.length-start:len;for(;len>0;len--){ret+=this.charAt(start);start++;}
return ret;};function checkDel(e,type){var course=document.getElementById('del');if(course.selectedIndex===0){alert('Please select a '+type+' to delete.');}else if(confirm('Are you sure you want to delete the '+type+'" '+course[course.selectedIndex].text+'"?')){document.getElementById('form_del').submit();}}
function moveStudent(src,dest){src=document.getElementById(src);dest=document.getElementById(dest);if(dest===null||src===null){alert('Dest or src not found!');return;}
for(var i=0;i<src.options.length;i++){if(src.options[i].selected){document.getElementById('modChanged').value=1;dest.options[dest.length]=new Option(src.options[i].text,src.options[i].value);for(var j=dest.length-1;j>0;j--){if(dest.options[j].text<dest.options[j-1].text){var o=dest.options[j-1];dest.options[j-1]=new Option(dest.options[j].text,dest.options[j].value);dest.options[j]=o;}}
src.options[i]=null;i--;}}}
function manLesson(src,dest){src=document.getElementById(src);dest=document.getElementById(dest);if(dest===null||src===null){alert('Dest or src not found!');return;}
var mods=JSON.parse(document.getElementById('mods').value),nextNew=-1;for(var i=0;i<mods.length&&mods[0]!==null;i++){if(mods[i]===null){continue;}
var j=parseInt(mods[i].Value,10);if(isNaN(j)&&j<=nextNew){nextNew=j-1;}}
for(i=0;i<src.options.length;i++){if(src.options[i].selected&&dest.id=='courseModules'){document.getElementById('modChanged').value=1;dest.options[dest.length]=new Option(src.options[i].text,nextNew);mods[mods.length]={"Value":nextNew,"modID":src.options[i].value,"Option":src.options[i].text,"deleted":0,"mode":0,"emailResults":0,"avail":0,"sDate":'',"eDate":'','ongoing':0,'unit':0,'UC':0};nextNew--;}else if(src.options[i].selected&&src.id=='courseModules'){document.getElementById('modChanged').value=1;for(j=0;j<mods.length;j++){if(mods[j].Value==src.options[i].value){mods[j].deleted=1;}}
src.options[i]=null;i--;}}
document.getElementById('mods').value=JSON.stringify(mods);}
function swapPos(val1,val2){var mods=JSON.parse(document.getElementById('mods').value);if(mods.length>1&&val1!=val2){var num1=-1,num2=-1;for(var i=0;i<mods.length;i++){if(mods[i].Value==val1){num1=i;}else if(mods[i].Value==val2){num2=i;}
if(num1!=-1&&num2!=-1){break;}}
if(num1==-1||num2==-1){alert('Can\'t swap positions one or both lessons not found.');return;}
var n=mods[num1];mods[num1]=mods[num2];mods[num2]=n;document.getElementById('mods').value=JSON.stringify(mods);}else if(val1!=val2){alert("Not enought Lesson available to swap");}}
function moveV(dir){var cm=document.getElementById('courseModules');if([1,-1].indexOf(dir)!=-1){alert('No direction specified.');}else if(cm.selectedIndex==-1){alert('No lesson(s) selected.');}else if(cm.options.length>1){var i=(dir===1)?0:cm.length-1;document.getElementById('modChanged').value=1;while((dir==1&&i<cm.length)||(dir==-1&&i>=0)){if(cm.options[i].selected){var o=new Option(cm.options[i].text,cm.options[i].value,true);if(dir===1&&i>0){cm.options[i]=new Option(cm.options[i-1].text,cm.options[i-1].value);cm.options[i-1]=o;swapPos(cm.options[i].value,cm.options[i-1].value);}else if(dir==-1&&i<(cm.length-1)){cm.options[i]=new Option(cm.options[i+1].text,cm.options[i+1].value);cm.options[i+1]=o;swapPos(cm.options[i+1].value,cm.options[i].value);}else if((dir==-1&&i==(cm.length-1))||(dir==1&&i===0)){return;}}
(dir==1)?i++:i--;}}}
function update(doc){doc=(doc===null||typeof doc=='undefined')?document:doc;var ae=doc.getElementById('availEvent'),m=doc.getElementById('ongoing'),unit=doc.getElementById('unit'),ao=doc.getElementById('ongoingAlways'),e=doc.getElementById('event'),af=doc.getElementById('availDates'),sd=doc.getElementById('sDate'),ed=doc.getElementById('eDate');if(ae.checked===true){e.disabled=m.disabled=unit.disabled=ao.disabled=false;sd.disabled=ed.disabled=true;}else if(af.checked===true){m.disabled=e.disabled=unit.disabled=ao.disabled=true;sd.disabled=ed.disabled=false;}}
function prep(){document.getElementById('modChanged').value=0;var cs=document.getElementById('courseStudents');for(var i=0;i<cs.options.length;i++){if(!cs.options[i].selected){cs.options[i].selected=true;}}
return true;}
function leave(e){if(document.getElementById('modChanged').value==1&&confirm('This course has been updated do you want to save the changes?')){var redirect=document.getElementById('modChanged');redirect.name='redirect';redirect.value=e.target.activeElement;document.getElementById('modify').click();prep();return cancelEvent(e);}
return true;}
function editLesson(){window.resizeTo(900,360);window.moveTo((window.screen.width/2)-450,(window.screen.height/2)-180);var sel=window.opener.document.getElementById('courseModules'),editWin=document,id=editWin.getElementById('hCMID'),mods=JSON.parse(window.opener.document.getElementById('mods').value);if(sel===null||sel.selectedIndex==-1||typeof mods!='object'){alert('No Lesson Selected');window.close();return;}else if(sel.selectedIndex>=0&&id.value=='0'){var mod=null;for(var i in mods){if(mods[i]!==null&&mods[i].deleted===0&&mods[i].Value==sel[sel.selectedIndex].value){mod=mods[i];break;}}
if(mod===null){alert('Could not find lesson!');window.close();return;}
id.value=mod.Value;editWin.getElementById('h1').innerHTML='Edit Lesson #'+(sel.selectedIndex+1)+': '+mod.Option;mod.aval=(typeof mod.avail!='undefined')?mod.avail:0;editWin.getElementById('availDates').checked=(mod.avail==1);editWin.getElementById('availEvent').checked=(mod.avail==2);update();var event=editWin.getElementById('event');for(i=0;i<event.length;i++){if(event.options[i].value==mod.event){event.options[i].selected=true;break;}}
editWin.getElementById('ongoing').value=(parseFloat(mod.ongoing)!='NaN'&&mod.ongoing>0)?mod.ongoing:'';var unit=editWin.getElementById('unit');mod.unit=(typeof mod.unit!='undefined'&&mod.unit>0&&mod.unit<4)?mod.unit:0;for(i=0;i<unit.length;i++){if(unit.options[i].value==mod.unit){unit.options[i].selected=true;}}
editWin.getElementById('ongoingAlways').checked=(parseInt(mod.ongoing,10)===0&&mod.avail==2);editWin.getElementById('sDate').value=(typeof mod.sDate!='undefined')?mod.sDate:'';editWin.getElementById('eDate').value=(typeof mod.eDate!='undefined')?mod.eDate:'';editWin.getElementById('UC').checked=(typeof mod.UC!='undefined'&&mod.UC===1)?true:false;var mode=editWin.getElementById('mode');mod.mode=(typeof mod.mode!='undefined')?mod.mode:0;for(i=0;i<mode.length;i++){if(mode.options[i].value==mod.mode){mode.options[i].selected=true;break;}}
var er=editWin.getElementById('emailResults');mod.emailResults=(typeof mod.emailResults!='undefined')?mod.emailResults:0;for(i=0;i<er.length;i++){if(er.options[i].value==mod.emailResults){er.options[i].selected=true;}}}}
function saveLesson(){var d=document,id=document.getElementById('hCMID').value;if(id!==0){var mod={},i=0,aEvent=d.getElementById('availEvent').checked,uc=d.getElementById('UC').checked,ongoing=d.getElementById('ongoing'),unit=d.getElementById('unit'),mode=d.getElementById('mode'),oa=d.getElementById('ongoingAlways').checked,sDate=d.getElementById('sDate').value,eDate=d.getElementById('eDate').value,er=d.getElementById('emailResults'),mods=JSON.parse(window.opener.document.getElementById('mods').value),event=d.getElementById('event');for(i=0;i<mods.length;i++){if(mods[i].Value==id){mod=mods[i];break;}}
if(typeof mod.modID=='undefined'){alert('This lesson was not found in the current list of lessons for this course, it cannot be save.');}
mod.avail=(aEvent)?2:1;if(mod.avail==2){mod.event=event[event.selectedIndex].value;mod.ongoing=(oa.checked)?0:parseFloat(ongoing.value);if(mod.ongoing=='NaN'){alert('The amount of time provided for On-demant is not a value decimal number, please fix this.');return;}
mod.unit=unit[unit.selectedIndex].value;mod.sDate=mod.eDate='';}else{mod.ongoing=0;mod.unit=0;sDate=(sDate.length>0)?new Date(sDate):'';if(sDate!==''&&sDate!='Invalid Date'){mod.sDate=(sDate.getMonth()+1)+'/'+sDate.getDate()+'/';if((IE()&&sDate.getYear()<2000)||!IE()){mod.sDate+=(1900+sDate.getYear());}else if(IE()&&sDate.getYear()>=2000){mod.sDate+=sDate.getYear();}}else{alert('The Start Date is not valid a date, please fix this.');return;}
eDate=(eDate.length>0)?new Date(eDate):'';if(eDate!==''&&eDate!='Invalid Date'){mod.eDate=(eDate.getMonth()+1)+'/'+eDate.getDate()+'/';if((IE()&&eDate.getYear()<2000)||!IE){mod.eDate+=(1900+eDate.getYear());}else if(IE()&&eDate.getYear()>=2000){mod.eDate+=eDate.getYear();}}else if(eDate!==''){alert('The End Date is not valid a date, please fix this.');return;}}
mod.UC=uc;mod.mode=mode[mode.selectedIndex].value;mod.emailResults=er[er.selectedIndex].value;mods[i]=mod;window.opener.document.getElementById('mods').value=JSON.stringify(mods);window.opener.document.getElementById('modChanged').value=1;window.close();}}