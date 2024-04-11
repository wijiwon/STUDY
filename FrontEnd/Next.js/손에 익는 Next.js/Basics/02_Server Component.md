# Server Component

- React Server Component(RSC)
- React 18에서 도입된 기술
- App Router가 기존 방식과 다르게 컴포넌트 단위로 Hydration이 가능해졌는데, 이를 가능하게 만든 기술 중 하나가 `서버 컴포넌트`이다.

## 서버 컴포넌트의 장점

- 데이터 페칭 : 서버에서 데이터를 직접 가져올 수 있어 데이터 페칭이 빠르다.
- 보안 : 민감한 정보를 서버에서 직접 데이터를 처리함으로써 중요한 데이터가 클라이언트 측 코드에 노출되지 않는다.
- 캐싱 : 자주 요청되는 정보를 서버에서 캐시 하면 만들어진 결과를 내려주면 되어 이후 요청에 대해 빠르게 응답할 수 있다.
- **자바스크립트 번들 크기 감소** - 서버에서 렌더링까지 완료된 컴포넌트를 내려주기 때문에 자바스크립트 파일이 줄어들게 된다.

## 서버 컴포넌트를 사용할 수 없는 경우

- 서버 컴포넌트의 이점이 많다고 느낄 수 있지만, 항상 서버 컴포넌트만 사용할 수는 없다.
- 서버 컴포넌트에서는 hook, EventListener를 사용할 수 없다.

  - 사용하기 위해서는 '클라이언트 컴포넌트'를 사용해야 한다.

- 때문에, **Next.js에서는 클라이언트 컴포넌트를 트리의 가장 밑단에서 사용하길 권장한다.**

    <br>
    <br>
    <br>

---

  <br>
  <br>
  
# Client Component

- 서버 컴포넌트와 다른 방식의 컴포넌트, 기존 방식의 컴포넌트를 `클라이언트 컴포넌트`라고 부른다.
- Next 13에서의 기본은 **서버 컴포넌트**이다.
- 클라이언트 컴포넌트를 사용하기 위해서 상단에 `use Client`라고 명시해 줘야 한다.

  ```js
  "use Client";

  import { useState } from "react";

  export default function Counter() {
    const [count, setCount] = useState(0);

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    );
  }
  ```

## 서버 컴포넌트 활용 패턴

- '클라이언트 컴포넌트'에서 '서버 컴포넌트'를 사용하고 싶을 땐 `props`로 넘겨줘야 한다.

  - '클라이언트 컴포넌트'에서 '서버 컴포넌트'를 `import`**할 수 없기 때문이다.**

  ```js
  "use Client";

  import { useState } from "react";

  export default function ExampleClientComponent({
    children, // 서버 컴포넌트를 자식 요소로 전달할 수 있습니다.
  }: {
    children: React.ReactNode,
  }) {
    const [count, setCount] = useState(0);

    return (
      <>
        <button onClick={() => setCount(count + 1)}>{count}</button>
        {children}
      </>
    );
  }
  ```

- 기존의 Next.js에서 제공하던 대로 Pre-rendering 방식으로 여전히 렌더링이 가능하다.
  - 클라이언트 컴포넌트라고 해서 클라이언트에서만 렌더링 되는 컴포넌트가 아니다.
  - SSR, SSG 방식의 렌더링이 가능하다. 즉, 서버에서 컴포넌트를 미리 렌더링 해둘 수 있다는 것이다.

<br>
<br>
<br>

---

<br>
<br>

# 서버 컴포넌트와 클라이언트 컴포넌트를 사용해야 하는 경우

| 원하는 것                                                | 서버 컴포넌트 | 클라이언트 컴포넌트 |
| :------------------------------------------------------- | :-----------: | :-----------------: |
| 데이터 가져오기                                          |      ⭕️      |         ✖️          |
| 백엔드 리소스에 직접 접근하기                            |      ⭕️      |         ✖️          |
| 민감한 정보를 서버에 보관할 때 (AccessToken, API Key 등) |      ⭕️      |         ✖️          |
| Javascript 리소스 줄이기                                 |      ⭕️      |         ✖️          |
| 상호작용 및 이벤트 리스너(`onClick`, `onChange` 등) 사용 |      ✖️       |         ⭕️         |
| 상태 및 생애 주기 관리(`useState`, `useEffect` 등)       |      ✖️       |         ⭕️         |
| 브라우저 API 사용                                        |      ✖️       |         ⭕️         |
| React 클래스 컴포넌트 사용                               |      ✖️       |         ⭕️         |
