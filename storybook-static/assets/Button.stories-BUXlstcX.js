import{j as e}from"./jsx-runtime-u17CrQMm.js";import"./index-CqIc3cxq.js";function m({label:i,variant:p="primary",size:g="m",disabled:l=!1,onClick:h,iconLeft:c,iconRight:d,ariaLabel:b}){const y=["button",`button--${p}`,`button--${g}`,l?"button--disabled":""].filter(Boolean).join(" ");return e.jsxs("button",{className:y,disabled:l,onClick:h,"aria-label":b??i,type:"button",children:[c?e.jsx("span",{className:"button__icon",children:c}):null,e.jsx("span",{className:"button__label",children:i}),d?e.jsx("span",{className:"button__icon",children:d}):null]})}m.__docgenInfo={description:"",methods:[],displayName:"Button",props:{label:{required:!0,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:'"primary" | "secondary" | "ghost"',elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"secondary"'},{name:"literal",value:'"ghost"'}]},description:"",defaultValue:{value:'"primary"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"s" | "m" | "l"',elements:[{name:"literal",value:'"s"'},{name:"literal",value:'"m"'},{name:"literal",value:'"l"'}]},description:"",defaultValue:{value:'"m"',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},iconLeft:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Icono a la izquierda del texto"},iconRight:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Icono a la derecha del texto"},ariaLabel:{required:!1,tsType:{name:"string"},description:"Para botones sólo-ícono (accesibilidad). Si no lo pasas, usa label."}}};const s=()=>e.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M13 5l7 7-7 7M20 12H4",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),u=()=>e.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M12 5v14M5 12h14",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})}),x={title:"Components/Button",component:m,argTypes:{variant:{control:{type:"radio"},options:["primary","secondary","ghost"]},size:{control:{type:"radio"},options:["s","m","l"]},disabled:{control:{type:"boolean"}},label:{control:{type:"text"}},onClick:{action:"clicked"},iconLeft:{control:!1},iconRight:{control:!1}}},a={args:{label:"Botón primario",variant:"primary",size:"m"}},r={args:{label:"Crear",variant:"primary",size:"m",iconLeft:e.jsx(u,{})}},t={args:{label:"Continuar",variant:"secondary",size:"m",iconRight:e.jsx(s,{})}},n={args:{label:"Siguiente",variant:"primary",size:"l",iconLeft:e.jsx(u,{}),iconRight:e.jsx(s,{})}},o={args:{label:"Deshabilitado",variant:"primary",size:"m",disabled:!0,iconRight:e.jsx(s,{})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Botón primario",
    variant: "primary",
    size: "m"
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Crear",
    variant: "primary",
    size: "m",
    iconLeft: <Plus />
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Continuar",
    variant: "secondary",
    size: "m",
    iconRight: <ArrowRight />
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Siguiente",
    variant: "primary",
    size: "l",
    iconLeft: <Plus />,
    iconRight: <ArrowRight />
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Deshabilitado",
    variant: "primary",
    size: "m",
    disabled: true,
    iconRight: <ArrowRight />
  }
}`,...o.parameters?.docs?.source}}};const R=["Primary","WithLeftIcon","WithRightIcon","WithBothIcons","Disabled"];export{o as Disabled,a as Primary,n as WithBothIcons,r as WithLeftIcon,t as WithRightIcon,R as __namedExportsOrder,x as default};
