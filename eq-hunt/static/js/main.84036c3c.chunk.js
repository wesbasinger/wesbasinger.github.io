(this["webpackJsonpeq-hunt-client"]=this["webpackJsonpeq-hunt-client"]||[]).push([[0],{162:function(e,t,n){e.exports=n(387)},178:function(e,t){},201:function(e,t){},203:function(e,t){},243:function(e,t){},245:function(e,t){},274:function(e,t){},387:function(e,t,n){"use strict";n.r(t);var a=n(15),l=n.n(a),r=n(78),i=n(79),s=n(83),u=n(80),o=n(32),c=n(84),p=n(0),m=n.n(p),h=n(158),y=n.n(h),d=n(159),b=n.n(d),v=n(33),f=n(21),E=[{inputs:[],payable:!0,stateMutability:"payable",type:"constructor"},{payable:!0,stateMutability:"payable",type:"fallback"},{constant:!1,inputs:[{internalType:"string",name:"_id",type:"string"},{internalType:"string",name:"_repr",type:"string"},{internalType:"int256",name:"_answer",type:"int256"}],name:"create",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{internalType:"string",name:"_id",type:"string"}],name:"getEquation",outputs:[{internalType:"string",name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"string",name:"_id",type:"string"}],name:"getNumSolvers",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"string",name:"_id",type:"string"}],name:"getSolvers",outputs:[{internalType:"address[]",name:"",type:"address[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"lastSolveTime",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"locked",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{internalType:"string",name:"_id",type:"string"},{internalType:"int256",name:"_answer",type:"int256"}],name:"solve",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[{internalType:"string",name:"",type:"string"},{internalType:"uint256",name:"",type:"uint256"}],name:"solvers",outputs:[{internalType:"address",name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"withdraw",outputs:[],payable:!0,stateMutability:"payable",type:"function"}],g=n(168),w=function(){return new g(g.givenProvider)},k=function(){return window.ethereum.enable(),new(w().eth.Contract)(E,"0xe559835d7979dae994331defaec2fba057e56c27")},C=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={id:"",locked:!0},n.handleChange=n.handleChange.bind(Object(o.a)(n)),n}return Object(c.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e,t;return l.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return e=k(),n.next=3,l.a.awrap(e.methods.locked().call());case 3:t=n.sent,this.setState({locked:t});case 5:case"end":return n.stop()}}),null,this)}},{key:"handleChange",value:function(e){this.setState({id:e.target.value})}},{key:"render",value:function(){return m.a.createElement("div",null,m.a.createElement("h1",null,"Equation Hunt"),m.a.createElement(v.b,{to:"/rules"},"Rules"),m.a.createElement("h2",null,"Contract is currently: ",this.state.locked?"LOCKED":"UNLOCKED"),m.a.createElement("h2",null,"Lookup"),m.a.createElement("p",null,"Enter the ID found at the cache to lookup the associated equation."),m.a.createElement("label",{htmlFor:"id"},"ID:"),m.a.createElement("input",{type:"text",value:this.state.id,onChange:this.handleChange}),m.a.createElement("button",null,m.a.createElement(v.b,{to:"/solve/".concat(this.state.id)},"Lookup")))}}]),t}(m.a.Component),S=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={repr:"loading...",answer:"",solvers:[]},n.handleChange=n.handleChange.bind(Object(o.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(o.a)(n)),n}return Object(c.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e,t,n;return l.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return e=k(),a.next=3,l.a.awrap(e.methods.getEquation(this.props.match.params.id).call());case 3:return t=a.sent,a.next=6,l.a.awrap(e.methods.getSolvers(this.props.match.params.id).call());case 6:n=a.sent,this.setState({repr:t,solvers:n}),""===this.state.repr&&this.setState({repr:"\u2205"});case 9:case"end":return a.stop()}}),null,this)}},{key:"handleChange",value:function(e){this.setState({answer:e.target.value})}},{key:"handleSubmit",value:function(e){var t,n;return l.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return t=w(),e.next=3,l.a.awrap(t.eth.getAccounts());case 3:n=e.sent,k().methods.solve(this.props.match.params.id,Number(this.state.answer)).send({from:n[0]}),this.setState({answer:""});case 7:case"end":return e.stop()}}),null,this)}},{key:"render",value:function(){var e=this;return m.a.createElement("div",null,m.a.createElement("h1",null,"Solve for ",this.props.match.params.id),m.a.createElement("div",{dangerouslySetInnerHTML:{__html:b.a.renderToString(e.state.repr,{output:"html"})}}),m.a.createElement("label",{htmlFor:"answer"},"Answer:"),m.a.createElement("input",{type:"number",name:"answer",value:this.state.answer,onChange:this.handleChange}),m.a.createElement("button",{onClick:this.handleSubmit},"Check"),m.a.createElement("h2",null,"Previous Solvers"),m.a.createElement("ul",null,this.state.solvers.map((function(e){return m.a.createElement("li",{key:e},e)}))),m.a.createElement(v.b,{to:"/"},"Back to lookup"))}}]),t}(m.a.Component),T=function(){return m.a.createElement("div",null,m.a.createElement("h1",null,"Rules"),m.a.createElement("p",null,"Please observe the following out of courtesy."),m.a.createElement("ol",null,m.a.createElement("li",null,"Cache ID must be found at the site."),m.a.createElement("li",null,"Solve for reward only one time."),m.a.createElement("li",null,"Please do not give out the cache IDs or answers.")),m.a.createElement(v.b,{to:"/"},"Back to lookup"))};y.a.render(m.a.createElement((function(){return m.a.createElement(v.a,{basename:"/eq-hunt"},m.a.createElement(f.c,null,m.a.createElement(f.a,{exact:!0,path:"/"},m.a.createElement(C,null)),m.a.createElement(f.a,{path:"/solve/:id",component:S}),m.a.createElement(f.a,{path:"/rules"},m.a.createElement(T,null))))}),null),document.getElementById("root"))}},[[162,1,2]]]);
//# sourceMappingURL=main.84036c3c.chunk.js.map