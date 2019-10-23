var keys=[0,0,0,0,0,0],text=[],line='',remainder=0;function cancelEvent(e){e.returnValue=false;e.cancel=true;if(!IE()){e.stopPropagation();e.preventDefault();}
return false;}
function load(){var e=document.getElementById('email');if(e!==null){e.focus();}}
function del(){var t=document.getElementById('text');if(typeof t!='undefined'&&text.length>0){var chr=text.pop().charCodeAt(0);if(BRAILLE()){t.innerHTML=t.innerHTML.substr(0,(chr==13?-4:-1));}else if(chr!='\n'){t.removeChild(t.lastChild);}
if(remainder-line.length<-1){line=line.substr(0,-1);}else if(!BRAILLE()){var p=0,p2=-1,p3=-1,fakes=0;for(var i=Math.max(0,t.childNodes.length-83);i<t.childNodes.length;i++){if(t.childNodes[i].nodeName=='BR'){p3=p2;p2=p;p=i;fakes+=([' ','\n'].indexOf(text[p2])==-1&&p2>0);}}
line=(text[text.length-1]=='\n')?'':text.slice(p2+(p2>0)-fakes).join('');remainder=(p3>-1&&text[p2]!='\n')?40-p2+p3+(p3>0):0;if(text[p]==' '){var span=document.createElement('span');span.className='b0';t.replaceChild(span,t.childNodes[p]);}else if(chr==13||[' ','\n'].indexOf(text[text.length-1])==-1){t.removeChild(t.lastChild);}}else if(BRAILLE()){var nl=text.lastIndexOf(String.fromCharCode(13));line=(chr==13?text.slice(nl>-1?nl:0).join(''):'');}
document.getElementById('field').value=line;}}
function filter(e){var kc=(IE()?e.keyCode:e.which),t=document.getElementById('text'),f=document.getElementById('field');if(!IE()&&([9,37,39].indexOf(e.keyCode)!=-1||e.altKey||e.crtlKey)){return true;}
if(!BRAILLE()){switch(kc){case 68:case 100:keys[1]=1;break;case 70:case 102:keys[0]=1;break;case 74:case 106:keys[3]=1;break;case 75:case 107:keys[4]=1;break;case 76:case 108:keys[5]=1;break;case 83:case 115:keys[2]=1;break;case 32:keys=[0,0,0,0,0,0];break;case 13:t.appendChild(document.createElement('br'));remainder=0;text.push('\n');document.getElementById('field').value=line='';default:return cancelEvent(e);}}else if(kc==13){text.push('\n');f.value=line='';t.innerHTML+='<br />';return cancelEvent(e);}else if(kc>31){chr=e.charCode?e.charCode:kc;chr=String.fromCharCode(chr);text.push(chr);line+=chr;t.innerHTML+=chr;f.value=line;return true;}
return false;}
function isArray(a){return(a!==null&&a.constructor.toString().indexOf('Array')!=-1);}
function cancel(e){var kc=IE()?e.keyCode:e.which;if([8,46].indexOf(kc)!=-1){del();}else if([37,39,9,112,113,114,115,116,117,118,119,120,121,122,123].indexOf(e.keyCode)!=-1||BRAILLE()){return true;}else if([0,68,100,70,102,74,106,75,107,76,108,83,115,32,13].indexOf(kc)!=-1){return false;}
return cancelEvent(e);}
function imgName(a){var s='';if(a===null||!isArray(a)){return false;}
for(var i=0;i<6;i++){s+=(a[i]==1)?''+(i+1):'';}
s=(s==='')?'0':s;return s;}
function ascii(k){if(k===null||!isArray(k)){return false;}
k=k.join('');if(k.match('/[^01]/')){return false;}
k=parseInt(k,2);if(isNaN(k)||k<0||k>63){return false;}
switch(k){case 0:return' ';case 1:return',';case 2:return'"';case 3:return';';case 4:return'@';case 5:return'.';case 6:return'^';case 7:return'_';case 8:return'\'';case 9:return'-';case 10:return'9';case 11:return'0';case 12:return'/';case 13:return'+';case 14:return'>';case 15:return'#';case 16:return'1';case 17:return'5';case 18:return'3';case 19:return'4';case 20:return'i';case 21:return'[';case 22:return'j';case 23:return'w';case 24:return'2';case 25:return'8';case 26:return'6';case 27:return'7';case 28:return's';case 29:return'!';case 30:return't';case 31:return')';case 32:return'a';case 33:return'*';case 34:return'e';case 35:return':';case 36:return'c';case 37:return'%';case 38:return'd';case 39:return'?';case 40:return'k';case 41:return'u';case 42:return'o';case 43:return'z';case 44:return'm';case 45:return'x';case 46:return'n';case 47:return'y';case 48:return'b';case 49:return'<';case 50:return'h';case 51:return'\\';case 52:return'f';case 53:return'$';case 54:return'g';case 55:return']';case 56:return'l';case 57:return'v';case 58:return'r';case 59:return'(';case 60:return'p';case 61:return'&';case 62:return'q';case 63:return'=';}}
function getImage(e){var kc=IE()?e.keyCode:e.which,f=document.getElementById('field'),t=document.getElementById('text'),imageName=imgName(keys),chr=ascii(keys);if([37,39].indexOf(e.keyCode)!=-1){return;}
if(!BRAILLE()&&(imageName!='0'||kc===null||(imageName=='0'&&kc==32))){text.push(chr);line+=chr;var span=document.createElement('span');span.className='b'+imageName;t.appendChild(span);if(line.length==41&&text.length>39){for(var i=t.childNodes.length-1;i>=t.childNodes.length-41;i--){if(t.childNodes[i].className=='b0'){t.replaceChild(document.createElement('br'),t.childNodes[i]);remainder=40-line.lastIndexOf(' ');line=line.substr(40-remainder+1);break;}}
if(i==t.childNodes.length-42){t.insertBefore(document.createElement('br'),t.lastChild);line=chr;remainder=0;}}
f.value=line;}
keys=[0,0,0,0,0,0];}
function clearAnswer(e){if((IE()?e.srcElement:e.target).id=='field'){document.getElementById('answer').focus();}
document.getElementById('answer').innerHTML='';document.getElementById('field').focus();return cancelEvent(e);}
function checkBraille(){document.getElementById('field').value='';document.getElementById('hb').value=text.join('');document.getElementById('brailler').submit();}
function hint(){var a=document.getElementById('real_answer').childNodes,lc=1,cc=1,b=document.getElementById('your_answer').childNodes;for(var i=0;i<Math.min(a.length,b.length);i++){if(a[i].className!=b[i].className){alert('First error occurred at Line: '+lc+' Column: '+cc);return;}else if(a[i].nodeName=='#text'&&b[i].nodeName=='#text'){for(var j=0;Math.min(a[i].length,b[i].length);j++){if(a[i].nodeValue.charAt(j)!=b[i].nodeValue.charAt(j)){alert('First error occurred at Line: '+lc+' Column: '+(j+1));return;}}
if(a[i].length!=b[i].length){alert('First Error occurred at Line: '+lc+' Column: '+J);return;}}else if(a[i].nodeName=='BR'){lc++;cc=0;}
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
return ret;};