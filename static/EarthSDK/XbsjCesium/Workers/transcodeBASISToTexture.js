define(["./CompressedTextureBuffer-b8621cc1","./createTaskProcessorWorker","./when-54335d57"],function(C,e,r){"use strict";var gr,t,n=(gr="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0,"undefined"!=typeof __filename&&(gr=gr||__filename),function(e){var r,a=void 0!==(e=e||{})?e:{},t={};for(r in a)a.hasOwnProperty(r)&&(t[r]=a[r]);var n,i,o,u,s=!1,c=!1,l=!1,s="object"==typeof window,c="function"==typeof importScripts,f="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,l=!s&&!f&&!c,p="";f?(p=c?require("path").dirname(p)+"/":__dirname+"/",n=function(e,r){return o=o||require("fs"),e=(u=u||require("path")).normalize(e),o.readFileSync(e,r?null:"utf8")},i=function(e){e=n(e,!0);return g((e=!e.buffer?new Uint8Array(e):e).buffer),e},1<process.argv.length&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(e){if(!(e instanceof function(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}))throw e}),process.on("unhandledRejection",Z),a.inspect=function(){return"[Emscripten Module object]"}):l?("undefined"!=typeof read&&(n=function(e){return read(e)}),i=function(e){return"function"==typeof readbuffer?new Uint8Array(readbuffer(e)):(g("object"==typeof(e=read(e,"binary"))),e)},"undefined"!=typeof print&&("undefined"==typeof console&&(console={}),console.log=print,console.warn=console.error="undefined"!=typeof printErr?printErr:print)):(s||c)&&(c?p=self.location.href:document.currentScript&&(p=document.currentScript.src),p=0!==(p=gr?gr:p).indexOf("blob:")?p.substr(0,p.lastIndexOf("/")+1):"",n=function(e){var r=new XMLHttpRequest;return r.open("GET",e,!1),r.send(null),r.responseText},c&&(i=function(e){var r=new XMLHttpRequest;return r.open("GET",e,!1),r.responseType="arraybuffer",r.send(null),new Uint8Array(r.response)}));var d,h,y=a.print||console.log.bind(console),v=a.printErr||console.warn.bind(console);for(r in t)t.hasOwnProperty(r)&&(a[r]=t[r]);t=null,a.arguments,a.thisProgram,a.quit,a.wasmBinary&&(d=a.wasmBinary),a.noExitRuntime,"object"!=typeof WebAssembly&&v("no native wasm support detected");var f=new WebAssembly.Table({initial:59,maximum:59,element:"anyfunc"}),m=!1;function g(e,r){e||Z("Assertion failed: "+r)}var T="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function C(e,r,t){for(var n=r+t,i=r;e[i]&&!(n<=i);)++i;if(16<i-r&&e.subarray&&T)return T.decode(e.subarray(r,i));for(var o="";r<i;){var a,u,s=e[r++];128&s?(a=63&e[r++],192!=(224&s)?(u=63&e[r++],(s=224==(240&s)?(15&s)<<12|a<<6|u:(7&s)<<18|a<<12|u<<6|63&e[r++])<65536?o+=String.fromCharCode(s):(u=s-65536,o+=String.fromCharCode(55296|u>>10,56320|1023&u))):o+=String.fromCharCode((31&s)<<6|a)):o+=String.fromCharCode(s)}return o}function w(e,r){return e?C(W,e,r):""}function b(e,r,t){return function(e,r,t,n){if(!(0<n))return;for(var i=t,o=t+n-1,a=0;a<e.length;++a){var u=e.charCodeAt(a);if((u=55296<=u&&u<=57343?65536+((1023&u)<<10)|1023&e.charCodeAt(++a):u)<=127){if(o<=t)break;r[t++]=u}else if(u<=2047){if(o<=t+1)break;r[t++]=192|u>>6,r[t++]=128|63&u}else if(u<=65535){if(o<=t+2)break;r[t++]=224|u>>12,r[t++]=128|u>>6&63,r[t++]=128|63&u}else{if(o<=t+3)break;r[t++]=240|u>>18,r[t++]=128|u>>12&63,r[t++]=128|u>>6&63,r[t++]=128|63&u}}return r[t]=0,t-i}(e,W,r,t)}var _="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0;function P(e){for(var r,t=e>>1;I[t];)++t;if(32<(r=t<<1)-e&&_)return _.decode(W.subarray(e,r));for(var n=0,i="";;){var o=I[e+2*n>>1];if(0==o)return i;++n,i+=String.fromCharCode(o)}}function $(e,r,t){if((t=void 0===t?2147483647:t)<2)return 0;for(var n=r,i=(t-=2)<2*e.length?t/2:e.length,o=0;o<i;++o){var a=e.charCodeAt(o);I[r>>1]=a,r+=2}return I[r>>1]=0,r-n}function A(e){return 2*e.length}function F(e){for(var r=0,t="";;){var n,i=k[e+4*r>>2];if(0==i)return t;++r,65536<=i?(n=i-65536,t+=String.fromCharCode(55296|n>>10,56320|1023&n)):t+=String.fromCharCode(i)}}function R(e,r,t){if((t=void 0===t?2147483647:t)<4)return 0;for(var n=r,i=n+t-4,o=0;o<e.length;++o){var a=e.charCodeAt(o);if(55296<=a&&a<=57343&&(a=65536+((1023&a)<<10)|1023&e.charCodeAt(++o)),k[r>>2]=a,i<(r+=4)+4)break}return k[r>>2]=0,r-n}function S(e){for(var r=0,t=0;t<e.length;++t){var n=e.charCodeAt(t);55296<=n&&n<=57343&&++t,r+=4}return r}var E,B,W,I,O,k,j,x,D;function U(e){E=e,a.HEAP8=B=new Int8Array(e),a.HEAP16=I=new Int16Array(e),a.HEAP32=k=new Int32Array(e),a.HEAPU8=W=new Uint8Array(e),a.HEAPU16=O=new Uint16Array(e),a.HEAPU32=j=new Uint32Array(e),a.HEAPF32=x=new Float32Array(e),a.HEAPF64=D=new Float64Array(e)}l=a.INITIAL_MEMORY||16777216;function V(e){for(;0<e.length;){var r,t=e.shift();"function"!=typeof t?"number"==typeof(r=t.func)?void 0===t.arg?a.dynCall_v(r):a.dynCall_vi(r,t.arg):r(void 0===t.arg?null:t.arg):t()}}h=a.wasmMemory||new WebAssembly.Memory({initial:l/65536}),l=(E=h?h.buffer:E).byteLength,U(E),k[79544]=5561216;var G=[],M=[],H=[],z=[];function q(){if(a.preRun)for("function"==typeof a.preRun&&(a.preRun=[a.preRun]);a.preRun.length;)e=a.preRun.shift(),G.unshift(e);var e;V(G)}function L(){if(a.postRun)for("function"==typeof a.postRun&&(a.postRun=[a.postRun]);a.postRun.length;)e=a.postRun.shift(),z.unshift(e);var e;V(z)}var N=Math.ceil,X=Math.floor,J=0,Y=null;function Z(e){throw a.onAbort&&a.onAbort(e),y(e+=""),v(e),m=!0,e="abort("+e+"). Build with -s ASSERTIONS=1 for more info.",new WebAssembly.RuntimeError(e)}a.preloadedImages={},a.preloadedAudios={};var K="data:application/octet-stream;base64,";function Q(e){return String.prototype.startsWith?e.startsWith(K):0===e.indexOf(K)}var ee,re="basis_transcoder.wasm";function te(){try{if(d)return new Uint8Array(d);if(i)return i(re);throw"both async and sync fetching of the wasm failed"}catch(e){Z(e)}}Q(re)||(ee=re,re=a.locateFile?a.locateFile(ee,p):p+ee),M.push({func:function(){dr()}});var ne={};function ie(e){switch(e){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+e)}}var oe=void 0;function ae(e){for(var r="",t=e;W[t];)r+=oe[W[t++]];return r}var ue={},se={},ce={},le=48,fe=57;function pe(e){if(void 0===e)return"_unknown";var r=(e=e.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return le<=r&&r<=fe?"_"+e:e}function de(e,r){return e=pe(e),new Function("body","return function "+e+'() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(r)}function he(e,r){var t=de(r,function(e){this.name=r,this.message=e;e=new Error(e).stack;void 0!==e&&(this.stack=this.toString()+"\n"+e.replace(/^Error(:[^\n]*)?\n/,""))});return t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message},t}var ye=void 0;function ve(e){throw new ye(e)}var me=void 0;function ge(e){throw new me(e)}function Te(n,r,i){function t(e){var r=i(e);r.length!==n.length&&ge("Mismatched type converter count");for(var t=0;t<n.length;++t)Ce(n[t],r[t])}n.forEach(function(e){ce[e]=r});var o=new Array(r.length),a=[],u=0;r.forEach(function(e,r){se.hasOwnProperty(e)?o[r]=se[e]:(a.push(e),ue.hasOwnProperty(e)||(ue[e]=[]),ue[e].push(function(){o[r]=se[e],++u===a.length&&t(o)}))}),0===a.length&&t(o)}function Ce(e,r,t){if(t=t||{},!("argPackAdvance"in r))throw new TypeError("registerType registeredInstance requires argPackAdvance");var n=r.name;if(e||ve('type "'+n+'" must have a positive integer typeid pointer'),se.hasOwnProperty(e)){if(t.ignoreDuplicateRegistrations)return;ve("Cannot register type '"+n+"' twice")}se[e]=r,delete ce[e],ue.hasOwnProperty(e)&&(r=ue[e],delete ue[e],r.forEach(function(e){e()}))}function we(e){ve(e.$$.ptrType.registeredClass.name+" instance already deleted")}var be=!1;function _e(e){}function Pe(e){--e.count.value,0===e.count.value&&((e=e).smartPtr?e.smartPtrType.rawDestructor(e.smartPtr):e.ptrType.registeredClass.rawDestructor(e.ptr))}function $e(e){return"undefined"==typeof FinalizationGroup?($e=function(e){return e},e):(be=new FinalizationGroup(function(e){for(var r=e.next();!r.done;r=e.next()){var t=r.value;t.ptr?Pe(t):console.warn("object already deleted: "+t.ptr)}}),_e=function(e){be.unregister(e.$$)},($e=function(e){return be.register(e,e.$$,e.$$),e})(e))}var Ae=void 0,Fe=[];function Re(){for(;Fe.length;){var e=Fe.pop();e.$$.deleteScheduled=!1,e.delete()}}function Se(){}var Ee={};function Be(e,r,t){var n;void 0===e[r].overloadTable&&(n=e[r],e[r]=function(){return e[r].overloadTable.hasOwnProperty(arguments.length)||ve("Function '"+t+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+e[r].overloadTable+")!"),e[r].overloadTable[arguments.length].apply(this,arguments)},e[r].overloadTable=[],e[r].overloadTable[n.argCount]=n)}function We(e,r,t){a.hasOwnProperty(e)?((void 0===t||void 0!==a[e].overloadTable&&void 0!==a[e].overloadTable[t])&&ve("Cannot register public name '"+e+"' twice"),Be(a,e,e),a.hasOwnProperty(t)&&ve("Cannot register multiple overloads of a function with the same number of arguments ("+t+")!"),a[e].overloadTable[t]=r):(a[e]=r,void 0!==t&&(a[e].numArguments=t))}function Ie(e,r,t,n,i,o,a,u){this.name=e,this.constructor=r,this.instancePrototype=t,this.rawDestructor=n,this.baseClass=i,this.getActualType=o,this.upcast=a,this.downcast=u,this.pureVirtualFunctions=[]}function Oe(e,r,t){for(;r!==t;)r.upcast||ve("Expected null or instance of "+t.name+", got an instance of "+r.name),e=r.upcast(e),r=r.baseClass;return e}function ke(e,r){if(null===r)return this.isReference&&ve("null is not a valid "+this.name),0;r.$$||ve('Cannot pass "'+tr(r)+'" as a '+this.name),r.$$.ptr||ve("Cannot pass deleted object as a pointer of type "+this.name);var t=r.$$.ptrType.registeredClass;return Oe(r.$$.ptr,t,this.registeredClass)}function je(e,r){if(null===r)return this.isReference&&ve("null is not a valid "+this.name),this.isSmartPointer?(n=this.rawConstructor(),null!==e&&e.push(this.rawDestructor,n),n):0;r.$$||ve('Cannot pass "'+tr(r)+'" as a '+this.name),r.$$.ptr||ve("Cannot pass deleted object as a pointer of type "+this.name),!this.isConst&&r.$$.ptrType.isConst&&ve("Cannot convert argument of type "+(r.$$.smartPtrType||r.$$.ptrType).name+" to parameter type "+this.name);var t,n,i=r.$$.ptrType.registeredClass;if(n=Oe(r.$$.ptr,i,this.registeredClass),this.isSmartPointer)switch(void 0===r.$$.smartPtr&&ve("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:r.$$.smartPtrType===this?n=r.$$.smartPtr:ve("Cannot convert argument of type "+(r.$$.smartPtrType||r.$$.ptrType).name+" to parameter type "+this.name);break;case 1:n=r.$$.smartPtr;break;case 2:r.$$.smartPtrType===this?n=r.$$.smartPtr:(t=r.clone(),n=this.rawShare(n,rr(function(){t.delete()})),null!==e&&e.push(this.rawDestructor,n));break;default:ve("Unsupporting sharing policy")}return n}function xe(e,r){if(null===r)return this.isReference&&ve("null is not a valid "+this.name),0;r.$$||ve('Cannot pass "'+tr(r)+'" as a '+this.name),r.$$.ptr||ve("Cannot pass deleted object as a pointer of type "+this.name),r.$$.ptrType.isConst&&ve("Cannot convert argument of type "+r.$$.ptrType.name+" to parameter type "+this.name);var t=r.$$.ptrType.registeredClass;return Oe(r.$$.ptr,t,this.registeredClass)}function De(e){return this.fromWireType(j[e>>2])}var Ue={};function Ve(e,r){return r=function(e,r){for(void 0===r&&ve("ptr should not be undefined");e.baseClass;)r=e.upcast(r),e=e.baseClass;return r}(e,r),Ue[r]}function Ge(e,r){return r.ptrType&&r.ptr||ge("makeClassHandle requires ptr and ptrType"),!!r.smartPtrType!=!!r.smartPtr&&ge("Both smartPtrType and smartPtr must be specified"),r.count={value:1},$e(Object.create(e,{$$:{value:r}}))}function Me(e,r,t,n,i,o,a,u,s,c,l){this.name=e,this.registeredClass=r,this.isReference=t,this.isConst=n,this.isSmartPointer=i,this.pointeeType=o,this.sharingPolicy=a,this.rawGetPointee=u,this.rawConstructor=s,this.rawShare=c,this.rawDestructor=l,i||void 0!==r.baseClass?this.toWireType=je:(this.toWireType=n?ke:xe,this.destructorFunction=null)}function He(e,r,t){a.hasOwnProperty(e)||ge("Replacing nonexistant public symbol"),void 0!==a[e].overloadTable&&void 0!==t?a[e].overloadTable[t]=r:(a[e]=r,a[e].argCount=t)}function ze(i,o){i=ae(i);var e=function(e){for(var r=[],t=1;t<i.length;++t)r.push("a"+t);var n="return function "+("dynCall_"+i+"_"+o)+"("+r.join(", ")+") {\n";return n+="    return dynCall(rawFunction"+(r.length?", ":"")+r.join(", ")+");\n",n+="};\n",new Function("dynCall","rawFunction",n)(e,o)}(a["dynCall_"+i]);return"function"!=typeof e&&ve("unknown function pointer with signature "+i+": "+o),e}var qe=void 0;function Le(e){var r=vr(e),e=ae(r);return yr(r),e}function Ne(e,r){var t=[],n={};throw r.forEach(function e(r){n[r]||se[r]||(ce[r]?ce[r].forEach(e):(t.push(r),n[r]=!0))}),new qe(e+": "+t.map(Le).join([", "]))}function Xe(e,r){for(var t=[],n=0;n<e;n++)t.push(k[(r>>2)+n]);return t}function Je(e){for(;e.length;){var r=e.pop();e.pop()(r)}}function Ye(e,r){if(!(e instanceof Function))throw new TypeError("new_ called with constructor type "+typeof e+" which is not a function");var t=de(e.name||"unknownFunctionName",function(){});t.prototype=e.prototype;t=new t,r=e.apply(t,r);return r instanceof Object?r:t}function Ze(e,r,t,n,i){var o=r.length;o<2&&ve("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var a=null!==r[1]&&null!==t,u=!1,s=1;s<r.length;++s)if(null!==r[s]&&void 0===r[s].destructorFunction){u=!0;break}for(var t="void"!==r[0].name,c="",l="",s=0;s<o-2;++s)c+=(0!==s?", ":"")+"arg"+s,l+=(0!==s?", ":"")+"arg"+s+"Wired";var f="return function "+pe(e)+"("+c+") {\nif (arguments.length !== "+(o-2)+") {\nthrowBindingError('function "+e+" called with ' + arguments.length + ' arguments, expected "+(o-2)+" args!');\n}\n";u&&(f+="var destructors = [];\n");var p=u?"destructors":"null",d=["throwBindingError","invoker","fn","runDestructors","retType","classParam"],h=[ve,n,i,Je,r[0],r[1]];a&&(f+="var thisWired = classParam.toWireType("+p+", this);\n");for(s=0;s<o-2;++s)f+="var arg"+s+"Wired = argType"+s+".toWireType("+p+", arg"+s+"); // "+r[s+2].name+"\n",d.push("argType"+s),h.push(r[s+2]);if(f+=(t?"var rv = ":"")+"invoker(fn"+(0<(l=a?"thisWired"+(0<l.length?", ":"")+l:l).length?", ":"")+l+");\n",u)f+="runDestructors(destructors);\n";else for(s=a?1:2;s<r.length;++s){var y=1===s?"thisWired":"arg"+(s-2)+"Wired";null!==r[s].destructorFunction&&(f+=y+"_dtor("+y+"); // "+r[s].name+"\n",d.push(y+"_dtor"),h.push(r[s].destructorFunction))}return t&&(f+="var ret = retType.fromWireType(rv);\nreturn ret;\n"),d.push(f+="}\n"),Ye(Function,d).apply(null,h)}var Ke=[],Qe=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function er(e){4<e&&0==--Qe[e].refcount&&(Qe[e]=void 0,Ke.push(e))}function rr(e){switch(e){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:var r=Ke.length?Ke.pop():Qe.length;return Qe[r]={refcount:1,value:e},r}}function tr(e){if(null===e)return"null";var r=typeof e;return"object"==r||"array"==r||"function"==r?e.toString():""+e}function nr(e){return e||ve("Cannot use deleted val. handle = "+e),Qe[e].value}function ir(e,r){var t=se[e];return void 0===t&&ve(r+" has unknown type "+Le(e)),t}var or={};function ar(e){var r=or[e];return void 0===r?ae(e):r}var ur=[];function sr(){return"object"==typeof globalThis?globalThis:Function("return this")()}var cr={};var lr={mappings:{},buffers:[null,[],[]],printChar:function(e,r){var t=lr.buffers[e];0===r||10===r?((1===e?y:v)(C(t,0)),t.length=0):t.push(r)},varargs:void 0,get:function(){return lr.varargs+=4,k[lr.varargs-4>>2]},getStr:function(e){return w(e)},get64:function(e,r){return e}};!function(){for(var e=new Array(256),r=0;r<256;++r)e[r]=String.fromCharCode(r);oe=e}(),ye=a.BindingError=he(Error,"BindingError"),me=a.InternalError=he(Error,"InternalError"),Se.prototype.isAliasOf=function(e){if(!(this instanceof Se))return!1;if(!(e instanceof Se))return!1;for(var r=this.$$.ptrType.registeredClass,t=this.$$.ptr,n=e.$$.ptrType.registeredClass,i=e.$$.ptr;r.baseClass;)t=r.upcast(t),r=r.baseClass;for(;n.baseClass;)i=n.upcast(i),n=n.baseClass;return r===n&&t===i},Se.prototype.clone=function(){if(this.$$.ptr||we(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var e=$e(Object.create(Object.getPrototypeOf(this),{$$:{value:{count:(e=this.$$).count,deleteScheduled:e.deleteScheduled,preservePointerOnDelete:e.preservePointerOnDelete,ptr:e.ptr,ptrType:e.ptrType,smartPtr:e.smartPtr,smartPtrType:e.smartPtrType}}}));return e.$$.count.value+=1,e.$$.deleteScheduled=!1,e},Se.prototype.delete=function(){this.$$.ptr||we(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&ve("Object already scheduled for deletion"),_e(this),Pe(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)},Se.prototype.isDeleted=function(){return!this.$$.ptr},Se.prototype.deleteLater=function(){return this.$$.ptr||we(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&ve("Object already scheduled for deletion"),Fe.push(this),1===Fe.length&&Ae&&Ae(Re),this.$$.deleteScheduled=!0,this},Me.prototype.getPointee=function(e){return e=this.rawGetPointee?this.rawGetPointee(e):e},Me.prototype.destructor=function(e){this.rawDestructor&&this.rawDestructor(e)},Me.prototype.argPackAdvance=8,Me.prototype.readValueFromPointer=De,Me.prototype.deleteObject=function(e){null!==e&&e.delete()},Me.prototype.fromWireType=function(e){var r=this.getPointee(e);if(!r)return this.destructor(e),null;var t=Ve(this.registeredClass,r);if(void 0===t)return t=this.registeredClass.getActualType(r),(i=Ee[t])?(t=this.isConst?i.constPointerType:i.pointerType,null===(i=function e(r,t,n){if(t===n)return r;if(void 0===n.baseClass)return null;t=e(r,t,n.baseClass);return null===t?null:n.downcast(t)}(r,this.registeredClass,t.registeredClass))?n.call(this):this.isSmartPointer?Ge(t.registeredClass.instancePrototype,{ptrType:t,ptr:i,smartPtrType:this,smartPtr:e}):Ge(t.registeredClass.instancePrototype,{ptrType:t,ptr:i})):n.call(this);function n(){return this.isSmartPointer?Ge(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:r,smartPtrType:this,smartPtr:e}):Ge(this.registeredClass.instancePrototype,{ptrType:this,ptr:e})}if(0===t.$$.count.value)return t.$$.ptr=r,t.$$.smartPtr=e,t.clone();var i=t.clone();return this.destructor(e),i},a.getInheritedInstanceCount=function(){return Object.keys(Ue).length},a.getLiveInheritedInstances=function(){var e,r=[];for(e in Ue)Ue.hasOwnProperty(e)&&r.push(Ue[e]);return r},a.flushPendingDeletes=Re,a.setDelayFunction=function(e){Ae=e,Fe.length&&Ae&&Ae(Re)},qe=a.UnboundTypeError=he(Error,"UnboundTypeError"),a.count_emval_handles=function(){for(var e=0,r=5;r<Qe.length;++r)void 0!==Qe[r]&&++e;return e},a.get_first_emval=function(){for(var e=5;e<Qe.length;++e)if(void 0!==Qe[e])return Qe[e];return null};var fr={G:function(e){return hr(e)},D:function(e,r,t){throw ne[e]={ptr:e,adjusted:[e],type:r,destructor:t,refcount:0,caught:!1,rethrown:!1},e},A:function(e,t,n,i,o){var a=ie(n);Ce(e,{name:t=ae(t),fromWireType:function(e){return!!e},toWireType:function(e,r){return r?i:o},argPackAdvance:8,readValueFromPointer:function(e){var r;if(1===n)r=B;else if(2===n)r=I;else{if(4!==n)throw new TypeError("Unknown boolean type size: "+t);r=k}return this.fromWireType(r[e>>a])},destructorFunction:null})},t:function(a,e,r,u,t,s,n,c,i,l,f,o,p){f=ae(f),s=ze(t,s),c=c&&ze(n,c),l=l&&ze(i,l),p=ze(o,p);var d=pe(f);We(d,function(){Ne("Cannot construct "+f+" due to unbound types",[u])}),Te([a,e,r],u?[u]:[],function(e){e=e[0];var r=u?(o=e.registeredClass).instancePrototype:Se.prototype,t=de(d,function(){if(Object.getPrototypeOf(this)!==n)throw new ye("Use 'new' to construct "+f);if(void 0===i.constructor_body)throw new ye(f+" has no accessible constructor");var e=i.constructor_body[arguments.length];if(void 0===e)throw new ye("Tried to invoke ctor of "+f+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(i.constructor_body).toString()+") parameters instead!");return e.apply(this,arguments)}),n=Object.create(r,{constructor:{value:t}});t.prototype=n;var i=new Ie(f,t,n,p,o,s,c,l),e=new Me(f,i,!0,!1,!1),r=new Me(f+"*",i,!1,!1,!1),o=new Me(f+" const*",i,!1,!0,!1);return Ee[a]={pointerType:r,constPointerType:o},He(d,t),[e,r,o]})},s:function(e,i,r,t,o,n){g(0<i);var a=Xe(i,r);o=ze(t,o);var u=[n],s=[];Te([],[e],function(e){var n="constructor "+(e=e[0]).name;if(void 0===e.registeredClass.constructor_body&&(e.registeredClass.constructor_body=[]),void 0!==e.registeredClass.constructor_body[i-1])throw new ye("Cannot register multiple constructors with identical number of parameters ("+(i-1)+") for class '"+e.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");return e.registeredClass.constructor_body[i-1]=function(){Ne("Cannot construct "+e.name+" due to unbound types",a)},Te([],a,function(t){return e.registeredClass.constructor_body[i-1]=function(){arguments.length!==i-1&&ve(n+" called with "+arguments.length+" arguments, expected "+(i-1)),s.length=0,u.length=i;for(var e=1;e<i;++e)u[e]=t[e].toWireType(s,arguments[e-1]);var r=o.apply(null,u);return Je(s),t[0].fromWireType(r)},[]}),[]})},c:function(e,o,a,r,t,u,s,c){var l=Xe(a,r);o=ae(o),u=ze(t,u),Te([],[e],function(r){var t=(r=r[0]).name+"."+o;function e(){Ne("Cannot call "+t+" due to unbound types",l)}c&&r.registeredClass.pureVirtualFunctions.push(o);var n=r.registeredClass.instancePrototype,i=n[o];return void 0===i||void 0===i.overloadTable&&i.className!==r.name&&i.argCount===a-2?(e.argCount=a-2,e.className=r.name,n[o]=e):(Be(n,o,t),n[o].overloadTable[a-2]=e),Te([],l,function(e){e=Ze(t,e,r,u,s);return void 0===n[o].overloadTable?(e.argCount=a-2,n[o]=e):n[o].overloadTable[a-2]=e,[]}),[]})},z:function(e,r){Ce(e,{name:r=ae(r),fromWireType:function(e){var r=Qe[e].value;return er(e),r},toWireType:function(e,r){return rr(r)},argPackAdvance:8,readValueFromPointer:De,destructorFunction:null})},j:function(e,r,t){t=ie(t),Ce(e,{name:r=ae(r),fromWireType:function(e){return e},toWireType:function(e,r){if("number"!=typeof r&&"boolean"!=typeof r)throw new TypeError('Cannot convert "'+tr(r)+'" to '+this.name);return r},argPackAdvance:8,readValueFromPointer:function(e,r){switch(r){case 2:return function(e){return this.fromWireType(x[e>>2])};case 3:return function(e){return this.fromWireType(D[e>>3])};default:throw new TypeError("Unknown float type: "+e)}}(r,t),destructorFunction:null})},x:function(r,t,e,n,i,o){var a=Xe(t,e);r=ae(r),i=ze(n,i),We(r,function(){Ne("Cannot call "+r+" due to unbound types",a)},t-1),Te([],a,function(e){e=[e[0],null].concat(e.slice(1));return He(r,Ze(r,e,null,i,o),t-1),[]})},d:function(e,t,r,n,i){t=ae(t),-1===i&&(i=4294967295);var o,a=ie(r),u=function(e){return e};0===n&&(o=32-8*r,u=function(e){return e<<o>>>o});var s=-1!=t.indexOf("unsigned");Ce(e,{name:t,fromWireType:u,toWireType:function(e,r){if("number"!=typeof r&&"boolean"!=typeof r)throw new TypeError('Cannot convert "'+tr(r)+'" to '+this.name);if(r<n||i<r)throw new TypeError('Passing a number "'+tr(r)+'" from JS side to C/C++ side to an argument of type "'+t+'", which is outside the valid range ['+n+", "+i+"]!");return s?r>>>0:0|r},argPackAdvance:8,readValueFromPointer:function(e,r,t){switch(r){case 0:return t?function(e){return B[e]}:function(e){return W[e]};case 1:return t?function(e){return I[e>>1]}:function(e){return O[e>>1]};case 2:return t?function(e){return k[e>>2]}:function(e){return j[e>>2]};default:throw new TypeError("Unknown integer type: "+e)}}(t,a,0!==n),destructorFunction:null})},b:function(e,r,t){var n=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][r];function i(e){var r=j,t=r[e>>=2],e=r[e+1];return new n(E,e,t)}Ce(e,{name:t=ae(t),fromWireType:i,argPackAdvance:8,readValueFromPointer:i},{ignoreDuplicateRegistrations:!0})},k:function(e,r){var l="std::string"===(r=ae(r));Ce(e,{name:r,fromWireType:function(e){var r,t=j[e>>2];if(l){var n=W[e+4+t],i=0;0!=n&&(i=n,W[e+4+t]=0);for(var o=e+4,a=0;a<=t;++a){var u,s=e+4+a;0==W[s]&&(u=w(o),void 0===r?r=u:(r+=String.fromCharCode(0),r+=u),o=s+1)}0!=i&&(W[e+4+t]=i)}else{for(var c=new Array(t),a=0;a<t;++a)c[a]=String.fromCharCode(W[e+4+a]);r=c.join("")}return yr(e),r},toWireType:function(e,r){var t="string"==typeof(r=r instanceof ArrayBuffer?new Uint8Array(r):r);t||r instanceof Uint8Array||r instanceof Uint8ClampedArray||r instanceof Int8Array||ve("Cannot pass non-string to std::string");var n=(l&&t?function(){return function(e){for(var r=0,t=0;t<e.length;++t){var n=e.charCodeAt(t);(n=55296<=n&&n<=57343?65536+((1023&n)<<10)|1023&e.charCodeAt(++t):n)<=127?++r:r+=n<=2047?2:n<=65535?3:4}return r}(r)}:function(){return r.length})(),i=hr(4+n+1);if(j[i>>2]=n,l&&t)b(r,i+4,n+1);else if(t)for(var o=0;o<n;++o){var a=r.charCodeAt(o);255<a&&(yr(i),ve("String has UTF-16 code units that do not fit in 8 bits")),W[i+4+o]=a}else for(o=0;o<n;++o)W[i+4+o]=r[o];return null!==e&&e.push(yr,i),i},argPackAdvance:8,readValueFromPointer:De,destructorFunction:function(e){yr(e)}})},i:function(e,l,i){var f,o,p,a,d;i=ae(i),2===l?(f=P,o=$,a=A,p=function(){return O},d=1):4===l&&(f=F,o=R,a=S,p=function(){return j},d=2),Ce(e,{name:i,fromWireType:function(e){var r,t=j[e>>2],n=p(),i=n[e+4+t*l>>d],o=0;0!=i&&(o=i,n[e+4+t*l>>d]=0);for(var a=e+4,u=0;u<=t;++u){var s,c=e+4+u*l;0==n[c>>d]&&(s=f(a),void 0===r?r=s:(r+=String.fromCharCode(0),r+=s),a=c+l)}return 0!=o&&(n[e+4+t*l>>d]=o),yr(e),r},toWireType:function(e,r){"string"!=typeof r&&ve("Cannot pass non-string to C++ string type "+i);var t=a(r),n=hr(4+t+l);return j[n>>2]=t>>d,o(r,n+4,t+l),null!==e&&e.push(yr,n),n},argPackAdvance:8,readValueFromPointer:De,destructorFunction:function(e){yr(e)}})},B:function(e,r){Ce(e,{isVoid:!0,name:r=ae(r),argPackAdvance:0,fromWireType:function(){},toWireType:function(e,r){}})},r:function(e,r,t){e=nr(e),r=ir(r,"emval::as");var n=[],i=rr(n);return k[t>>2]=i,r.toWireType(n,e)},m:function(e,r,t,n){(e=ur[e])(r=nr(r),t=ar(t),null,n)},a:er,F:function(e){return 0===e?rr(sr()):(e=ar(e),rr(sr()[e]))},n:function(e,r){for(var t=function(e,r){for(var t=new Array(e),n=0;n<e;++n)t[n]=ir(k[(r>>2)+n],"parameter "+n);return t}(e,r),n=t[0],r=n.name+"_$"+t.slice(1).map(function(e){return e.name}).join("_")+"$",i=["retType"],o=[n],a="",u=0;u<e-1;++u)a+=(0!==u?", ":"")+"arg"+u,i.push("argType"+u),o.push(t[1+u]);for(var s="return function "+pe("methodCaller_"+r)+"(handle, name, destructors, args) {\n",c=0,u=0;u<e-1;++u)s+="    var arg"+u+" = argType"+u+".readValueFromPointer(args"+(c?"+"+c:"")+");\n",c+=t[u+1].argPackAdvance;for(s+="    var rv = handle[name]("+a+");\n",u=0;u<e-1;++u)t[u+1].deleteObject&&(s+="    argType"+u+".deleteObject(arg"+u+");\n");return n.isVoid||(s+="    return retType.toWireType(destructors, rv);\n"),i.push(s+="};\n"),r=Ye(Function,i).apply(null,o),n=ur.length,ur.push(r),n},p:function(e){return e=ar(e),rr(a[e])},f:function(e,r){return rr((e=nr(e))[r=nr(r)])},h:function(e){4<e&&(Qe[e].refcount+=1)},o:function(e,r,t,n){e=nr(e);var i=cr[r];return i||(i=function(e){for(var r="",t=0;t<e;++t)r+=(0!==t?", ":"")+"arg"+t;for(var n="return function emval_allocator_"+e+"(constructor, argTypes, args) {\n",t=0;t<e;++t)n+="var argType"+t+" = requireRegisteredType(Module['HEAP32'][(argTypes >> 2) + "+t+'], "parameter '+t+'");\nvar arg'+t+" = argType"+t+".readValueFromPointer(args);\nargs += argType"+t+"['argPackAdvance'];\n";return n+="var obj = new constructor("+r+");\nreturn __emval_register(obj);\n}\n",new Function("requireRegisteredType","Module","__emval_register",n)(ir,a,rr)}(r),cr[r]=i),i(e,t,n)},g:function(e){return rr(ar(e))},q:function(e){Je(Qe[e].value),er(e)},E:function(){Z()},w:function(e,r,t){W.copyWithin(e,r,r+t)},y:function(e){var r=W.length,t=2147418112;if(t<e)return!1;for(var n,i=1;i<=4;i*=2){var o=r*(1+.2/i),o=Math.min(o,e+100663296);if(function(e){try{return h.grow(e-E.byteLength+65535>>16),U(h.buffer),1}catch(e){}}(Math.min(t,(0<(n=Math.max(16777216,e,o))%(o=65536)&&(n+=o-n%o),n))))return!0}return!1},C:function(e){return 0},u:function(e,r,t,n,i){},l:function(e,r,t,n){for(var i=0,o=0;o<t;o++){for(var a=k[r+8*o>>2],u=k[r+(8*o+4)>>2],s=0;s<u;s++)lr.printChar(e,W[a+s]);i+=u}return k[n>>2]=i,0},memory:h,e:function(e){return 0<=(e=+e)?+X(e+.5):+N(e-.5)},v:function(e){},table:f},f=function(){var r={a:fr};function t(e,r){e=e.exports;a.asm=e,J--,a.monitorRunDependencies&&a.monitorRunDependencies(J),0==J&&Y&&(e=Y,Y=null,e())}function n(e){t(e.instance)}function i(e){return(d||!s&&!c||"function"!=typeof fetch?new Promise(function(e,r){e(te())}):fetch(re,{credentials:"same-origin"}).then(function(e){if(!e.ok)throw"failed to load wasm binary file at '"+re+"'";return e.arrayBuffer()}).catch(te)).then(function(e){return WebAssembly.instantiate(e,r)}).then(e,function(e){v("failed to asynchronously prepare wasm: "+e),Z(e)})}if(J++,a.monitorRunDependencies&&a.monitorRunDependencies(J),a.instantiateWasm)try{return a.instantiateWasm(r,t)}catch(e){return v("Module.instantiateWasm callback failed with error: "+e),!1}return function(){if(d||"function"!=typeof WebAssembly.instantiateStreaming||Q(re)||"function"!=typeof fetch)return i(n);fetch(re,{credentials:"same-origin"}).then(function(e){return WebAssembly.instantiateStreaming(e,r).then(n,function(e){v("wasm streaming compile failed: "+e),v("falling back to ArrayBuffer instantiation"),i(n)})})}(),{}}();a.asm=f;var pr,dr=a.___wasm_call_ctors=function(){return(dr=a.___wasm_call_ctors=a.asm.H).apply(null,arguments)},hr=a._malloc=function(){return(hr=a._malloc=a.asm.I).apply(null,arguments)},yr=a._free=function(){return(yr=a._free=a.asm.J).apply(null,arguments)},vr=a.___getTypeName=function(){return(vr=a.___getTypeName=a.asm.K).apply(null,arguments)};function mr(e){function r(){pr||(pr=!0,a.calledRun=!0,m||(V(M),V(H),a.onRuntimeInitialized&&a.onRuntimeInitialized(),L()))}0<J||(q(),0<J||(a.setStatus?(a.setStatus("Running..."),setTimeout(function(){setTimeout(function(){a.setStatus("")},1),r()},1)):r()))}if(a.___embind_register_native_and_builtin_types=function(){return(a.___embind_register_native_and_builtin_types=a.asm.L).apply(null,arguments)},a.dynCall_viii=function(){return(a.dynCall_viii=a.asm.M).apply(null,arguments)},a.dynCall_ii=function(){return(a.dynCall_ii=a.asm.N).apply(null,arguments)},a.dynCall_vi=function(){return(a.dynCall_vi=a.asm.O).apply(null,arguments)},a.dynCall_v=function(){return(a.dynCall_v=a.asm.P).apply(null,arguments)},a.dynCall_iii=function(){return(a.dynCall_iii=a.asm.Q).apply(null,arguments)},a.dynCall_vii=function(){return(a.dynCall_vii=a.asm.R).apply(null,arguments)},a.dynCall_iiii=function(){return(a.dynCall_iiii=a.asm.S).apply(null,arguments)},a.dynCall_iiiii=function(){return(a.dynCall_iiiii=a.asm.T).apply(null,arguments)},a.dynCall_iiiiii=function(){return(a.dynCall_iiiiii=a.asm.U).apply(null,arguments)},a.dynCall_iiiiiiii=function(){return(a.dynCall_iiiiiiii=a.asm.V).apply(null,arguments)},a.dynCall_iiiiiiiii=function(){return(a.dynCall_iiiiiiiii=a.asm.W).apply(null,arguments)},a.dynCall_iidiiii=function(){return(a.dynCall_iidiiii=a.asm.X).apply(null,arguments)},a.dynCall_jiji=function(){return(a.dynCall_jiji=a.asm.Y).apply(null,arguments)},a.dynCall_viiiiii=function(){return(a.dynCall_viiiiii=a.asm.Z).apply(null,arguments)},a.dynCall_viiiii=function(){return(a.dynCall_viiiii=a.asm._).apply(null,arguments)},a.dynCall_viiii=function(){return(a.dynCall_viiii=a.asm.$).apply(null,arguments)},a.asm=f,a.then=function(e){var r;return pr?e(a):(r=a.onRuntimeInitialized,a.onRuntimeInitialized=function(){r&&r(),e(a)}),a},Y=function e(){pr||mr(),pr||(Y=e)},a.run=mr,a.preInit)for("function"==typeof a.preInit&&(a.preInit=[a.preInit]);0<a.preInit.length;)a.preInit.pop()();return mr(),e}),w=37808,b=36196,_=35840,P=35842,$={cTFETC1:0,cTFETC2:1,cTFBC1:2,cTFBC3:3,cTFBC4:4,cTFBC5:5,cTFBC7:6,cTFPVRTC1_4_RGB:8,cTFPVRTC1_4_RGBA:9,cTFASTC_4x4:10,cTFATC_RGB:11,cTFATC_RGBA_INTERPOLATED_ALPHA:12,cTFRGBA32:13,cTFRGB565:14,cTFBGR565:15,cTFRGBA4444:16},i={};for(t in $)i[$[t]]=t;var A,o,F={};return F[$.cTFBC1]=33776,F[$.cTFBC3]=33779,F[$.cTFBC7]=36492,e(function(e,r){return(o=o||function(){var t;console.log("BASIS init...");var e=fetch(CESIUM_BASE_URL+"ThirdParty/basis_old/basis_transcoder.wasm").then(function(e){return e.arrayBuffer()}).then(function(r){return new Promise(function(e){n(t={wasmBinary:r,onRuntimeInitialized:e})})}).then(function(){A=t.BasisFile,(0,t.initializeBasis)()}).catch(function(e){console.error("transcodeBASIS failed! "+e)});return console.log("BASIS initialized!"),e}()).then(function(){return function(e,r){var t=e.data,n=e.textureFormat;if(A){performance.now();var i=new A(t),o=i.getImageWidth(0,0),e=i.getImageHeight(0,0),t=i.getNumImages(),a=i.getNumLevels(0),u=i.getHasAlpha();if(!(o&&e&&t&&a))return console.warn("Invalid .basis file"),i.close(),void i.delete();var s,t="etc1"===n;if("s3tc"===n?s=u?$.cTFBC3:$.cTFBC1:"pvrtc"===n?(s=u?$.cTFPVRTC1_4_RGBA:$.cTFPVRTC1_4_RGB,0==(o&o-1)&&0==(e&e-1)||console.log("ERROR: PVRTC1 requires square power of 2 textures"),o!==e&&console.log("ERROR: PVRTC1 requires square power of 2 textures")):s=t?$.cTFETC1:$.cTFRGB565,!i.startTranscoding())return console.log("startTranscoding failed"),console.warn("startTranscoding failed"),i.close(),void i.delete();for(var c,l=[],f=0;f<a;f++){var p=i.getImageWidth(0,f),d=i.getImageHeight(0,f),h=new Uint8Array(i.getImageTranscodedSizeInBytes(0,f,s));if(!i.transcodeImage(h,0,f,s,0,u))throw console.log("basisFile.transcodeImage failed"),console.warn("transcodeImage failed"),i.close(),i.delete(),new Error("THREE.BasisTextureLoader: .transcodeImage failed.");l.push({data:h,width:p,height:d})}i.close(),i.delete(),s===$.cTFASTC_4x4?c=w:s===$.cTFBC3||s===$.cTFBC1||s===$.cTFBC7?c=F[s]:s===$.cTFETC1?c=b:s===$.cTFPVRTC1_4_RGB?c=_:s===$.cTFPVRTC1_4_RGBA?c=P:console.error("format error: "+s);var y=o+3&-4,v=e+3&-4,e=new C.CompressedTextureBuffer(c,void 0,y,v,l[0].data);r.push(l[0].data.buffer);var m=[],g=l.length;if(1<g){m.push({positiveX:e});for(var T=1;T<g;++T)m.push({positiveX:new C.CompressedTextureBuffer(c,void 0,y,v,l[T].data)}),r.push(l[T].data.buffer);return m}return e}console.warn("BASIS还未准备好！")}(e,r)}).catch(function(e){console.error("transcodeBASIS error: "+e)})})});
