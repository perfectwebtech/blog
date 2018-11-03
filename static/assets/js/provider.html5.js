/*!
JW Player version 8.6.2
Copyright (c) 2018, JW Player, All Rights Reserved 
https://github.com/jwplayer/jwplayer/blob/v8.6.2/README.md

This source code and its use and distribution is subject to the terms and conditions of the applicable license agreement. 
https://www.jwplayer.com/tos/

This product includes portions of other software. For the full text of licenses, see below:

JW Player Third Party Software Notices and/or Additional Terms and Conditions

**************************************************************************************************
The following software is used under Apache License 2.0
**************************************************************************************************

vtt.js v0.13.0
Copyright (c) 2018 Mozilla (http://mozilla.org)
https://github.com/mozilla/vtt.js/blob/v0.13.0/LICENSE

* * *

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
limitations under the License.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**************************************************************************************************
The following software is used under MIT license
**************************************************************************************************

Underscore.js v1.6.0
Copyright (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative
https://github.com/jashkenas/underscore/blob/1.6.0/LICENSE

Backbone backbone.events.js v1.1.2
Copyright (c) 2010-2014 Jeremy Ashkenas, DocumentCloud
https://github.com/jashkenas/backbone/blob/1.1.2/LICENSE

Promise Polyfill v7.1.1
Copyright (c) 2014 Taylor Hakes and Forbes Lindesay
https://github.com/taylorhakes/promise-polyfill/blob/v7.1.1/LICENSE

can-autoplay.js v3.0.0
Copyright (c) 2017 video-dev
https://github.com/video-dev/can-autoplay/blob/v3.0.0/LICENSE

* * *

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**************************************************************************************************
The following software is used under W3C license
**************************************************************************************************

Intersection Observer v0.5.0
Copyright (c) 2016 Google Inc. (http://google.com)
https://github.com/w3c/IntersectionObserver/blob/v0.5.0/LICENSE.md

* * *

W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE
Status: This license takes effect 13 May, 2015.

This work is being provided by the copyright holders under the following license.

License
By obtaining and/or copying this work, you (the licensee) agree that you have read, understood, and will comply with the following terms and conditions.

Permission to copy, modify, and distribute this work, with or without modification, for any purpose and without fee or royalty is hereby granted, provided that you include the following on ALL copies of the work or portions thereof, including modifications:

The full text of this NOTICE in a location viewable to users of the redistributed or derivative work.

Any pre-existing intellectual property disclaimers, notices, or terms and conditions. If none exist, the W3C Software and Document Short Notice should be included.

Notice of any changes or modifications, through a copyright statement on the new code or document such as "This software or document includes material copied from or derived from [title and URI of the W3C document]. Copyright © [YEAR] W3C® (MIT, ERCIM, Keio, Beihang)."

Disclaimers
THIS WORK IS PROVIDED "AS IS," AND COPYRIGHT HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE OR DOCUMENT WILL NOT INFRINGE ANY THIRD PARTY PATENTS, COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.

COPYRIGHT HOLDERS WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENT.

The name and trademarks of copyright holders may NOT be used in advertising or publicity pertaining to the work without specific, written prior permission. Title to copyright in this work will at all times remain with copyright holders.
*/
(window.webpackJsonpjwplayer=window.webpackJsonpjwplayer||[]).push([[7],{29:function(e,t,i){"use strict";i.r(t);var n=i(0);var r=i(8),a=i(48),s=i(3),c=i(39),u={canplay:function(){this.trigger(s.E)},play:function(){this.stallTime=-1,this.video.paused||this.state===s.Oa||this.setState(s.Ma)},loadedmetadata:function(){var e={duration:this.getDuration(),height:this.video.videoHeight,width:this.video.videoWidth,seekRange:this.getSeekRange()},t=this.drmUsed;t&&(e.drm=t),this.trigger(s.K,e)},timeupdate:function(){var e=this.video.currentTime,t=this.getCurrentTime(),i=this.getDuration();if(!isNaN(i)){this.seeking||this.video.paused||this.state!==s.Pa&&this.state!==s.Ma||this.stallTime===e||(this.stallTime=-1,this.setState(s.Oa));var n={position:t,duration:i,currentTime:e,seekRange:this.getSeekRange(),metadata:{currentTime:e}};if(this.getPtsOffset){var r=this.getPtsOffset();r>=0&&(n.metadata.mpegts=r+t)}(this.state===s.Oa||this.seeking)&&this.trigger(s.R,n)}},click:function(e){this.trigger(s.n,e)},volumechange:function(){var e=this.video;this.trigger(s.U,{volume:Math.round(100*e.volume)}),this.trigger(s.L,{mute:e.muted})},seeked:function(){this.seeking&&(this.seeking=!1,this.trigger(s.Q))},playing:function(){-1===this.stallTime&&this.setState(s.Oa),this.trigger(s.Ea)},pause:function(){this.state!==s.Ja&&(this.video.ended||this.video.error||this.video.currentTime!==this.video.duration&&this.setState(s.Na))},progress:function(){var e=this.getDuration();if(!(e<=0||e===1/0)){var t=this.video.buffered;if(t&&0!==t.length){var i=Object(c.a)(t.end(t.length-1)/e,0,1);this.trigger(s.D,{bufferPercent:100*i,position:this.getCurrentTime(),duration:e,currentTime:this.video.currentTime,seekRange:this.getSeekRange()})}}},ratechange:function(){this.trigger(s.O,{playbackRate:this.video.playbackRate})},ended:function(){this.videoHeight=0,this.streamBitrate=0,this.state!==s.La&&this.state!==s.Ja&&this.trigger(s.F)},loadeddata:function(){this.renderNatively&&this.setTextTracks(this.video.textTracks)}},o=i(18);function d(e){return e&&e.length?e.end(e.length-1):0}var l={container:null,volume:function(e){this.video.volume=Math.min(Math.max(0,e/100),1)},mute:function(e){this.video.muted=!!e,this.video.muted||this.video.removeAttribute("muted")},resize:function(e,t,i){var n=this.video,a=n.videoWidth,s=n.videoHeight;if(e&&t&&a&&s){var c={objectFit:"",width:"",height:""};if("uniform"===i){var u=e/t,d=a/s,l=Math.abs(u-d);l<.09&&l>.0025&&(c.objectFit="fill",i="exactfit")}if(r.Browser.ie||r.OS.iOS&&r.OS.version.major<9||r.Browser.androidNative)if("uniform"!==i){c.objectFit="contain";var h=e/t,f=a/s,v=1,T=1;"none"===i?v=T=h>f?Math.ceil(100*s/t)/100:Math.ceil(100*a/e)/100:"fill"===i?v=T=h>f?h/f:f/h:"exactfit"===i&&(h>f?(v=h/f,T=1):(v=1,T=f/h)),Object(o.e)(n,"matrix("+v.toFixed(2)+", 0, 0, "+T.toFixed(2)+", 0, 0)")}else c.top=c.left=c.margin="",Object(o.e)(n,"");Object(o.d)(n,c)}},getContainer:function(){return this.container},setContainer:function(e){this.container=e,this.video.parentNode!==e&&e.appendChild(this.video)},remove:function(){this.stop(),this.destroy();var e=this.container;e&&e===this.video.parentNode&&e.removeChild(this.video)},atEdgeOfLiveStream:function(){if(!this.isLive())return!1;return d(this.video.buffered)-this.video.currentTime<=2}},h={attachMedia:function(){this.eventsOn_()},detachMedia:function(){return this.eventsOff_(),this.video}},f=i(59),v=i(7),T=i(47),g=i(5),k=i(56),b=i(58),m={TIT2:"title",TT2:"title",WXXX:"url",TPE1:"artist",TP1:"artist",TALB:"album",TAL:"album"};function y(e,t){for(var i=e.length,n=void 0,r=void 0,a=void 0,s="",c=t||0;c<i;)if(0!==(n=e[c++])&&3!==n)switch(n>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:s+=String.fromCharCode(n);break;case 12:case 13:r=e[c++],s+=String.fromCharCode((31&n)<<6|63&r);break;case 14:r=e[c++],a=e[c++],s+=String.fromCharCode((15&n)<<12|(63&r)<<6|(63&a)<<0)}return s}function p(e){var t=function(e){for(var t="0x",i=0;i<e.length;i++)e[i]<16&&(t+="0"),t+=e[i].toString(16);return parseInt(t)}(e);return 127&t|(32512&t)>>1|(8323072&t)>>2|(2130706432&t)>>3}function x(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).reduce(function(e,t){if(!("value"in t)&&"data"in t&&t.data instanceof ArrayBuffer){var i=new Uint8Array(t.data),n=i.length;t={value:{key:"",data:""}};for(var r=10;r<14&&r<i.length&&0!==i[r];)t.value.key+=String.fromCharCode(i[r]),r++;var a=19,s=i[a];3!==s&&0!==s||(s=i[++a],n--);var c=0;if(1!==s&&2!==s)for(var u=a+1;u<n;u++)if(0===i[u]){c=u-a;break}if(c>0){var o=y(i.subarray(a,a+=c),0);if("PRIV"===t.value.key){if("com.apple.streaming.transportStreamTimestamp"===o){var d=1&p(i.subarray(a,a+=4)),l=p(i.subarray(a,a+=4))+(d?4294967296:0);t.value.data=l}else t.value.data=y(i,a+1);t.value.info=o}else t.value.info=o,t.value.data=y(i,a+1)}else{var h=i[a];t.value.data=1===h||2===h?function(e,t){for(var i=e.length-1,n="",r=t||0;r<i;)254===e[r]&&255===e[r+1]||(n+=String.fromCharCode((e[r]<<8)+e[r+1])),r+=2;return n}(i,a+1):y(i,a+1)}}if(m.hasOwnProperty(t.value.key)&&(e[m[t.value.key]]=t.value.data),t.value.info){var f=e[t.value.key];f!==Object(f)&&(f={},e[t.value.key]=f),f[t.value.info]=t.value.data}else e[t.value.key]=t.value.data;return e},{})}function _(e,t,i){e&&(e.removeEventListener?e.removeEventListener(t,i):e["on"+t]=null)}function w(e){var t=this;e&&(this._textTracks||this._initTextTracks(),e.forEach(function(e){if(!e.kind||B(e.kind)){var i=j.call(t,e);E.call(t,i),e.file&&(e.data=[],Object(k.c)(e,function(e){t.addVTTCuesToTrack(i,e)},function(e){t.trigger(s.Sa,e)}))}}),this._textTracks&&this._textTracks.length&&this.trigger("subtitlesTracks",{tracks:this._textTracks}))}function O(e,t,i){if(r.Browser.ie&&e&&window.TextTrackCue){var n=new window.TextTrackCue(i.startTime,i.endTime,i.text);t.addCue(n)}else t.addCue(i)}function C(e,t){t&&t.length&&Object(n.g)(t,function(t){if(!(r.Browser.ie&&e&&/^(native|subtitle|cc)/.test(t._id))){t.mode="disabled",t.mode="hidden";for(var i=t.cues.length;i--;)t.removeCue(t.cues[i]);t.embedded||(t.mode="disabled"),t.inuse=!1}})}function B(e){return"subtitles"===e||"captions"===e}function j(e){var t=void 0,i=Object(b.b)(e,this._unknownCount),r=i.label;if(this._unknownCount=i.unknownCount,this.renderNatively||"metadata"===e.kind){var a=this.video.textTracks;(t=Object(n.k)(a,{label:r}))||(t=this.video.addTextTrack(e.kind,r,e.language||"")),t.default=e.default,t.mode="disabled",t.inuse=!0}else(t=e).data=t.data||[];return t._id||(t._id=Object(b.a)(e,this._textTracks.length)),t}function E(e){this._textTracks.push(e),this._tracksById[e._id]=e}function L(e){var t=e.currentTarget.activeCues;if(t&&t.length){var i=t[t.length-1].startTime;if(this._activeCuePosition!==i){var r=[];if(Object(n.g)(t,function(e){e.startTime<i||(e.data||e.value?r.push(e):e.text&&this.trigger("meta",{metadataTime:i,metadata:JSON.parse(e.text)}))},this),r.length){var a=x(r);this.trigger("meta",{metadataTime:i,metadata:a})}this._activeCuePosition=i}}}var S={_itemTracks:null,_textTracks:null,_tracksById:null,_cuesByTrackId:null,_cachedVTTCues:null,_metaCuesByTextTime:null,_currentTextTrackIndex:-1,_unknownCount:0,_activeCuePosition:null,_initTextTracks:function(){this._textTracks=[],this._tracksById={},this._metaCuesByTextTime={},this._cuesByTrackId={},this._cachedVTTCues={},this._unknownCount=0},addTracksListener:function(e,t,i){if(!e)return;if(_(e,t,i),this.instreamMode)return;e.addEventListener?e.addEventListener(t,i):e["on"+t]=i},clearTracks:function(){Object(k.a)(this._itemTracks);var e=this._tracksById&&this._tracksById.nativemetadata;(this.renderNatively||e)&&(C(this.renderNatively,this.video.textTracks),e&&(e.oncuechange=null));this._itemTracks=null,this._textTracks=null,this._tracksById=null,this._cuesByTrackId=null,this._metaCuesByTextTime=null,this._unknownCount=0,this._currentTextTrackIndex=-1,this._activeCuePosition=null,this.renderNatively&&(this.removeTracksListener(this.video.textTracks,"change",this.textTrackChangeHandler),C(this.renderNatively,this.video.textTracks))},clearCueData:function(e){var t=this._cachedVTTCues;t&&t[e]&&(t[e]={},this._tracksById&&(this._tracksById[e].data=[]))},disableTextTrack:function(){if(this._textTracks){var e=this._textTracks[this._currentTextTrackIndex];if(e){e.mode="disabled";var t=e._id;t&&0===t.indexOf("nativecaptions")&&(e.mode="hidden")}}},enableTextTrack:function(){if(this._textTracks){var e=this._textTracks[this._currentTextTrackIndex];e&&(e.mode="showing")}},getSubtitlesTrack:function(){return this._currentTextTrackIndex},removeTracksListener:_,addTextTracks:w,setTextTracks:function(e){if(this._currentTextTrackIndex=-1,!e)return;this._textTracks?(this._unknownCount=0,this._textTracks=this._textTracks.filter(function(e){var t=e._id;return this.renderNatively&&t&&0===t.indexOf("nativecaptions")?(delete this._tracksById[t],!1):(e.name&&0===e.name.indexOf("Unknown")&&this._unknownCount++,!0)},this),delete this._tracksById.nativemetadata):this._initTextTracks();if(e.length)for(var t=0,i=e.length;t<i;t++){var a=e[t];if(!a._id){if("captions"===a.kind||"metadata"===a.kind){if(a._id="native"+a.kind+t,!a.label&&"captions"===a.kind){var s=Object(b.b)(a,this._unknownCount);a.name=s.label,this._unknownCount=s.unknownCount}}else a._id=Object(b.a)(a,this._textTracks.length);if(this._tracksById[a._id])continue;a.inuse=!0}if(a.inuse&&!this._tracksById[a._id])if("metadata"===a.kind)a.mode="hidden",a.oncuechange=L.bind(this),this._tracksById[a._id]=a;else if(B(a.kind)){var c=a.mode,u=void 0;if(a.mode="hidden",!a.cues.length&&a.embedded)continue;if(a.mode=c,this._cuesByTrackId[a._id]&&!this._cuesByTrackId[a._id].loaded){for(var o=this._cuesByTrackId[a._id].cues;u=o.shift();)O(this.renderNatively,a,u);a.mode=c,this._cuesByTrackId[a._id].loaded=!0}E.call(this,a)}}this.renderNatively&&(this.textTrackChangeHandler=this.textTrackChangeHandler||function(){var e=this.video.textTracks,t=Object(n.i)(e,function(e){return(e.inuse||!e._id)&&B(e.kind)});if(!this._textTracks||function(e){if(e.length>this._textTracks.length)return!0;for(var t=0;t<e.length;t++){var i=e[t];if(!i._id||!this._tracksById[i._id])return!0}return!1}.call(this,t))return void this.setTextTracks(e);for(var i=-1,r=0;r<this._textTracks.length;r++)if("showing"===this._textTracks[r].mode){i=r;break}i!==this._currentTextTrackIndex&&this.setSubtitlesTrack(i+1)}.bind(this),this.addTracksListener(this.video.textTracks,"change",this.textTrackChangeHandler),(r.Browser.edge||r.Browser.firefox||r.Browser.safari)&&(this.addTrackHandler=this.addTrackHandler||function(){this.setTextTracks(this.video.textTracks)}.bind(this),this.addTracksListener(this.video.textTracks,"addtrack",this.addTrackHandler)));this._textTracks.length&&this.trigger("subtitlesTracks",{tracks:this._textTracks})},setupSideloadedTracks:function(e){if(!this.renderNatively)return;var t=e===this._itemTracks;t||Object(k.a)(this._itemTracks);if(this._itemTracks=e,!e)return;t||(this.disableTextTrack(),function(){if(!this._textTracks)return;var e=this._textTracks.filter(function(e){return e.embedded||"subs"===e.groupid});this._initTextTracks(),e.forEach(function(e){this._tracksById[e._id]=e}),this._textTracks=e}.call(this),this.addTextTracks(e))},setSubtitlesTrack:function(e){if(!this.renderNatively)return void(this.setCurrentSubtitleTrack&&this.setCurrentSubtitleTrack(e-1));if(!this._textTracks)return;0===e&&this._textTracks.forEach(function(e){e.mode=e.embedded?"hidden":"disabled"});if(this._currentTextTrackIndex===e-1)return;this.disableTextTrack(),this._currentTextTrackIndex=e-1,this._textTracks[this._currentTextTrackIndex]&&(this._textTracks[this._currentTextTrackIndex].mode="showing");this.trigger("subtitlesTrackChanged",{currentTrack:this._currentTextTrackIndex+1,tracks:this._textTracks})},textTrackChangeHandler:null,addTrackHandler:null,addCuesToTrack:function(e){var t=this._tracksById[e.name];if(!t)return;t.source=e.source;for(var i=e.captions||[],n=[],r=!1,a=0;a<i.length;a++){var s=i[a],c=e.name+"_"+s.begin+"_"+s.end;this._metaCuesByTextTime[c]||(this._metaCuesByTextTime[c]=s,n.push(s),r=!0)}r&&n.sort(function(e,t){return e.begin-t.begin});var u=Object(k.b)(n);Array.prototype.push.apply(t.data,u)},addCaptionsCue:function(e){if(!e.text||!e.begin||!e.end)return;var t=e.trackid.toString(),i=this._tracksById&&this._tracksById[t];i||(i={kind:"captions",_id:t,data:[]},this.addTextTracks([i]),this.trigger("subtitlesTracks",{tracks:this._textTracks}));var n=void 0;e.useDTS&&(i.source||(i.source=e.source||"mpegts"));n=e.begin+"_"+e.text;var r=this._metaCuesByTextTime[n];if(!r){r={begin:e.begin,end:e.end,text:e.text},this._metaCuesByTextTime[n]=r;var a=Object(k.b)([r])[0];i.data.push(a)}},addVTTCue:function(e){this._tracksById||this._initTextTracks();var t=e.track?e.track:"native"+e.type,i=this._tracksById[t],n="captions"===e.type?"Unknown CC":"ID3 Metadata",r=e.cue;if(!i){var a={kind:e.type,_id:t,label:n,embedded:!0};i=j.call(this,a),this.renderNatively||"metadata"===i.kind?this.setTextTracks(this.video.textTracks):w.call(this,[i])}(function(e,t){var i=e.kind;this._cachedVTTCues[e._id]||(this._cachedVTTCues[e._id]={});var n=this._cachedVTTCues[e._id],r=void 0;switch(i){case"captions":case"subtitles":r=Math.floor(20*t.startTime);var a="_"+t.line,s=Math.floor(20*t.endTime),c=n[r+a]||n[r+1+a]||n[r-1+a];return!(c&&Math.abs(c-s)<=1)&&(n[r+a]=s,!0);case"metadata":var u=t.data?new Uint8Array(t.data).join(""):t.text;return r=t.startTime+u,n[r]?!1:(n[r]=t.endTime,!0);default:return!1}}).call(this,i,r)&&(this.renderNatively||"metadata"===i.kind?O(this.renderNatively,i,r):i.data.push(r))},addVTTCuesToTrack:function(e,t){if(!this.renderNatively)return;var i=this._tracksById[e._id];if(!i)return this._cuesByTrackId||(this._cuesByTrackId={}),void(this._cuesByTrackId[e._id]={cues:t,loaded:!1});if(this._cuesByTrackId[e._id]&&this._cuesByTrackId[e._id].loaded)return;var n=void 0;this._cuesByTrackId[e._id]={cues:t,loaded:!0};for(;n=t.shift();)O(this.renderNatively,i,n)},renderNatively:!1},I=i(57),N=i(13),M=i(1),P=224e3,R=224005,A=221e3,H=window.clearTimeout,V="html5",D=function(){};function F(e,t){Object.keys(e).forEach(function(i){t.removeEventListener(i,e[i])})}function W(e,t,i){this.state=s.La,this.seeking=!1;var c=this,T=t.minDvrWindow,k={progress:function(){u.progress.call(c),he()},timeupdate:function(){w!==b.currentTime&&($(b.currentTime),u.timeupdate.call(c)),he(),r.Browser.ie&&G()},resize:G,ended:function(){C=-1,fe(),u.ended.call(c)},loadedmetadata:function(){var e=c.getDuration();X&&e===1/0&&(e=0);var t={duration:e,height:b.videoHeight,width:b.videoWidth};c.trigger(s.K,t),G()},durationchange:function(){X||u.progress.call(c)},loadeddata:function(){u.loadeddata.call(c),function(e){if(E=null,!e)return;if(e.length){for(var t=0;t<e.length;t++)if(e[t].enabled){L=t;break}-1===L&&(e[L=0].enabled=!0),E=Object(n.w)(e,function(e){var t={name:e.label||e.language,language:e.language};return t})}c.addTracksListener(e,"change",ce),E&&c.trigger("audioTracks",{currentTrack:L,tracks:E})}(b.audioTracks),function(e){x&&-1!==x&&e&&e!==1/0&&c.seek(x)}(c.getDuration()),G()},canplay:function(){p=!0,X||le(),r.Browser.ie&&9===r.Browser.version.major&&c.setTextTracks(c._textTracks),u.canplay.call(c)},seeking:function(){var e=null!==_?_:c.getCurrentTime(),t=w;$(e),_=null,x=0,c.seeking=!0,c.trigger(s.P,{position:t,offset:e})},seeked:function(){u.seeked.call(c)},waiting:function(){c.seeking?c.setState(s.Ma):c.state===s.Oa&&(c.atEdgeOfLiveStream()&&c.setPlaybackRate(1),c.stallTime=c.video.currentTime,c.setState(s.Pa))},webkitbeginfullscreen:function(e){B=!0,ue(e)},webkitendfullscreen:function(e){B=!1,ue(e)},error:function(){var e=c.video,t=e.error,i=t&&t.code||-1,n=P,r=M.k;1===i?n+=i:2===i?(r=M.i,n=A):3===i||4===i?(n+=i-1,4===i&&e.src===location.href&&(n=R)):r=M.m,re(),c.trigger(s.G,new M.n(r,n,t))}};Object.keys(u).forEach(function(e){if(!k[e]){var t=u[e];k[e]=function(e){t.call(c,e)}}}),Object(n.h)(this,g.a,l,h,S,{renderNatively:function(e){return!(!r.OS.iOS&&!r.Browser.safari)||e&&r.Browser.chrome}(t.renderCaptionsNatively),eventsOn_:function(){!function(e,t){Object.keys(e).forEach(function(i){t.removeEventListener(i,e[i]),t.addEventListener(i,e[i])})}(k,b)},eventsOff_:function(){F(k,b)},detachMedia:function(){return h.detachMedia.call(c),fe(),this.removeTracksListener(b.textTracks,"change",this.textTrackChangeHandler),this.disableTextTrack(),b},attachMedia:function(){h.attachMedia.call(c),p=!1,this.seeking=!1,b.loop=!1,this.enableTextTrack(),this.renderNatively&&this.setTextTracks(this.video.textTracks),this.addTracksListener(b.textTracks,"change",this.textTrackChangeHandler)},isLive:function(){return b.duration===1/0}});var b=i,m={level:{}},y=null!==t.liveTimeout?t.liveTimeout:3e4,p=!1,x=0,_=null,w=null,O=void 0,C=-1,B=!1,j=D,E=null,L=-1,W=-1,J=!1,Q=null,X=!1,z=null,q=null,K=0;function G(){var e=m.level;if(e.width!==b.videoWidth||e.height!==b.videoHeight){if(!b.videoWidth&&!de()||-1===C)return;e.width=b.videoWidth,e.height=b.videoHeight,le(),m.reason=m.reason||"auto",m.mode="hls"===O[C].type?"auto":"manual",m.bitrate=0,e.index=C,e.label=O[C].label,c.trigger(s.T,m),m.reason=""}}function $(e){w=Y(e)}function Y(e){var t=c.getSeekRange();if(c.isLive()&&Object(f.a)(t.end-t.start,T)){e-=t.end;var i=Math.abs(z-t.end)>1;return q&&!i||function(e){z=e.end,q=b.currentTime-z,K=Object(N.a)()}(t),q}return e}function Z(e){var t=void 0;return Array.isArray(e)&&e.length>0&&(t=e.map(function(e,t){return{label:e.label||t}})),t}function ee(e){T=e.minDvrWindow,O=e.sources,C=function(e){var i=Math.max(0,C),n=t.qualityLabel;if(e)for(var r=0;r<e.length;r++)if(e[r].default&&(i=r),n&&e[r].label===n)return r;m.reason="initial choice",m.level.width&&m.level.height||(m.level={});return i}(O)}function te(){return b.paused&&b.played&&b.played.length&&c.isLive()&&!Object(f.a)(se()-ae(),T)&&(c.clearTracks(),b.load()),b.play()||Object(I.a)(b)}function ie(e){x=0,fe();var t=b.src,i=document.createElement("source");i.src=O[C].file,i.src!==t?(ne(O[C]),t&&b.load()):0===e&&b.currentTime>0&&(x=-1,c.seek(e)),e>0&&b.currentTime!==e&&c.seek(e);var n=Z(O);n&&c.trigger(s.I,{levels:n,currentQuality:C}),O.length&&"hls"!==O[0].type&&c.sendMediaType(O)}function ne(e){E=null,L=-1,m.reason||(m.reason="initial choice",m.level={}),p=!1;var t=document.createElement("source");t.src=e.file,b.src!==t.src&&(b.src=e.file)}function re(){b&&(c.disableTextTrack(),b.removeAttribute("preload"),b.removeAttribute("src"),Object(v.g)(b),Object(o.d)(b,{objectFit:""}),C=-1,!r.Browser.msie&&"load"in b&&b.load())}function ae(){var e=1/0;return["buffered","seekable"].forEach(function(t){for(var i=b[t],n=i?i.length:0;n--;)e=Math.min(e,i.start(n))}),e}function se(){var e=0;return["buffered","seekable"].forEach(function(t){for(var i=b[t],n=i?i.length:0;n--;)e=Math.max(e,i.end(n))}),e}function ce(){for(var e=-1,t=0;t<b.audioTracks.length;t++)if(b.audioTracks[t].enabled){e=t;break}oe(e)}function ue(e){c.trigger("fullscreenchange",{target:e.target,jwstate:B})}function oe(e){b&&b.audioTracks&&E&&e>-1&&e<b.audioTracks.length&&e!==L&&(b.audioTracks[L].enabled=!1,L=e,b.audioTracks[L].enabled=!0,c.trigger("audioTrackChanged",{currentTrack:L,tracks:E}))}function de(){return 0===b.videoHeight&&!((r.OS.iOS||r.Browser.safari)&&b.readyState<2)}function le(){if("hls"===O[0].type){var e=de()?"audio":"video";c.trigger(s.S,{mediaType:e})}}function he(){if(0!==y){var e=d(b.buffered);c.isLive()&&e&&Q===e?-1===W&&(W=setTimeout(function(){J=!0,function(){if(J&&c.atEdgeOfLiveStream())return c.trigger(s.G,new M.n(M.l,U)),!0}()},y)):(fe(),J=!1),Q=e}}function fe(){H(W),W=-1}this.isSDK=!!t.sdkplatform,this.video=b,this.supportsPlaybackRate=!0,c.getCurrentTime=function(){return Y(b.currentTime)},c.getDuration=function(){var e=b.duration;if(X&&e===1/0&&0===b.currentTime||isNaN(e))return 0;var t=se();if(c.isLive()&&t){var i=t-ae();Object(f.a)(i,T)&&(e=-i)}return e},c.getSeekRange=function(){var e={start:0,end:b.duration};return b.seekable.length&&(e.end=se(),e.start=ae()),e},this.stop=function(){fe(),re(),this.clearTracks(),r.Browser.ie&&b.pause(),this.setState(s.La)},this.destroy=function(){j=D,F(k,b),this.removeTracksListener(b.audioTracks,"change",ce),this.removeTracksListener(b.textTracks,"change",c.textTrackChangeHandler),this.off()},this.init=function(e){ee(e);var t=O[C];(X=Object(a.a)(t))&&(c.supportsPlaybackRate=!1,k.waiting=D),c.eventsOn_(),O.length&&"hls"!==O[0].type&&this.sendMediaType(O),m.reason=""},this.preload=function(e){ee(e);var t=O[C],i=t.preload||"metadata";"none"!==i&&(b.setAttribute("preload",i),ne(t))},this.load=function(e){ee(e),ie(e.starttime),this.setupSideloadedTracks(e.tracks)},this.play=function(){return j(),te()},this.pause=function(){fe(),j=function(){if(b.paused&&b.currentTime&&c.isLive()){var e=se(),t=e-ae(),i=!Object(f.a)(t,T),n=e-b.currentTime;i&&e&&(n>15||n<0)&&(_=Math.max(e-10,e-t),$(b.currentTime),b.currentTime=_)}},b.pause()},this.seek=function(e){var t=c.getSeekRange();if(e<0&&(e+=t.start+t.end),p||(p=!!t.end),p){x=0;try{if(c.seeking=!0,c.isLive()&&Object(f.a)(t.end-t.start,T)){var i=Math.min(12,(Object(N.a)()-K)/1e3);q=e-z,_+=i}else _=e;$(b.currentTime),b.currentTime=e}catch(t){c.seeking=!1,x=e}}else x=e,r.Browser.firefox&&b.paused&&te()},this.setVisibility=function(e){(e=!!e)||r.OS.android?Object(o.d)(c.container,{visibility:"visible",opacity:1}):Object(o.d)(c.container,{visibility:"",opacity:0})},this.setFullscreen=function(e){if(e=!!e){try{var t=b.webkitEnterFullscreen||b.webkitEnterFullScreen;t&&t.apply(b)}catch(e){return!1}return c.getFullScreen()}var i=b.webkitExitFullscreen||b.webkitExitFullScreen;return i&&i.apply(b),e},c.getFullScreen=function(){return B||!!b.webkitDisplayingFullscreen},this.setCurrentQuality=function(e){C!==e&&e>=0&&O&&O.length>e&&(C=e,m.reason="api",m.level={},this.trigger(s.J,{currentQuality:e,levels:Z(O)}),t.qualityLabel=O[e].label,ie(b.currentTime||0),te())},this.setPlaybackRate=function(e){b.playbackRate=b.defaultPlaybackRate=e},this.getPlaybackRate=function(){return b.playbackRate},this.getCurrentQuality=function(){return C},this.getQualityLevels=function(){return Array.isArray(O)?O.map(function(e){return function(e){return{bitrate:e.bitrate,label:e.label,width:e.width,height:e.height}}(e)}):[]},this.getName=function(){return{name:V}},this.setCurrentAudioTrack=oe,this.getAudioTracks=function(){return E||[]},this.getCurrentAudioTrack=function(){return L}}Object(n.h)(W.prototype,T.a),W.getName=function(){return{name:"html5"}};t.default=W;var U=220001},52:function(e,t,i){"use strict";i.d(t,"a",function(){return r});var n=i(2);function r(e){var t=[],i=(e=Object(n.h)(e)).split("\r\n\r\n");1===i.length&&(i=e.split("\n\n"));for(var r=0;r<i.length;r++)if("WEBVTT"!==i[r]){var s=a(i[r]);s.text&&t.push(s)}return t}function a(e){var t={},i=e.split("\r\n");1===i.length&&(i=e.split("\n"));var r=1;if(i[0].indexOf(" --\x3e ")>0&&(r=0),i.length>r+1&&i[r+1]){var a=i[r],s=a.indexOf(" --\x3e ");s>0&&(t.begin=Object(n.f)(a.substr(0,s)),t.end=Object(n.f)(a.substr(s+5)),t.text=i.slice(r+1).join("\r\n"))}return t}},56:function(e,t,i){"use strict";var n=i(60),r=i(14),a=i(21),s=i(4),c=i(52),u=i(2),o=i(1);function d(e){throw new o.n(null,e)}function l(e,t,n){e.xhr=Object(a.a)(e.file,function(a){!function(e,t,n,a){var l=e.responseXML?e.responseXML.firstChild:null,h=void 0,v=void 0;if(l)for("xml"===Object(s.b)(l)&&(l=l.nextSibling);l.nodeType===l.COMMENT_NODE;)l=l.nextSibling;try{if(l&&"tt"===Object(s.b)(l))h=function(e){e||d(306007);var t=[],i=e.getElementsByTagName("p"),n=30,r=e.getElementsByTagName("tt");if(r&&r[0]){var a=parseFloat(r[0].getAttribute("ttp:frameRate"));isNaN(a)||(n=a)}i||d(306005),i.length||(i=e.getElementsByTagName("tt:p")).length||(i=e.getElementsByTagName("tts:p"));for(var s=0;s<i.length;s++){for(var c=i[s],o=c.getElementsByTagName("br"),l=0;l<o.length;l++){var h=o[l];h.parentNode.replaceChild(e.createTextNode("\r\n"),h)}var f=c.innerHTML||c.textContent||c.text||"",v=Object(u.h)(f).replace(/>\s+</g,"><").replace(/(<\/?)tts?:/g,"$1").replace(/<br.*?\/>/g,"\r\n");if(v){var T=c.getAttribute("begin"),g=c.getAttribute("dur"),k=c.getAttribute("end"),b={begin:Object(u.f)(T,n),text:v};k?b.end=Object(u.f)(k,n):g&&(b.end=b.begin+Object(u.f)(g,n)),t.push(b)}}return t.length||d(306005),t}(e.responseXML),v=f(h),delete t.xhr,n(v);else{var T=e.responseText;T.indexOf("WEBVTT")>=0?i.e(9).then(function(e){return i(89).default}.bind(null,i)).catch(Object(r.c)(301131)).then(function(e){var i=new e(window);v=[],i.oncue=function(e){v.push(e)},i.onflush=function(){delete t.xhr,n(v)},i.parse(T)}).catch(function(e){delete t.xhr,a(Object(o.v)(null,o.b,e))}):(h=Object(c.a)(T),v=f(h),delete t.xhr,n(v))}}catch(e){delete t.xhr,a(Object(o.v)(null,o.b,e))}}(a,e,t,n)},function(e,t,i,r){n(Object(o.u)(r,o.b))})}function h(e){e&&e.forEach(function(e){var t=e.xhr;t&&(t.onload=null,t.onreadystatechange=null,t.onerror=null,"abort"in t&&t.abort()),delete e.xhr})}function f(e){return e.map(function(e){return new n.a(e.begin,e.end,e.text)})}i.d(t,"c",function(){return l}),i.d(t,"a",function(){return h}),i.d(t,"b",function(){return f})},57:function(e,t,i){"use strict";function n(e){return new Promise(function(t,i){if(e.paused)return i(r("NotAllowedError",0,"play() failed."));var n=function(){e.removeEventListener("play",a),e.removeEventListener("playing",s),e.removeEventListener("pause",s),e.removeEventListener("abort",s),e.removeEventListener("error",s)},a=function(){e.addEventListener("playing",s),e.addEventListener("abort",s),e.addEventListener("error",s),e.addEventListener("pause",s)},s=function(e){if(n(),"playing"===e.type)t();else{var a='The play() request was interrupted by a "'+e.type+'" event.';"error"===e.type?i(r("NotSupportedError",9,a)):i(r("AbortError",20,a))}};e.addEventListener("play",a)})}function r(e,t,i){var n=new Error(i);return n.name=e,n.code=t,n}i.d(t,"a",function(){return n})},58:function(e,t,i){"use strict";function n(e,t){var i=e.kind||"cc";return e.default||e.defaulttrack?"default":e._id||e.file||i+t}function r(e,t){var i=e.label||e.name||e.language;return i||(i="Unknown CC",(t+=1)>1&&(i+=" ["+t+"]")),{label:i,unknownCount:t}}i.d(t,"a",function(){return n}),i.d(t,"b",function(){return r})},59:function(e,t,i){"use strict";function n(e,t){return e!==1/0&&Math.abs(e)>=Math.max(a(t),0)}function r(e,t){var i="VOD";return e===1/0?i="LIVE":e<0&&(i=n(e,a(t))?"DVR":"LIVE"),i}function a(e){return void 0===e?120:Math.max(e,0)}i.d(t,"a",function(){return n}),i.d(t,"b",function(){return r})},60:function(e,t,i){"use strict";var n=window.VTTCue;function r(e){if("string"!=typeof e)return!1;return!!{start:!0,middle:!0,end:!0,left:!0,right:!0}[e.toLowerCase()]&&e.toLowerCase()}if(!n){(n=function(e,t,i){var n=this;n.hasBeenReset=!1;var a="",s=!1,c=e,u=t,o=i,d=null,l="",h=!0,f="auto",v="start",T="auto",g=100,k="middle";Object.defineProperty(n,"id",{enumerable:!0,get:function(){return a},set:function(e){a=""+e}}),Object.defineProperty(n,"pauseOnExit",{enumerable:!0,get:function(){return s},set:function(e){s=!!e}}),Object.defineProperty(n,"startTime",{enumerable:!0,get:function(){return c},set:function(e){if("number"!=typeof e)throw new TypeError("Start time must be set to a number.");c=e,this.hasBeenReset=!0}}),Object.defineProperty(n,"endTime",{enumerable:!0,get:function(){return u},set:function(e){if("number"!=typeof e)throw new TypeError("End time must be set to a number.");u=e,this.hasBeenReset=!0}}),Object.defineProperty(n,"text",{enumerable:!0,get:function(){return o},set:function(e){o=""+e,this.hasBeenReset=!0}}),Object.defineProperty(n,"region",{enumerable:!0,get:function(){return d},set:function(e){d=e,this.hasBeenReset=!0}}),Object.defineProperty(n,"vertical",{enumerable:!0,get:function(){return l},set:function(e){var t=function(e){return"string"==typeof e&&!!{"":!0,lr:!0,rl:!0}[e.toLowerCase()]&&e.toLowerCase()}(e);if(!1===t)throw new SyntaxError("An invalid or illegal string was specified.");l=t,this.hasBeenReset=!0}}),Object.defineProperty(n,"snapToLines",{enumerable:!0,get:function(){return h},set:function(e){h=!!e,this.hasBeenReset=!0}}),Object.defineProperty(n,"line",{enumerable:!0,get:function(){return f},set:function(e){if("number"!=typeof e&&"auto"!==e)throw new SyntaxError("An invalid number or illegal string was specified.");f=e,this.hasBeenReset=!0}}),Object.defineProperty(n,"lineAlign",{enumerable:!0,get:function(){return v},set:function(e){var t=r(e);if(!t)throw new SyntaxError("An invalid or illegal string was specified.");v=t,this.hasBeenReset=!0}}),Object.defineProperty(n,"position",{enumerable:!0,get:function(){return T},set:function(e){if(e<0||e>100)throw new Error("Position must be between 0 and 100.");T=e,this.hasBeenReset=!0}}),Object.defineProperty(n,"size",{enumerable:!0,get:function(){return g},set:function(e){if(e<0||e>100)throw new Error("Size must be between 0 and 100.");g=e,this.hasBeenReset=!0}}),Object.defineProperty(n,"align",{enumerable:!0,get:function(){return k},set:function(e){var t=r(e);if(!t)throw new SyntaxError("An invalid or illegal string was specified.");k=t,this.hasBeenReset=!0}}),n.displayState=void 0}).prototype.getCueAsHTML=function(){return window.WebVTT.convertCueToDOMTree(window,this.text)}}t.a=n}}]);