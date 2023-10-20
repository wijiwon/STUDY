const ERC20 = artifacts.require("ERC20");

module.exports = (deployer) => {
  // deploy : 배포할 컨트랙트 인스턴스를 매개변수로 전달
  // 🚀 이전과의 차이점 !
  // deployer.deploy(ERC20); 이렇게 넣는게 아니라
  // truffle 에서 배포할때, 생성자 함수 매개변수를 어떻게 넣어줘야하나 (매개변수가 없으면 터짐!)

  // deploy : 이 메서드에서는 첫번째 매개변수로 인스턴스를 전달했으면
  // 뒤에 매개변수로 순서대로 생성자 함수의 매개변수를 넣어주면된다
  // 토큰이름, 줄임말, 몇개
  deployer.deploy(ERC20, "HeeToken", "HTK", 10000);
};
