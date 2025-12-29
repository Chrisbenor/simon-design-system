import{j as e}from"./jsx-runtime-u17CrQMm.js";import{R as C}from"./index-CqIc3cxq.js";function H(t){return t||`tf_${Math.random().toString(16).slice(2)}`}const S=e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm0 6.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-1 4.2h2v7h-2v-7Z",fill:"currentColor"})}),w=e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm4.2 11.2H12v-2h4.2l-1.6-1.6 1.4-1.4 4 4-4 4-1.4-1.4 1.6-1.6Z",fill:"currentColor"})});function f({id:t,label:i,required:h=!1,helpAriaLabel:x="Ayuda",onHelpClick:c,helpIcon:g,placeholder:b,value:T,disabled:r=!1,size:I="m",state:d="default",helperText:p,leftIcon:v,rightIcon:_,onChange:j}){const u=C.useMemo(()=>H(t),[t]),q=["textfield",r?"textfield--disabled":""].filter(Boolean).join(" "),y=["textfield__control",`textfield__control--${I}`,d==="error"?"textfield__control--error":""].filter(Boolean).join(" "),N=["textfield__helper",d==="error"?"textfield__helper--error":""].filter(Boolean).join(" "),m=!!c;return e.jsxs("div",{className:q,children:[(i||m)&&e.jsxs("div",{className:"textfield__labelRow",children:[i&&e.jsxs("label",{className:"textfield__label",htmlFor:u,children:[i,h&&e.jsx("span",{className:"textfield__required",children:"*"})]}),m&&e.jsx("button",{type:"button",className:"textfield__help","aria-label":x,onClick:c,disabled:r,children:g??e.jsx("span",{className:"textfield__helpDefaultIcon",children:"i"})})]}),e.jsxs("div",{className:y,"aria-disabled":r?"true":"false",children:[e.jsx("span",{className:"textfield__icon textfield__icon--left","aria-hidden":"true",children:v??S}),e.jsx("input",{id:u,className:"textfield__input",type:"text",placeholder:b,value:T??"",disabled:r,onChange:R=>j?.(R.target.value)}),e.jsx("span",{className:"textfield__icon textfield__icon--right","aria-hidden":"true",children:_??w})]}),p&&e.jsx("div",{className:N,children:p})]})}f.__docgenInfo={description:"",methods:[],displayName:"TextField",props:{id:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},helpAriaLabel:{required:!1,tsType:{name:"string"},description:"Help icon al lado del label",defaultValue:{value:'"Ayuda"',computed:!1}},onHelpClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},helpIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"s" | "m" | "l"',elements:[{name:"literal",value:'"s"'},{name:"literal",value:'"m"'},{name:"literal",value:'"l"'}]},description:"m = 36px (Figma). s/l opcionales",defaultValue:{value:'"m"',computed:!1}},state:{required:!1,tsType:{name:"union",raw:'"default" | "error"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"error"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},helperText:{required:!1,tsType:{name:"string"},description:""},leftIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"SIEMPRE 2 ICONOS (left y right)"},rightIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""}}};const l=({label:t})=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24","aria-label":t,role:"img",children:[e.jsx("path",{d:"M11 5h2v14h-2V5Z",fill:"currentColor"}),e.jsx("path",{d:"M5 11h14v2H5v-2Z",fill:"currentColor"})]}),k={title:"Components/TextField",component:f,parameters:{docs:{description:{component:"TextField alineado a Figma: stack 20/36/16 con gaps 8, input container con padding 8/16, radius S, y SIEMPRE 2 iconos (left/right)."}}},argTypes:{label:{control:"text"},placeholder:{control:"text"},value:{control:"text"},disabled:{control:"boolean"},required:{control:"boolean"},size:{control:"radio",options:["s","m","l"]},state:{control:"radio",options:["default","error"]},helperText:{control:"text"}}},a={args:{label:"Label",required:!0,placeholder:"Text",helperText:"Support Text",size:"m",leftIcon:e.jsx(l,{label:"left-plus"}),rightIcon:e.jsx(l,{label:"right-plus"})}},n={args:{label:"Label",required:!0,placeholder:"Text",helperText:"Support Text",size:"m",onHelpClick:()=>alert("Help action"),leftIcon:e.jsx(l,{label:"left-plus"}),rightIcon:e.jsx(l,{label:"right-plus"})}},s={args:{label:"Label",required:!0,placeholder:"Text",helperText:"Support Text",state:"error",onHelpClick:()=>alert("Help action"),leftIcon:e.jsx(l,{label:"left-plus"}),rightIcon:e.jsx(l,{label:"right-plus"})}},o={args:{label:"Label",required:!0,placeholder:"Text",helperText:"Support Text",disabled:!0,onHelpClick:()=>alert("Help action"),leftIcon:e.jsx(l,{label:"left-plus"}),rightIcon:e.jsx(l,{label:"right-plus"})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    required: true,
    placeholder: "Text",
    helperText: "Support Text",
    size: "m",
    leftIcon: <PlusIcon label="left-plus" />,
    rightIcon: <PlusIcon label="right-plus" />
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    required: true,
    placeholder: "Text",
    helperText: "Support Text",
    size: "m",
    onHelpClick: () => alert("Help action"),
    leftIcon: <PlusIcon label="left-plus" />,
    rightIcon: <PlusIcon label="right-plus" />
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    required: true,
    placeholder: "Text",
    helperText: "Support Text",
    state: "error",
    onHelpClick: () => alert("Help action"),
    leftIcon: <PlusIcon label="left-plus" />,
    rightIcon: <PlusIcon label="right-plus" />
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    required: true,
    placeholder: "Text",
    helperText: "Support Text",
    disabled: true,
    onHelpClick: () => alert("Help action"),
    leftIcon: <PlusIcon label="left-plus" />,
    rightIcon: <PlusIcon label="right-plus" />
  }
}`,...o.parameters?.docs?.source}}};const E=["Default","WithHelpAndIcons","Error","Disabled"];export{a as Default,o as Disabled,s as Error,n as WithHelpAndIcons,E as __namedExportsOrder,k as default};
