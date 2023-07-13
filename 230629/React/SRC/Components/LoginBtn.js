// ES6 문법을 사용
// 이전에는 require로 모듈을 가져왔었는데 ES6로 변하면서 import가 생겼다.

class LoginBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    return (
      <button
        onClick={() => {
          this.setState({ isLogin: !this.state.isLogin });
        }}
      >
        {this.state.isLogin ? "Logout" : "Login"}
      </button>
    );
  }
}

// node.js에서는 module.exports를 했었는데
// 내보낼 컴포넌트가 여러개일 경우
// export {LoginBtn, LoginBtn2}

// 단일(한 개만) 내보낼 경우
export default LoginBtn;
