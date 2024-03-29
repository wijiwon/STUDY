# This

- `thisBinding`은 실행 컨텍스트가 활성화되는 순간에 this를 바인딩 하는 것을 말한다.
  - 따라서 this는 함수가 호출될 때 결정된다.
  - 해당 함수의 호출 방식에 따라 this의 값이 달라지게 된다.

## 전역 공간에서의 This

- 전역공간에서의 this는 전역 객체를 가리킨다.**(무조건이다. 암기)**
  - 개념상 전역 컨텍스트를 실행하는 주체가 전역 객체이기 때문이다.
  - 전역 객체는 `호스트 객체`라고도 하는데, 자바스크립트의 런타임 환경에 따라 전역객체의 정보가 달라진다.
- 브라우저에서는 `window`, 노드JS에서는 `global`을 가리킨다.

## 함수 호출 시의 This

- 함수를 호출 할때도 this는 전역 객체를 가리킨다.

### 예시 1

```js
function a() {
  console.log(this);
}
a();
```

함수 a를 전역 공간에서 호출했으므로 this는 `전역객체`를 가리킨다.

---

### 예시 2

```js
function b() {
  function c() {
    cnosole.log(this);
  }
  c();
}
b();
```

함수 b에 대해서는 전역 공간에서 호출했으니 this가 전역 객체를 가리키지만, 함수 c는 함수 b에서 호출했으니 함수 b를 this로 가리킬 것이라고 생각하지만, 실제로는 `전역객체`를 가리킨다.

> **화살표 함수(arrow function)**<br>
> ES6 문법에서 나온 것으로, 화살표 함수는 `thisBinding`이 일어나지 않으므로 상위 컨텍스트에 있는 this를 그대로 사용한다.
>
> ```js
> var a = 10;
> var obj = {
>   a: 20,
>   b: function () {
>     console.log(this.a); // 출력값: 20
>
>     const c = () => {
>       console.log(this.a); // 출력값: 20
>     };
>     c();
>   },
> };
> obj.b();
> ```

---

### 예시 3

```js
var d = {
  e: function () {
    function f() {
      console.log(this);
    }
    f();
  },
};
d.e();
```

객체 d 안에 e 라는 메소드가 있다. `d.e()`를 통해 메소드 호출을 하면 메소드 안에 있는 this가 호출한 대상을 바인딩 할 것으로 보이지만, 여기서는 `console.log(this)`가 담긴 함수 f를 `f()`로 호출하였으므로 this를 호출하는 방식이 함수 호출 방식이라 `전역객체`가 출력된다.

## 메서드 호출 시의 This

- 메소드를 호출한 주체가 this가 된다. (메소드 명의 .바로 앞에)

### 예시 1

```js
var a = {
  b: function () {
    console.log(this);
  },
};
a.b();
```

해당 경우에는 메소드 b를 호출한 `a`가 this가 되는 것이다.

```
🤷‍♀️
method는 객체지향 언어에서 어떤 인스턴스와 관련된 동작을 의미하고, 인스턴스는 어떤 클래스에 속하는 객체를 말한다.
자바스크립트에서는 클래스의 여부와 상관없이 객체와 관련된 동작이면 method로 인식한다.
그래서 이 예제에서도 b는 함수이지만 객체와 관련된 동작을 하므로 메소드로 인식하는 것이다.
```

---

### 예시 2

```js
var a = {
  b: {
    c: function () {
      console.log(this);
    },
  },
};
a.b.c();
```

헤당 경우에는 c라는 메소드를 호출한 `a.b`가 this가 된다.

---

그렇다고 해서 `.`만 찾으면 안된다.

### 대괄호 표기법에서의 this

```js
obj.func();
obj["func"]();
```

=> `obj`가 this이다.

```js
person.info.getName();
person.info["getName"]();
```

=> `person.info`가 this이다.

```js
person["info"].getName();
person["info"]["getName"]();
```

=> `person.info`가 this이다.

### 메서드 내부 함수에서의 우회법

```js
var a = 10;
var obj = {
  a: 20,
  b: function () {
    console.log(this.a); // 1

    function c() {
      console.log(this.a); // 2
    }
    c();
  },
};
obj.b();
```

해당 코드를 살펴보면 `obj.b()`로 실행된 1번 콘솔의 this는 `obj`를 가리킬 것이고 출력 값은 `20`이 될 것이다. `c()`로 호출한 2번 콘솔의 this는 `전역객체`를 가리키게 되고 `window.a`와 동일하므로 전역 변수 a의 값인 `10`이 출력될 것이다.

---

this를 우회하려면 `call`, `apply`, `bind` 같은 this바인딩 명령어를 사용하는 방법으로 this 자체에 직접 다른 값으로 덮을 수 있는 방법과 아예 다른 변수를 사용하는 방법이 있다.

### 우회법 1. 변수 사용

```js
var a = 10;
var obj = {
  a: 20,
  b: function () {
    var self = this;
    console.log(this.a); // 1

    function c() {
      console.log(self.a); // 2
    }
    c();
  },
};
obj.b();
```

내부 함수 c 보다 상위에서 self라는 변수에 this를 담고 내부 함수에서 `self.a`를 사용하게 되면 내부함수 자신의 스코프에서 self를 찾고 없으면 상위 스코프로 가게 될 것이다. b함수에서 self를 찾아 해당 스코프의 this값을 갖고 있을 것이기 때문에 `obj.a`의 값이 출력된다.

---

### 우회법 2. thisbinding 명령어

```js
var a = 10;
var obj = {
  a: 20,
  b: function () {
    console.log(this.a); // 1

    function c() {
      console.log(this.a); // 2
    }
    c.call(this);
  },
};
obj.b();
```

`obj.b()`는 `obj`를 this로 출력하므로 1번 콘솔은 `obj.a`의 값인 `20`이 출력된더.
`c.call(this)`에서 `.call()`는 메소드의 첫 번째 인자로 전달받은 값을 this로 지정해 함수를 호출하게 한다. 따라서 b함수 내에서 `c.call(this)`이 호출되었으므로, b함수의 this인 obj가 전달되어 2번째 콘솔에서는 `obj.a`의 값인 `20`이 출력된다.

## callback 호출 시의 This

---

### call, apply, bind 부터 살펴보자!

```js
function a(x, y, z) {
  console.log(this, x, y, z);
}
var b = {
  bb: "bbb",
};

a.call(b, 1, 2, 3); // 1

a.apply(b, [1, 2, 3]); // 2

var c = a.bind(b);
c(1, 2, 3); // 3

var d = a.bind(b, 1, 2);
d(3); // 4
```

```bash
# 1, 2, 3, 4의 출력값
{bb: 'bbb'} 1 2 3
```

먼저, call, apply, bind 의 API 문서는 다음과 같다.

```js
func.call(thisArg[, arg1[, arg2[, ...]]])
func.apply(thisArg, [argsArray])
func.bind(thisArg[, arg1[, arg2[, ...]]])
// 첫 번째 인자인 'thisArg'는 필수 매개변수로 this를 직접적으로 명시한다. 대괄호는 생략가능하다.
```

- `a.call(b, 1, 2, 3);`
  - call 메소드는 첫 번째 인자로 this 값을 설정하고, 이후 인자들은 호출한 함수의 인자값으로 전달되므로 x, y, z에 1, 2, 3을 전달하게 된다.
- `a.apply(b, [1, 2, 3]);`
  - apply 메소드는 첫 번째 인자로 this 값을 설정하고, 두 번째 인자로 배열을 받아 해당 배열의 요소들을 함수의 인자로 전달한다.
- `var c = a.bind(b); c(1, 2, 3);`
  - bind 메소드는 함수의 this 값을 변경한 새로운 함수를 생성한다.
  - `var c = a.bind(b);`는 함수 a의 this를 `b`로 설정한 새로운 함수 c를 생성한다.
  - `c(1, 2, 3);`는 이미 b로 바인딩된 함수 c에 인자로 1, 2, 3을 전달한다.
- `var d = a.bind(b, 1, 2); d(3);`
  - `var d = a.bind(b, 1, 2);`는 함수 a의 this를 `b`로 설정하고 x, y의 인자를 1, 2로 전달한 새로운 함수 d를 생성한다.
  - `d(3);`는 이미 적용된 함수 d의 마지막 인자에 3을 전달한다.

---

### callback 함수에서의 this

#### 예시 1.

```js
var callback = function () {
  console.dir(this);
};

var obj = {
  a: 1,
  b: function (cd) {
    cd();
  },
};
obj.b(callback);
```

`obj.b(callback)`에서 obj객체 안에 b메서드가 존재하고 이 메서드에 callback 함수를 인수로 넘겨주었다. b 메서드에서 넘겨받은 callback 함수가 실행되고, 콘솔로 this를 출력했을 때, this의 값은 `전역객체`가 나오게 된다. this를 출력하는 실행문이 함수로서 호출되었기 때문이다.

그렇다면,

```js
var callback = function () {
  console.dir(this);
};

var obj = {
  a: 1,
  b: function (cd) {
    cd.call(this);
  },
};
obj.b(callback);
```

해당 경우의 this는 `obj`가 된다.<br>
따라서, 콜백 함수 내부에서의 this는 콜백 함수를 넘겨 받는 대상(여기서는 'cd')이 어떻게 처리하느냐에 따라 달라질 수 있다.

---

#### 예시 2.

```js
var callback = function () {
  console.dir(this);
};
var obj = {
  a: 1,
};
setTimeout(callback, 100);
```

setTimeout은 두 번째 인자로 받은 시간 뒤에 첫 번째 인자를 실행한다. 이 경우에는 **setTimeout은 this를 별도로 처리하고 있지 않아서** this는 `전역객체`가 나오게된다.<br>
this를 원하는 값으로 지정하려면 `setTimeout(callback.bind(obj), 100)`으로 설정해주면 this 값이 `obj`로 설정될 것이다.
<br>
<br>
<br>

```js
document.body.innerHTML += '<div id='a'>클릭하세요</div>';

document.getElementById('a').addEventListener(
    'click',
    function(){
        console.dir(this);
    }
)
```

id 값이 a인 '클릭하세요' 버튼을 클릭하면 실행되는 함수에서 this의 값은 `addEventListener`에서 별도로 지정된 것이 없다면 '전역객체'가 나와야한다. <br>
하지만, `addEventListener`라는 이벤트 함수는 콜백 함수를 처리할 때 이벤트가 발생한 타겟 대상을 가리키도록 정의가 되어 있기 때문에 해당 코드의 this에서는 `HTML DOM Element`를 가리킨다.
<br>
<br>만약, this를 `obj`로 바꾸고 싶다면,

```js
document.body.innerHTML += '<div id='a'>클릭하세요</div>';

var obj = { a : 1 };

document.getElementById('a').addEventListener(
    'click',
    function(){
        console.dir(this);
    }.bind(obj)
)
```

로 `.bind` 메소드를 이용하여 변경해줄 수 있다.
<br>
<br>

정리하면,

- 기본적으로는 **함수**의 this와 같다.
- **제어권을 가진 함수**가 콜백의 **this를 지정**해둔 경우도 있다.
- 이 경우에도 **개발자가 this를 바인딩**해서 콜백을 넘기면 그에 따른다.

## 생성자 함수(new) 호출 시의 This

- New 연산자를 사용했다는 것은 생성자 함수를 바탕으로 인스턴스 객체를 만들었다는 것이다.
- 이 경우에는 `새로 만들 인스턴스 객체`가 곧 this가 된다.

```js
function Person(n, a) {
  this.name = n;
  this.age = a;
}

var roy = Person("지원", 27);
console.log(window.name, window.age);

// 출력값 : 지원 27
```

new 연산자 없이 Person 함수를 호출할 경우에 roy에는 아무것도 담기지 않게된다. 따라서 this는 `전역객체`를 가리키게 되고 `window.name`, `window.age`의 값이 '지원 27'으로 출력되는 것이다.
<br>

하지만 new 연산자를 사용하게 되면,

```js
function Person(n, a) {
  this.name = n;
  this.age = a;
}

var roy = new Person("지원", 27);
console.log(roy);

// 출력값 : {name: '지원', age: 27}
```

변수 roy에 새로 생성될 Person의 인스턴스 객체의 this가 자기 자신이 되므로 this.name에 '지원', this.age에 27이 들어가있는 객체가 roy에 담기게 되는 것이다.
