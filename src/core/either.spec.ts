import { Either, left, right } from "./either"

function doSomething(shouldSuccess: boolean): Either<string, number> {
    if (shouldSuccess) {
        return right(10)
    } else {
        return left('error')
    }
}

test('success result', () => {
    const successResult = doSomething(true);

    if(successResult.isRight()){
        console.log(successResult.value)
    }

    expect(successResult.isRight()).toBe(true);
    expect(successResult.isLeft()).toBe(false);
})

test('error result', () => {
    const result = left('error')

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    
})