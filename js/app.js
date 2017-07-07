var Login = {
  template: `
    <div>
      Login Section
      <router-view></router-view>
    </div>
  `,
};
var LoginForm = {
  template: `
    <form action="/" method="post">
      <div>
          <label for="account">E-mail : </label>
          <input type="email" id="account">
      </div>
      <div>
          <label for="password">Password : </label>
          <input type="password" id="password">
      </div>
    </form>
  `,
};
var List = {
  template: `
    <div>
      List Section
      <router-view></router-view>
    </div>
  `,
};
var ListItems = {
  template: `
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  `,
};
var Main={
  template:'<h3>this is main  <router-view></router-view></h3>'
}

var MainItems={
  template: `
    <ul>
      <li>Main 1</li>
      <li>Main 2</li>
      <li>Main 3</li>
    </ul>
  `,
}
// 할일 #2
// Main 컴포넌트와 그 하위 컴포넌트를 아래 등록해보세요.

var routes = [
  {
    path: '/login',
    component: Login,
    children: [
      { path: '', component: LoginForm }
    ]
  },
  {
    path: '/list',
    component: List,
    children: [
      { path: '', component: ListItems }
    ]
  },
  {
    path:'/',
    component:Main,
    children: [
      { path: '', component: MainItems }
    ]
  }
  // 할일 #1
  // `/main` URL 에서 동작할 라우터를 하나 등록하고,
  // 해당 라우터에서 동작할 Main 컴포넌트와 하위 컴포넌트를 생성하여 등록합니다.
];

var router = new VueRouter({
  routes
});

var app = new Vue({
  router
}).$mount('#app');
var result=localStorage[0];
var result_array=[];
for(var i=1; i<localStorage.length; i++){
  result_array.push(localStorage.getItem(i))
}
console.log("local nono? :"+localStorage.getItem("count"))
if(localStorage.getItem("count")==null){

  localStorage.setItem("count",0)
}
var todo = new Vue({
  el: '#todo',
  data: {
    message : 'Hello Vue.js',
    // 할일 #4
    // 새로운 데이터 속성을 1개 추가하고, data bindings 를 이용하여 화면에 표시해보세요.
    count:localStorage.getItem("count"),
    uid: '10',
    // 할일 #3
    test:result,
    // uid 를 변경하고 해당 uid 의 변경 여부를 화면 요소 검사로 확인해보세요.
    shown:result_array,
    flag: true
    // 할일 #2
    // 위 flag 값을 false 로 변경하였을 때 화면에 어떤 영향을 주는지 확인해보세요.
  },
  computed:{
    counter : function(){
      return this.count+1;
    }
  },
  methods: {
    clickBtn() {
      var testObject = { 'one': 1, 'two': 2, 'three': 3 };
      this.count=parseInt(this.count)+1;
      result_array.push(todo.message);
      localStorage.setItem("count",this.count)
      var newList={'text':todo.message,'index':this.count}
      localStorage.setItem(this.count,todo.message);
// // Access some stored data
// console.log( "username = " + localStorage.getItem("list"));
// var result=JSON.parse(localStorage.getItem("list"))
// console.log(result);
// console.log(result.text);

    },
    deleteBtn(ss){

      for(var i=1; i<10; i++){
        if(localStorage.getItem(i)==ss){
          localStorage.removeItem(i);
          for(var j=0; j<result_array.length; j++){
            if(result_array[j]==ss){
              var deleteCount=localStorage.getItem("count");
              var resultCount=(parseInt(deleteCount)-1);
              localStorage.setItem("count",resultCount);
              result_array.splice(j,1);
            }
          }
        }
      }
    }
    // 할일 #1
    // eventMethod 를 하나 추가하고 template 에서 해당 이벤트를 실행할 수 있는 button 을 하나 추가하세요.
  }
});
