# 실습 진행

# 1. Pages/index.tsx

- import문 제거
- Home 함수 내부 제거

# 2. Styles/globals.css, Home.module.css

1. globals.css

- 기존에 설정되어 있는 css
- 필요없다면 전부 삭제한다.

2. Home.module.css

- 현재 실습에선 사용하지 않기 때문에 파일을 제거한다.

# 3. Pages 폴더로 페이지 생성해보기

- '~/search' 경로를 설정하는 2가지 방법
  1. Pages 폴더에 'search.tsx' 파일을 생성하여 설정한다.
  2. Pages 폴더에 'search' 폴더를 생성하고 'index.tsx'파일을 생성하여 설정한다.
  - 만약 '~/search/setting' 경로를 설정하고 싶다면 같은 방법으로 search 폴더 하위에 'setting.tsx'파일을 생성하거나 'setting'폴더 안에 'index.tsx'파일을 생성한다.

# 4. 쿼리스트링 설정하기

- 보통 검색페이지의 경우 검색어를 Url에 가져오게 되는 경우가 많은데 이렇게 `?`뒤에 오는 "q=검색어"를 쿼리 스트링이라고 한다.
  - ex. https://~search?q=검색어
- 쿼리 스트링은 페이지 경로 자체에는 영향을 주지 않아 폴더 구조를 변경하지는 않는다.
- 쿼리 스트링의 값을 컴포넌트에서 직접 꺼내어 사용을 하려면 `useRouter`훅을 사용해야 한다.

```ts
import { useRouter } from "next/router";
export default function Page() {
  const router = useRouter();
  console.log(router);

  return <h1>Search</h1>;
}
```

```
Object
    asPath: "/search"
    back: ƒ ()      // 페이지 뒤로가기
    basePath: ""
    beforePopState: ƒ ()
    components: {/search: {…}, /\_app: {…}}
    defaultLocale: undefined
    domainLocales: undefined
    events: {on: ƒ, off: ƒ, emit: ƒ}
    isFallback: false
    isLocaleDomain: false
    isPreview: false
    isReady: true
    locale: undefined
    locales: undefined
    pathname: "/search"
    prefetch: ƒ ()
    push: ƒ ()      // 다른 경로로 이동
    query: {q: '검색어'}    // 쿼리스트링 값
    reload: ƒ ()
    replace: ƒ ()
    route: "/search"
```

# 5. URL 파라미터를 사용하는 동적경로 페이지 생성

- '~/book/1', '~/book/2', ... 의 동적인 경로를 갖는 페이지를 생성하고자 한다.
- 경로에 맞게 'book'폴더를 생성한 뒤 하위 파일로 '[id].tsx'파일을 생성한다.
- 파라미터 값을 사용하기 위해서 `useRouter`훅을 사용한다.

```ts
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>books {id}</h1>;
}
```

- router.query에 파라미터 키가 `id`라고 설정된 이유는 book폴더에 []대괄호 안에 값으로 id라고 설정했기 때문이다. 대괄호 안에 값을 바꾸면 키값도 변경된다.

# 6. URL 파라미터 값을 연속으로 받아오는 동적경로 페이지 생성

- id값이 하나가 아닌 2개 이상의 연속적인 값이 들어오게 되는 경로를 가진 '~/book/12/12/12/12' 페이지를 구현하고자 한다.
- 경로에 맞게 'book'폴더를 생성한 뒤 하위 파일로 '[...id].tsx'파일을 생성한다.
  - 이때 `...`은 경로 뒤에 여러 개의 id가 연달아 들어올 수 있다는 뜻이다.
  - Next.js에서는 모든 경로를 다 잡아채겠다는 뜻에서 'Catch All Segment'라고 부른다.
- 이때, 전달된 여러개의 url 파라미터들은 변수에 배열 형태로 저장된다.

```ts
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  const { id } = router.query;
  console.log(id);

  return <h1>books {id}</h1>;
}
```

```
['12', '12', '12', '12']
```

# 7. 완전히 범용적인 Optional Catch All Segment

- 지금까지 '[id].tsx'나 '[...id].tsx'의 경우 기본 경로 뒤에 동적인 값이 들어가야 대응이 되는 경로이다.
- 만약 '~/book' 경로를 입력하게 되면 404 에러가 뜨게 된다.
- 이런 경우 이전에 설정했던 대로 'index.tsx' 파일을 추가하면 되지만, 만약 id.tsx 파일로 사용하고 싶다면
- '[[...id]].tsx'로 생성하면 완전히 범용적인 페이지로 사용이 가능하며 'Optional Catch All Segment'라고 한다.

# 8. 404 Not Found 페이지 설정하기

- 존재하지 않는 페이지 경로를 입력했을 때 보여줄 404 페이지를 설정하는 방법
- 'Pages' 폴더 안에 '404.tsx'를 생성하여 설정하면 된다.
