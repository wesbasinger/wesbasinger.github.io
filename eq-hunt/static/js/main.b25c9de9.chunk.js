(this["webpackJsonpeq-hunt-client"]=this["webpackJsonpeq-hunt-client"]||[]).push([[0],{163:function(e,t,n){e.exports=n(388)},179:function(e,t){},202:function(e,t){},204:function(e,t){},244:function(e,t){},246:function(e,t){},275:function(e,t){},388:function(e,t,n){"use strict";n.r(t);var a=n(78),r=n(15),l=n.n(r),i=n(79),s=n(80),u=n(84),o=n(81),c=n(32),p=n(85),m=n(0),h=n.n(m),y=n(159),d=n.n(y),b=n(160),v=n.n(b),f=n(33),E=n(21),g=[{inputs:[],payable:!0,stateMutability:"payable",type:"constructor"},{payable:!0,stateMutability:"payable",type:"fallback"},{constant:!1,inputs:[{internalType:"string",name:"_id",type:"string"},{internalType:"string",name:"_repr",type:"string"},{internalType:"int256",name:"_answer",type:"int256"}],name:"create",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{internalType:"string",name:"_id",type:"string"}],name:"getEquation",outputs:[{internalType:"string",name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"string",name:"_id",type:"string"}],name:"getNumSolvers",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"string",name:"_id",type:"string"}],name:"getSolvers",outputs:[{internalType:"address[]",name:"",type:"address[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"lastSolveTime",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"locked",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{internalType:"string",name:"_id",type:"string"},{internalType:"int256",name:"_answer",type:"int256"}],name:"solve",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[{internalType:"string",name:"",type:"string"},{internalType:"uint256",name:"",type:"uint256"}],name:"solvers",outputs:[{internalType:"address",name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"withdraw",outputs:[],payable:!0,stateMutability:"payable",type:"function"}];function w(){var e=Object(a.a)(["",""]);return w=function(){return e},e}function k(){var e=Object(a.a)(["",""]);return k=function(){return e},e}var S=n(169),C=function(){return new S(S.givenProvider)},T=function(){return window.ethereum.enable(),new(C().eth.Contract)(g,"0xe559835d7979dae994331defaec2fba057e56c27")},O=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(o.a)(t).call(this,e))).state={id:"",locked:!0},n.handleChange=n.handleChange.bind(Object(c.a)(n)),n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e,t;return l.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return e=T(),n.next=3,l.a.awrap(e.methods.locked().call());case 3:t=n.sent,this.setState({locked:t});case 5:case"end":return n.stop()}}),null,this)}},{key:"handleChange",value:function(e){this.setState({id:e.target.value})}},{key:"render",value:function(){return h.a.createElement("div",null,h.a.createElement("h1",null,"Equation Hunt"),h.a.createElement(f.b,{to:"/rules"},"Rules"),h.a.createElement("h2",null,"Contract is currently: ",this.state.locked?"LOCKED":"UNLOCKED"),h.a.createElement("h2",null,"Lookup"),h.a.createElement("p",null,"Enter the ID found at the cache to lookup the associated equation."),h.a.createElement("label",{htmlFor:"id"},"ID:"),h.a.createElement("input",{type:"text",value:this.state.id,onChange:this.handleChange}),h.a.createElement("button",null,h.a.createElement(f.b,{to:"/solve/".concat(this.state.id)},"Lookup")))}}]),t}(h.a.Component),j=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(o.a)(t).call(this,e))).state={repr:"loading...",answer:"",solvers:[]},n.handleChange=n.handleChange.bind(Object(c.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(c.a)(n)),n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e,t,n;return l.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return e=T(),a.next=3,l.a.awrap(e.methods.getEquation(this.props.match.params.id).call());case 3:return t=a.sent,a.next=6,l.a.awrap(e.methods.getSolvers(this.props.match.params.id).call());case 6:n=a.sent,this.setState({repr:String.raw(k(),t),solvers:n}),console.log(this.state.repr),""===this.state.repr&&this.setState({repr:"\u2205"});case 10:case"end":return a.stop()}}),null,this)}},{key:"handleChange",value:function(e){this.setState({answer:e.target.value})}},{key:"handleSubmit",value:function(e){var t,n;return l.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return t=C(),e.next=3,l.a.awrap(t.eth.getAccounts());case 3:n=e.sent,T().methods.solve(this.props.match.params.id,Number(this.state.answer)).send({from:n[0]}),this.setState({answer:""});case 7:case"end":return e.stop()}}),null,this)}},{key:"render",value:function(){var e=this;return h.a.createElement("div",null,h.a.createElement("h1",null,"Solve for ",this.props.match.params.id),h.a.createElement("h1",null,h.a.createElement("div",{dangerouslySetInnerHTML:{__html:v.a.renderToString(String.raw(w(),e.state.repr),{throwOnError:!1})}})),h.a.createElement("label",{htmlFor:"answer"},"Answer:"),h.a.createElement("input",{type:"number",name:"answer",value:this.state.answer,onChange:this.handleChange}),h.a.createElement("button",{onClick:this.handleSubmit},"Check"),h.a.createElement("h2",null,"Previous Solvers"),h.a.createElement("ul",null,this.state.solvers.map((function(e){return h.a.createElement("li",{key:e},e)}))),h.a.createElement(f.b,{to:"/"},"Back to lookup"))}}]),t}(h.a.Component),M=function(){return h.a.createElement("div",null,h.a.createElement("h1",null,"Rules"),h.a.createElement("p",null,"Please observe the following out of courtesy."),h.a.createElement("ol",null,h.a.createElement("li",null,"Cache ID must be found at the site."),h.a.createElement("li",null,"Solve for reward only one time."),h.a.createElement("li",null,"Please do not give out the cache IDs or answers.")),h.a.createElement(f.b,{to:"/"},"Back to lookup"))};d.a.render(h.a.createElement((function(){return h.a.createElement(f.a,{basename:"/eq-hunt"},h.a.createElement(E.c,null,h.a.createElement(E.a,{exact:!0,path:"/"},h.a.createElement(O,null)),h.a.createElement(E.a,{path:"/solve/:id",component:j}),h.a.createElement(E.a,{path:"/rules"},h.a.createElement(M,null))))}),null),document.getElementById("root"))}},[[163,1,2]]]);
//# sourceMappingURL=main.b25c9de9.chunk.js.map