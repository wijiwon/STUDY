class App extends React.Component {
  render() {
    return (
      <ul>
        <li>리스트 01</li>
      </ul>
    );
  }
}

// 루트설정
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
