# Next.js

- 기존의 Next는 React `App`과 달리 **파일 시스템 기반의 라우팅**을 지원한다.
  - 디렉토리 구조를 어떻게 짜느냐에 따라 라우팅이 달라진다는 것이다.
- 2022년 10월 25일. Next.js Conf에서 `pages` 디렉토리를 `App`으로 변경한다는 새로운 패러다임 제시.

# App Routing

- 초기에는 'App Directory'라고 불렸다.
- 기존의 페이지 단위의 Hydration을 컴포넌트 단위로 할 수 있게 되었다.
  - 이런 부분적인 Hydration을 `스트리밍 패턴`이라고 부른다.
- 유저가 처음에 받아들여야 하는 리소스의 양이 줄어드는 것이 장점 중 하나.

> **Hydration ?** <br>
> SSR(Server Side Rendering)또는 SSG(Static Site Generation)를 통해 서버에서 미리 생성된 HTML이 브라우저로 전송되고, 이 HTML에 React가 다시 Hydrate 하여 사용자와 상호작용이 가능한 동적 웹 페이지로 만드는 과정이다.
