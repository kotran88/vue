var result_array = [];
var result = localStorage[0];
var count = 0;

// 기존 로직을 함수 단위로 재구성
function initTodoItems() {
  if (localStorage.getItem("count") == null) {
    localStorage.setItem("count", 0)
  }
  console.log("local nono? :" + localStorage.getItem("count"));
  fetchLocalStorageItems();
}

function fetchLocalStorageItems() {
  for (var i = 1; i < localStorage.length; i++) {
    result_array.push(localStorage.getItem(i))
  }
}

// Localstorage 초기화 및 아이템 조회
initTodoItems();

var todo = new Vue({
  el: '#todo',
  // Vue 로 표현할 컴포넌트의 HTML 요소들은 가급적 Vue 인스턴스 안의 template 에 넣어주세요.
  template: `<span><input type="text" v-model="message" placeholder="input me" name="input_todo"><button v-on:click="addTodoItem(count);">전송</button>
  <span>count : {{count}}</span>
  <p>{{test}}</p>
  <ul>
    <template v-for="item in todoArr">
      <transition name="fade">

      <li><p>{{item}}</p>  <button v-on:click="deleteTodoItem(item);"> 삭제</button></li>
    </transition>
    </template>
  </ul></span>`,
  data: {
    message: '',
    count: localStorage.getItem("count"),
    test: result,
    todoArr: result_array,

    // methods 의 각 클릭 이벤트 메서드에서 사용한 임시 변수는 가급적
    // data 에 선언하셔서 사용하시는 게 코드 가독성 측면에서 좋을 것 같다는 생각이 듭니다.
    // ...
    // 흔히 알려진 객체 지향 프로그래밍 (Object Oriented Programming) 패턴 중에
    // "1 개의 함수에서는 1 개의 기능만 해야 된다" 라는 Single Responsibility Principle 이라는 개념이 있는데,
    // 클릭 메서드 안에 클릭 메서드와 연관이 없는 라인들이 들어가면
    // 코드를 짜는 사람은 모르지만, 읽는 사람 입장에서는 가독성이 조금 떨어질 수가 있거든요 :)
    // ...
    // 링크 아래에 공유해드리니 한번 읽어보세요 :)
    // https://www.google.co.kr/search?q=design+pattern+single+responsibility&oq=design+pattern+single+&aqs=chrome.1.69i57j0l5.6925j0j1&sourceid=chrome&ie=UTF-8
    testObject: {
      'one': 1,
      'two': 2,
      'three': 3
    }
  },
  computed: {
    counter: function() {
      return this.count + 1;
    }
  },
  methods: {
    addTodoItem() {
      this.count = parseInt(this.count) + 1;
      result_array.push(todo.message);
      localStorage.setItem(this.count, todo.message);
      // 아이템 추가 후 form clear
      this.message = '';

      // // Access some stored data
      // console.log( "username = " + localStorage.getItem("list"));
      // var result=JSON.parse(localStorage.getItem("list"))
      // console.log(result);
      // console.log(result.text);
    },
    deleteTodoItem(item) {

      // 일단 Localstorage 를 저장하실 때 key 에 아이템 갯수를 의미하는 count 를 넣으시고,
      // 입력된 텍스트를 value 로 가져가신 건 정말 좋은 생각인거 같습니다.

      // 다만 아래와 같이 해당 localStorage 의 값들을 지우는 과정에서
      // 불필요한 중복 for 문을 이용하지 않고도,
      // 1) 수업시간에 일러드렸던 v-for 사용시에 나오는 index 사용
      // 2) key & value 를 다시 한번 고민해서 반복 for 문이 나오지 않게 재정의

      // 위와 같이 2가지 방법으로 아래의 로직을 간단히 단순화 할 수 있습니다 :)

      // 또한 마지막으로, javascript 같은 경우에는 이미 기존에 내장된
      // for in, for each 와 같은 객체, 배열 순회 API 가 많으므로,
      // 가급적 그걸 활용하시면 훨씬 빠르게 코딩이 가능할 것 같아요 :)

      // 불금에 정말 고생 많이하셨어요 평두님..!!
      // 목요일에 todo 나머지 내용 마무리 짓고,
      // 수업 내용을 토대로 앞으로는 더 vue.js 를 이해한 상태에서
      // 앱을 구현하실 수 있기를 바랍니다 :)

      for (var i = 1; i < 10; i++) {
        if (localStorage.getItem(i) == item) {
          localStorage.removeItem(i);
          for (var j = 0; j < result_array.length; j++) {
            if (result_array[j] == item) {
              var deleteCount = localStorage.getItem("count");
              var resultCount = (parseInt(deleteCount) - 1);
              localStorage.setItem("count", resultCount);
              result_array.splice(j, 1);
            }
          }
        }
      }
    }
  }
});
