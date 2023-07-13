// promise 객체
//비동기 처리를 가능하게 해주는 객체

//nodejs 사용을 많이 할건데
//비동기 처리를 할 때 pomise객체를 사용한다.

function testPromise(num){
    //new 키워드로 빈 객체를 만들고
    //promise 객체를 생성

    //전달하는 함수 값에 resolve , reject 두 가지의 매개변수를 받는데
    // resolve() 함수고 처리가 완료되면 반환
    // reject() 함수고 처리가 오류나면 반환
    return new Promise(function(res, rej){
        try {
            // 2.❗num의 값이 10보다 작으므로 setTimeout 으로 진행
            // 7.❗num의 값이 10보다 크르모 rej의 값인 date를 가지고 진행된다.
            if(num > 10)
            rej({date : "숫자 큼"});        //if문 영역

            //if의 중괄호가 없으면 바로 및 코드까지 조건문 영역
            // console.log(num);
            //데이터를 받아온다고 가정을 하자.
            //데이터를 가져오는 시간이 좀 걸리는데
            //데이터를 다 가져오고 작업을 진행시켜야 할 때.
           
            // 3.❗5초의 시간을 기다리면 15의 결과값이 asyncFun 함수로 반환
            // 8.❗setTimeout을 지나가고 다시 복귀
            setTimeout(function(){
                // res(num);
                res(num + 10);
            },num * 1000)    
        } catch (error) {
            rej(error);
        }
    })
}

testPromise(8).then(function(date){
    //데이터를 가져오고 처리할 구문을 여기에 작성하면 된다.
    //데이터를 가지고 처리해야할 작업
    console.log(date);
    //결과: 8       (8초 뒤) 18

    return testPromise(date);
}).then(function(date){
    console.log(date);
    //성공
    //res를 실행하면 then() 메소드가 실행되고
    //결과: 18

}).catch(function(err){
    console.log(err);
    //실패
    //rej을 실행하면 catch() 메소드가 실행된다.
    //결과:{date: '숫자 큼'}
})


//then이랑 catch를 안쓰면
//async과 await 구문을 사용하면 된다.

//(then, catch)와 (async, await)를 절대로 같이 사용하지 말자.
//promise를 잘 모른다는 뜻이다.
//같이 써도 잘 돌아가긴 하지만 안좋은 버릇이다.

async function asyncFun(){
    //이제 왠만하면 try catch로 작업의 오류를 예외상황을 잡으면서 작업하자.
    try {
        //await뒤에 pormise 객체

        /* 1.❗ await 메소드는 promise가 처리될 때 까지 기다리고 결과값을 
            그 이후에 반환하므로 promise 함수로 올라가 매개변수 num에 5의 값을 대입 */
        let tmep = await testPromise(5);
        //결과: 5 
        //기다리고 promise객체 res나 rej이 처리될 때까지 
        //4.❗ promise함수에서 돌아오고 실행하는 console 값 1을 노출한다.
        console.log(1);
        //결과:(5초 뒤에) 1
        /*5.❗ promise함수에서 리턴받은 tmep 값을 출력. 15가 노출된다.
            (시간이 소요되는 것은 promise 함수를 실행할 때 동작하였으므로
            위에 콘솔과 동일한 시간에 노출이 진행된다.) */
        console.log(tmep);
        //결과:(5초 뒤에) 15
        //6.❗ await 함수가 다시 promise 함수를 실행시켜 현재 값인 15를 가지고 올라간다.
        tmep = await testPromise(tmep);
        console.log(tmep);
        //결과:(5초 뒤에) 15
        //await + promise = promise를 기다리고 resolce값을 반환한다.
        //async await는 짝이다. 같이 써야한다.
        //9.❗error값을 date:'숫자 큼' 으로 받아와 노출한다.
    } catch (error) {
        console.log(error);
    }
}
asyncFun();