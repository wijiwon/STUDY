const ERC20 = artifacts.require("ERC20");

module.exports = (deployer) => {
    // deploy 배포할 컨트랙트 인스턴스를 매개변수로 전달할 것
    // truffle에서 배포할 때 생성자 함수 매개변수를 어떻게 넣어줘야함
    // deploy 메서드에서는 첫번째 매개변수로 인스턴스를 전달했으면
    // 뒤에 매개변수로 순서대로 생성자 함수의 매개변수를 넣어주면 됨
    deployer.deploy(ERC20, "SoonToken", "STK", 10000);
}