"use strict";(self.webpackChunkweather_app=self.webpackChunkweather_app||[]).push([[305],{8305:(A,o,i)=>{i.r(o),i.d(o,{CurrentModule:()=>g});var s=i(6575),a=i(4695),t=i(3845),c=i(1413),d=i(9507);function p(r,m){if(1&r){const e=t.EpF();t.TgZ(0,"tr")(1,"th",5)(2,"div",6),t._uU(3),t.qZA()(),t.TgZ(4,"td",7)(5,"div",6),t._UZ(6,"img",8),t.qZA()(),t.TgZ(7,"td",7)(8,"div",6),t._uU(9),t.qZA()(),t.TgZ(10,"td",7)(11,"div",6),t._uU(12),t.qZA()(),t.TgZ(13,"td",7)(14,"div",6),t._uU(15),t.qZA()(),t.TgZ(16,"td",7)(17,"div",6),t._uU(18),t.qZA()(),t.TgZ(19,"td",7)(20,"div",6),t._uU(21),t.qZA()(),t.TgZ(22,"td",7)(23,"div",6),t._uU(24),t.qZA()(),t.TgZ(25,"td",7)(26,"div",6),t._uU(27),t.qZA()(),t.TgZ(28,"td",7)(29,"div",6),t._uU(30),t.qZA()(),t.TgZ(31,"td",7)(32,"div",6),t._uU(33),t.qZA()(),t.TgZ(34,"td",7)(35,"div",6),t._uU(36),t.qZA()(),t.TgZ(37,"td",9)(38,"div",10)(39,"button",11),t._UZ(40,"i",12),t.qZA(),t.TgZ(41,"button",13),t.NdJ("click",function(){const q=t.CHM(e).index,v=t.oxw();return t.KtG(v.deleteRow(q))}),t._UZ(42,"i",14),t.qZA()()()()}if(2&r){const e=m.$implicit;t.xp6(3),t.Oqu(e.location),t.xp6(3),t.MGl("src","https://openweathermap.org/img/w/",e.weather_icon,".png",t.LSH),t.xp6(3),t.Oqu(e.weather),t.xp6(3),t.Oqu(e.temperature),t.xp6(3),t.Oqu(e.windSpeed),t.xp6(3),t.Oqu(e.cloudness),t.xp6(3),t.Oqu(e.pressure),t.xp6(3),t.Oqu(e.humidity),t.xp6(3),t.Oqu(e.sunrise),t.xp6(3),t.Oqu(e.sunset),t.xp6(3),t.Oqu(e.rain),t.xp6(3),t.Oqu(e.snow)}}const l=[{path:"",component:(()=>{class r{constructor(e){this.service=e}ngOnInit(){this.service.readNavigatorCoords(),this.subscription=this.service.coord$.subscribe({next:e=>{0!==this.service.coord$.getValue().lat&&(console.log(this.service.coord$.getValue()),this.service.getCurrentData())},error:e=>{}})}ngOnDestroy(){this.service.curWeaDatasArr=[],this.subscription.unsubscribe()}deleteRow(e){this.service.curWeaDatasArr.splice(e,1)}static#t=this.\u0275fac=function(n){return new(n||r)(t.Y36(c.P))};static#e=this.\u0275cmp=t.Xpm({type:r,selectors:[["app-current"]],decls:32,vars:1,consts:[[1,"table-responsive"],[1,"table-sm","table-borderles","my-5","equal_col_width"],[1,"opacity-50","bg-light"],["scope","col",1,"align-top"],[4,"ngFor","ngForOf"],["scope","row",1,"transparent"],[1,"box","d-flex","align-items-center","justify-content-center"],[1,"transparent"],["alt","Weather icon",2,"width","4rem",3,"src"],[1,"transparent","align-midle"],["role","group","aria-label","Basic example",1,"btn-group"],["type","button",1,"btn","btn-primary"],[1,"bi","bi-heart"],["type","button",1,"btn","btn-danger",3,"click"],[1,"bi","bi-trash"]],template:function(n,u){1&n&&(t._UZ(0,"app-location-form"),t.TgZ(1,"div",0)(2,"table",1)(3,"thead",2)(4,"tr")(5,"th",3),t._uU(6,"Location"),t.qZA(),t.TgZ(7,"th",3),t._uU(8,"Weather icon"),t.qZA(),t.TgZ(9,"th",3),t._uU(10,"Weather"),t.qZA(),t.TgZ(11,"th",3),t._uU(12,"Temperature [celsius]"),t.qZA(),t.TgZ(13,"th",3),t._uU(14,"Wind speed [meter/sec]"),t.qZA(),t.TgZ(15,"th",3),t._uU(16,"Cloudness [%]"),t.qZA(),t.TgZ(17,"th",3),t._uU(18,"Pressure [hPa]"),t.qZA(),t.TgZ(19,"th",3),t._uU(20,"Humidity [%]"),t.qZA(),t.TgZ(21,"th",3),t._uU(22,"Sunrise [hh:mm]"),t.qZA(),t.TgZ(23,"th",3),t._uU(24,"Sunset [hh:mm]"),t.qZA(),t.TgZ(25,"th",3),t._uU(26,"Rain [mm/1h]"),t.qZA(),t.TgZ(27,"th",3),t._uU(28,"Snow [mm/1h]"),t.qZA(),t._UZ(29,"th",3),t.qZA()(),t.TgZ(30,"tbody"),t.YNc(31,p,43,12,"tr",4),t.qZA()()()),2&n&&(t.xp6(31),t.Q6J("ngForOf",u.service.curWeaDatasArr))},dependencies:[s.sg,d.s],styles:[".equal_col_width[_ngcontent-%COMP%]{table-layout:fixed}.transparent[_ngcontent-%COMP%]{background-color:transparent;padding:.8em}.box[_ngcontent-%COMP%]{border-radius:1em;background-color:#fff;opacity:50%;height:4em;padding:1em}"]})}return r})()}];let h=(()=>{class r{static#t=this.\u0275fac=function(n){return new(n||r)};static#e=this.\u0275mod=t.oAB({type:r});static#r=this.\u0275inj=t.cJS({imports:[a.Bz.forChild(l),a.Bz]})}return r})();var Z=i(6208);let g=(()=>{class r{static#t=this.\u0275fac=function(n){return new(n||r)};static#e=this.\u0275mod=t.oAB({type:r});static#r=this.\u0275inj=t.cJS({imports:[s.ez,h,Z.m]})}return r})()}}]);
//# sourceMappingURL=305.c83ddf76747e0cfb.js.map