(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[2],{29:function(e,t,n){e.exports=n(41)},31:function(e,t,n){e.exports=n(42)},41:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return _}));var a=n(7),r=function(e){return"_SUCCESS"===e.substring(e.length-8)},o=n(25),S=n(14),c=n(9),l={tasks:[],taskCount:0,apiCallInProgress:0},E=Object(a.c)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l.tasks,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case c.a.READ_TASKS:return Object(S.a)(t.payload);case c.a.GET_TASK_BY_ID:case c.a.CREATE_TASK:return e.length>0?[].concat(Object(S.a)(e),[t.payload]):[t.payload];case c.a.UPDATE_TASK:return e.map((function(e){return e._id===t.payload._id?Object(o.a)({},t.payload):e}));case c.a.DELETE_TASK:return e.filter((function(e){return e._id!==t.payload}));default:return e}},taskCount:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l.taskCount,t=arguments.length>1?arguments[1]:void 0;return t.type===c.a.SET_TASK_COUNT?t.payload:e},apiCallInProgress:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;return"BEGIN_API_CALL"===t.type?e+1:"API_CALL_ERROR"===t.type||r(t.type)?e-1:e}}),i=n(30);function _(e){return Object(a.d)(E,e,Object(a.a)(i.a))}},42:function(e,t,n){"use strict";n.r(t);var a=n(16),r=n(0),o=n.n(r),S=n(13),c=n.n(S);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=n(21),E=n(2),i=n(23),_=n(29),T=n.n(_)()({}),u=Object(a.a)((function(){return Promise.all([n.e(1),n.e(5),n.e(10)]).then(n.bind(null,332))})),s=Object(a.a)((function(){return Promise.all([n.e(0),n.e(1),n.e(4),n.e(11)]).then(n.bind(null,337))}));c.a.render(o.a.createElement(i.a,{store:T},o.a.createElement(l.a,null,o.a.createElement(E.d,null,o.a.createElement(E.b,{path:"/login"},o.a.createElement(s,null)),o.a.createElement(E.b,{path:"/"},o.a.createElement(u,null))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,n){"use strict";t.a={CREATE_TASK:"CREATE_TASK_SUCCESS",READ_TASKS:"READ_TASKS_SUCCESS",UPDATE_TASK:"UPDATE_TASK_SUCCESS",DELETE_TASK:"DELETE_TASK",GET_TASK_BY_ID:"GET_TASK_BY_ID_SUCCESS",GET_TASK_STATUS_OPTIONS_SUCCESS:"GET_TASK_STATUS_OPTIONS_SUCCESS",GET_TASK_INTERFACE_SUCCESS:"GET_TASK_INTERFACE_SUCCESS",SET_TASK_COUNT:"SET_TASK_COUNT"}}},[[31,3,6]]]);
//# sourceMappingURL=main.8cb122a6.chunk.js.map