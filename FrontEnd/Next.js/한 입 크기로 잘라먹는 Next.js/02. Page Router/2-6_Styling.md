# 인라인 스타일 설정

- 스타일을 설정한 태그에 `style`속성을 입력하여 스타일 값을 넣는다.

```ts
<h1 style={{ color: "orange" }}>인덱스</h1>
```

# \_app.tsx만 import문을 통해서 css파일을 불러올 수 있다.

- 별도의 페이지 파일에서 css를 그대로 불러오게 되면 다른 페이지에서 작성된 css와 출돌할 수 있기 때문에 제한하는 것이다.

- app 컴포넌트는 모든 컴포넌트의 부모 컴포넌트이기 때문에 글로벌 css 역할을 할 css 파일을 위해서 예외적으로 허용을 하는 것이다.

# CSS 모듈

- 기존 css파일을 모듈처럼 사용할 수 있도록 도와주는 기능
- css 파일에 작성해둔 클래스 네임이 다른 css 파일과 중복되지 않도록 클래스 이름을 자동으로 유니크란 이름올 파일마다 변환을 시켜주는 기능이다.

1.  css파일의 이름을 '~.module.css'로 설정하고 클래스 마다 스타일을 설정한다.

    - ex. index.module.css

    ```css
    .h1 {
      color: green;
    }
    ```

2.  모듈화된 css 파일을 import로 불러오고 스타일 적용을 원하는 태그에 `className`으로 적용한다.

```ts
import style from "./index.module.css";

export default function Home() {
  return (
    <>
      <h1 className={style.h1}>인덱스</h1>
    </>
  );
}
```

3. 브라우저 개발자모드로 확인하면 임의의 클래스 이름이 붙은 것을 확인할 수 있다.

```html
<h1 class="index_h1__JHo3j">인덱스</h1>
```
