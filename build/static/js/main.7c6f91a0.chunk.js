(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{17:function(e,t,n){e.exports=n(39)},39:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(15),c=n.n(o),u=n(16),i=n(2),l=n(4),d=n.n(l),m="https://pacific-everglades-63674.herokuapp.com/api/persons",f=function(e){var t=e.addPerson,n=e.newName,r=e.newNumber,o=e.setNewName,c=e.setNewNumber;return a.a.createElement("form",{onSubmit:t},a.a.createElement("div",null,a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:n,onChange:function(e){return o(e.target.value)}})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:r,onChange:function(e){return c(e.target.value)}}))),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},s=function(e){var t=e.searchQuery,n=e.setSearchQuery;return a.a.createElement(a.a.Fragment,null,"filter show with ",a.a.createElement("input",{value:t,onChange:function(e){return n(e.target.value)}}))},h=function(e){var t=e.persons,n=e.searchQuery,r=e.removeEntry;return t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})).map((function(e){return a.a.createElement("div",{key:e.id},e.name,"  ",e.number,a.a.createElement("button",{onClick:function(t){return r(t,e.id,e.name)}},"delete"))}))},b=function(e){var t=e.message,n=e.error;if(null===t&&null===n)return null;var r={color:n?"red":"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"};return a.a.createElement("div",{style:r},t||n)},p=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),l=Object(i.a)(c,2),p=l[0],v=l[1],E=Object(r.useState)(""),w=Object(i.a)(E,2),g=w[0],y=w[1],j=Object(r.useState)(""),O=Object(i.a)(j,2),N=O[0],S=O[1],k=Object(r.useState)(null),C=Object(i.a)(k,2),x=C[0],Q=C[1],I=Object(r.useState)(null),L=Object(i.a)(I,2),A=L[0],D=L[1];Object(r.useEffect)((function(){d.a.get(m).then((function(e){return e.data})).then((function(e){return o(e)})).catch((function(e){return console.error(e)}))}),[]);var P=function(e){Q(e),setTimeout((function(){Q(null)}),5e3)},B=function(e){D(e),setTimeout((function(){D(null)}),5e3)};return a.a.createElement("div",null,a.a.createElement("h1",null,"Phonebook"),a.a.createElement(b,{message:x,error:A}),a.a.createElement(s,{searchQuery:N,setSearchQuery:S}),a.a.createElement("h3",null,"Add a new"),a.a.createElement(f,{addPerson:function(e){if(e.preventDefault(),p){var t,r,a=n.find((function(e){return e.name.toLowerCase()===p.toLowerCase()})),c={name:p,number:g};if(a){if(a.number===g)return alert("".concat(p," is already added to phonebook"));if(window.confirm("".concat(a.name," is already added to the phonebook, replace the old number with the new one?")))return(t=c,r=a.id,d.a.put("".concat(m,"/").concat(r),t).then((function(e){return e.data}))).then((function(e){var t=n.findIndex((function(t){return t.id===e.id})),r=Object(u.a)(n);r.splice(t,1,e),o(r),v(""),y(""),P("Updated ".concat(e.name))})).catch((function(e){console.error(e),B("Information of ".concat(a.name," was deleted from server")),o(n.filter((function(e){return e.id!==a.id})))}))}(function(e){return d.a.post(m,e).then((function(e){return e.data}))})(c).then((function(e){o(n.concat(e)),v(""),y(""),P("Added ".concat(e.name))})).catch((function(e){console.error(e)}))}},newName:p,newNumber:g,setNewName:v,setNewNumber:y}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(h,{persons:n,searchQuery:N,removeEntry:function(e,t,r){e.preventDefault(),window.confirm("Are you sure you want to delete ".concat(r," ?"))&&function(e){return d.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))}(t).then((function(){o(n.filter((function(e){return e.id!==t}))),P("Deleted ".concat(r))})).catch((function(e){console.error(e),B("Information of ".concat(r," was deleted from server")),o(n.filter((function(e){return e.id===t})))}))}}))};c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(p,null)),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.7c6f91a0.chunk.js.map