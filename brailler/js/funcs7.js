
var keys=[0,0,0,0,0,0],text=[],line='';function cancelEvent(e){e.returnValue=false;e.cancel=true;if(!IE()){e.stopPropagation();e.preventDefault();}
return false;}
function load(){var e=document.getElementById('email');if(e!==null){e.focus();}}
function del(){var t=document.getElementById('text');if(typeof t!='undefined'&&text.length>0){var chr=text.pop(),answer=text.join(''),imgs=t.innerHTML.split((BRAILLE()?'':'<'));if(line.length>1){line=line.substr(0,line.length-1);}else{if((line.length==1&&answer.substr(-1)!='\n'&&!BRAILLE())||line.length===0){imgs.pop();}
var len=answer.lastIndexOf('\n');len=(len==-1||answer.length-len>41)?-41:len+1;len=((len*-1)>text.length)?0:len;line=answer.substr(len);line=(len==-41)?line.substr(line.indexOf(' ')+1):line;}
if(chr!='\n'||BRAILLE()){imgs.pop();if(!BRAILLE()||chr=='\n'){imgs.pop();imgs.pop();imgs.pop();}}
var nl=((IE())?'BR>':'br>'),pos=imgs.lastIndexOf(nl),pos2=imgs.lastIndexOf(nl,pos-1);if(pos2!=-1&&(pos!=-1||imgs.length<162)&&answer.substr(text.length-line.length-1,1)==' '){imgs=imgs.slice(0,pos).concat(['span class="b0">','/span>','span class="ascii">','/span>'],imgs.slice(pos+1));if(answer.length>40){var space=answer.substr(answer.length-41).indexOf(' ');line=answer.substr(answer.length-40+space);}else{line=answer;}}
t.innerHTML=imgs.join((BRAILLE()?'':'<'));document.getElementById('field').value=line;}}
function filter(e){var keynum=0,t=document.getElementById('text');if(IE()){keynum=e.keyCode;}else if(e.which){keynum=e.which;}
if(!IE()&&keynum===0&&e.keyCode==9){return true;}
if(BRAILLE()===false){switch(keynum){case 68:case 100:keys[1]=1;break;case 70:case 102:keys[0]=1;break;case 74:case 106:keys[3]=1;break;case 75:case 107:keys[4]=1;break;case 76:case 108:keys[5]=1;break;case 83:case 115:keys[2]=1;break;case 32:keys=[0,0,0,0,0,0];break;case 13:t.innerHTML+='<br />';text.push('\n');document.getElementById('field').value=line='';default:return cancelEvent(e);}}else if(keynum==13){return cancelEvent(e);}
return false;}
function isArray(a){return(a!==null&&a.constructor.toString().indexOf('Array')!=-1);}
function cancel(e){var keynum=0;if(IE()){keynum=e.keyCode;}else{keynum=e.which;}
if([8,46].indexOf(keynum)!=-1){del();}else if([0,68,100,70,102,74,106,75,107,76,108,83,115,32,13].indexOf(keynum)){return false;}
return cancelEvent(e);}
function imgName(a){var s='';if(a===null||!isArray(a)){return false;}
for(var i=0;i<6;i++){s+=(a[i]==1)?''+(i+1):'';}
s=(s==='')?'0':s;return s;}
function ascii(k){if(k===null||!isArray(k)){return false;}
k=k.join('');if(k.match('/[^01]/')){return false;}
k=parseInt(k,2);if(isNaN(k)||k<0||k>63){return false;}
var c=false;switch(k){case 0:c=' ';break;case 1:c=',';break;case 2:c='"';break;case 3:c=';';break;case 4:c='@';break;case 5:c='.';break;case 6:c='^';break;case 7:c='_';break;case 8:c='\'';break;case 9:c='-';break;case 10:c='9';break;case 11:c='0';break;case 12:c='/';break;case 13:c='+';break;case 14:c='>';break;case 15:c='#';break;case 16:c='1';break;case 17:c='5';break;case 18:c='3';break;case 19:c='4';break;case 20:c='i';break;case 21:c='[';break;case 22:c='j';break;case 23:c='w';break;case 24:c='2';break;case 25:c='8';break;case 26:c='6';break;case 27:c='7';break;case 28:c='s';break;case 29:c='!';break;case 30:c='t';break;case 31:c=')';break;case 32:c='a';break;case 33:c='*';break;case 34:c='e';break;case 35:c=':';break;case 36:c='c';break;case 37:c='%';break;case 38:c='d';break;case 39:c='?';break;case 40:c='k';break;case 41:c='u';break;case 42:c='o';break;case 43:c='z';break;case 44:c='m';break;case 45:c='x';break;case 46:c='n';break;case 47:c='y';break;case 48:c='b';break;case 49:c='<';break;case 50:c='h';break;case 51:c='\\';break;case 52:c='f';break;case 53:c='$';break;case 54:c='g';break;case 55:c=']';break;case 56:c='l';break;case 57:c='v';break;case 58:c='r';break;case 59:c='(';break;case 60:c='p';break;case 61:c='&';break;case 62:c='q';break;case 63:c='=';break;}
return c;}
function getImage(e){var keynum=0,imageName=imgName(keys),f=document.getElementById('field'),t=document.getElementById('text'),chr=(BRAILLE())?(keynum==13?'\n':f.value.substr(-1)):ascii(keys);if(IE()){keynum=e.keyCode;}else if(e.which){keynum=e.which;}
if(BRAILLE()){text.push(chr);line+=chr;t.innerHTML+=(keynum==13?'<br />':chr);}else if(imageName!='0'||keynum===null||(imageName=='0'&&keynum==32)){text.push(chr);line+=chr;var imgs=t.innerHTML.split('<');imgs.push('span class="b'+imageName+'">','/span>','span class="ascii">'+chr,'/span>');if(line.length==41&&text.length>39){for(var i=imgs.length-1;i>0;i--){if(imgs[i].indexOf('b0')>0){imgs[i]='br />';imgs=imgs.slice(0,i+1).concat(imgs.slice(i+4));line=line.substr(line.lastIndexOf(' ')+1);break;}}
if(i===0){i=imgs.length;imgs[i]=imgs[i-1];imgs[i-1]=imgs[i-2];imgs[i-2]=imgs[i-3];imgs[i-3]=imgs[i-4];imgs[i-4]='br />';line=line.substr(40);}}
t.innerHTML=imgs.join('<');}
f.value=line;keys=[0,0,0,0,0,0];}
function dumpProps(obj,parent){for(var i in obj){if(parent){var msg=parent+"."+i+"\n"+obj[i];}else{var msg=i+"\n"+obj[i];}
if(!confirm(msg)){return;}
if(typeof obj[i]=="object"){if(parent){dumpProps(obj[i],parent+"."+i);}else{dumpProps(obj[i],i);}}}}
function clearAnswer(e){document.getElementById('answer').innerHTML='';document.getElementById('field').focus();return cancelEvent(e);}
function checkBraille(){document.getElementById('field').value='';document.getElementById('hb').value=text.join('');document.getElementById('brailler').submit();}
function hint(){var a=document.getElementById('real_answer').childNodes,lc=1,cc=1,b=document.getElementById('your_answer').childNodes;for(var i=0;i<Math.min(a.length,b.length);i++){if(a[i].innerHTML!=b[i].innerHTML){alert('First error occurred at Line: '+lc+' Column: '+cc);return;}else if(a[i].nodeName=='BR'){lc++;cc=0;}
cc++;}
alert('First error occurred at Line: '+lc+' Column: '+cc);}
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(elt){var len=this.length,from=Number(arguments[1])||0;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0){from+=len;}
for(;from<len;from++){if(from in this&&this[from]===elt){return from;}}
return-1;};}
if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=function(elt){var len=this.length,from=Number(arguments[1])||len-1;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0){from=len+from;}
if(from>=len||from<0){from=len-1;}
for(;from>0;from--){if(from in this&&this[from]===elt){return from;}}
return-1;};}
String.prototype.substr=function(start){var len=Number(arguments[1])||this.length,ret='';if(start<0){start+=this.length;}
len=(len<0)?Math.abs((this.length+len)%this.length):Math.floor(len);len=(len>this.length-start)?this.length-start:len;for(;len>0;len--){ret+=this.charAt(start);start++;}
return ret;};function moveStudent(src,dest){src=document.getElementById(src);dest=document.getElementById(dest);if(dest===null||src===null){alert('Dest or src not found!');return;}
for(var i=0;i<src.options.length;i++){if(src.options[i].selected){document.getElementById('modChanged').value=1;dest.options[dest.length]=new Option(src.options[i].text,src.options[i].value);for(var j=dest.length-1;j>0;j--){if(dest.options[j].text<dest.options[j-1].text){var o=dest.options[j-1];dest.options[j-1]=new Option(dest.options[j].text,dest.options[j].value);dest.options[j]=o;}}
src.options[i]=null;i--;}}}
function manLesson(src,dest){src=document.getElementById(src);dest=document.getElementById(dest);if(dest===null||src===null){alert('Dest or src not found!');return;}
var mods=JSON.parse(document.getElementById('mods').value),nextNew=-1;for(var i=0;i<mods.length;i++){var j=parseInt(mods[i].Value,10);if(isNaN(j)&&j<=nextNew){nextNew=j-1;}}
for(i=0;i<src.options.length;i++){if(src.options[i].selected&&dest.id=='courseModules'){document.getElementById('modChanged').value=1;dest.options[dest.length]=new Option(src.options[i].text,nextNew);mods[mods.length]={"Value":nextNew,"modID":src.options[i].value,"Option":src.options[i].text,"deleted":0,"mode":0,"emailResults":0,"avail":0,"sDate":'',"eDate":'','ongoing':0,'unit':0,'UC':0};nextNew--;}else if(src.options[i].selected&&src.id=='courseModules'){document.getElementById('modChanged').value=1;for(j=0;j<mods.length;j++){if(mods[j].Value==src.options[i].value){mods[j].deleted=1;}}
src.options[i]=null;i--;}}
document.getElementById('mods').value=JSON.stringify(mods);}
function swapPos(val1,val2){var mods=JSON.parse(document.getElementById('mods').value);if(mods.length>1&&val1!=val2){var num1=-1,num2=-1;for(var i=0;i<mods.length;i++){if(mods[i].Value==val1){num1=i;}else if(mods[i].Value==val2){num2=i;}
if(num1!=-1&&num2!=-1){break;}}
if(num1==-1||num2==-1){alert('Can\'t swap positions one or both lessons not found.');return;}
var n=mods[num1];mods[num1]=mods[num2];mods[num2]=n;document.getElementById('mods').value=JSON.stringify(mods);}else if(val1!=val2){alert("Not enought Lesson available to swap");}}
function moveV(dir){var cm=document.getElementById('courseModules');if(typeof dir=='undefined'||dir===0){alert('No direction specified.');}else if(cm.selectedIndex==-1){alert('No lesson(s) selected.');}else{var i=(dir===1)?0:cm.length-1;while((dir===1&&i<cm.length)||(dir===-1&&i>=0)){if(cm.options[i].selected){document.getElementById('modChanged').value=1;var o=new Option(cm.options[i].text,cm.options[i].value,true);if(dir===1&&i>0){cm.options[i]=new Option(cm.options[i-1].text,cm.options[i-1].value);cm.options[i-1]=o;swapPos(cm.options[i].value,cm.options[i-1].value);}else if(dir==-1&&i<(cm.length-1)){cm.options[i]=new Option(cm.options[i+1].text,cm.options[i+1].value);cm.options[i+1]=o;swapPos(cm.options[i+1].value,cm.options[i].value);}else if((dir==-1&&i==(cm.length-1))||(dir==1&&i===0)){return;}}
if(dir==1){i++;}else{i--;}}}}
function update(doc){doc=(doc===null||typeof doc=='undefined')?document:doc;var ae=doc.getElementById('availEvent'),m=doc.getElementById('ongoing'),unit=doc.getElementById('unit'),ao=doc.getElementById('ongoingAlways'),e=doc.getElementById('event'),af=doc.getElementById('availDates'),sd=doc.getElementById('sDate'),ed=doc.getElementById('eDate');if(ae.checked===true){e.disabled=m.disabled=unit.disabled=ao.disabled=false;sd.disabled=ed.disabled=true;}else if(af.checked===true){m.disabled=e.disabled=unit.disabled=ao.disabled=true;sd.disabled=ed.disabled=false;}}
function prep(){document.getElementById('modChanged').value=0;var cs=document.getElementById('courseStudents');for(var i=0;i<cs.options.length;i++){if(!cs.options[i].selected){cs.options[i].selected=true;}}
return true;}
function leave(e){if(document.getElementById('modChanged').value==1&&confirm('This course has been updated do you want to save the changes?')){var redirect=document.getElementById('modChanged');redirect.name='redirect';redirect.value=e.target.activeElement;document.getElementById('modify').click();prep();return cancelEvent(e);}else{return true;}}
function editLesson(){window.resizeTo(900,360);window.moveTo((window.screen.width/2)-450,(window.screen.height/2)-180);var sel=window.opener.document.getElementById('courseModules'),editWin=document,id=editWin.getElementById('hCMID'),mods=JSON.parse(window.opener.document.getElementById('mods').value);if(sel===null||sel.selectedIndex==-1||typeof mods!='object'){alert('No Lesson Selected');window.close();return;}else if(sel.selectedIndex>=0&&id.value=='0'){var mod=null;for(var i in mods){if(mods[i].deleted===0&&mods[i].Value==sel[sel.selectedIndex].value){mod=mods[i];break;}}
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