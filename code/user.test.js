"use strict";const{app:app,assert:assert}=require("egg-mock/bootstrap");describe("用户服务测试",()=>{let e;before(()=>{(e=app.mockContext({user:{name:"your-name"}})).request.headers={authorization:yourToken}}),it("create 方法返回新增用户成功信息",async()=>{const a={name:"user name"+Date.now(),age:parseInt(60*Math.random()),gender:Math.random()>.5?"male":"female"},r=await e.service.user.create(a);assert(!0===r.success),assert(r.payload.length>0)})});