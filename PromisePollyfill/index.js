const STATE = {
    FULFILLED: "fulfilled",
    PENDING : "pending",
    REJECTED: "rejected"
}
class MyPromise {

    #value
    #state
    #thenCbs = []; 
    #catchCbs = [];

    #onSuccessBind = this.#onSuccess.bind(this);
    #onFailBind = this.#onFail.bind(this);
    constructor(cb) {
        try {
            cb(this.#onSuccessBind, this.#onFailBind);
        }catch (e) {
            this.#onFail(e);
        }
    }
    #runCallbacks() {
        if (this.#state !== STATE.FULFILLED) {
            this.#thenCbs.forEach((callback) => {
                callback(this.#value)
            })
            this.#thenCbs = []
        }
        if (this.#state != STATE.REJECTED) {
            this.#catchCbs.forEach((callback) => {
                callback(this.#value)
            })
            this.#catchCbs = [];
        }
    }
    #onSuccess(value) {
        queueMicrotask(()=> {
            if (this.#state !== STATE.PENDING) return;
            if (value instanceof MyPromise) {
                value.then(this.#onSuccessBind, this.#onFailBind)
                return;
            }
            this.#value =value;
            this.#state = STATE.FULFILLED;
            this.#runCallbacks();
        })

    }

    #onFail(value){
        queueMicrotask(()=> {
            if (this.#state !== STATE.PENDING) return;
            if (value instanceof MyPromise) {
                value.then(this.#onSuccessBind, this.#onFailBind)
                return;
            }
            if(this.#catchCbs.length ==0 ){
                throw new UncaughtPromiseErr(value);
            }
            this.#value =value;
            this.#state = STATE.REJECTED;
            this.#runCallbacks();
        })
    }

    then(cb, catchCb) {
        return new MyPromise((resolve, reject) => {
            this.#thenCbs.push((result) => {
                if(cb == null) {
                    resolve(result)
                    return;
                }
                try {
                    resolve(cb(result));
                } catch(e) {
                    reject(e)
                }
            })
            this.#catchCbs.push((res) => {
                if (catchCb == null) {
                    reject(res);
                    return;
                }
                try {
                    resolve(catchCb(res));
                }catch(e) {
                    reject(e);
                }
            })
            this.#runCallbacks();
        });
        
    }
    catch(cb) {
        return this.then(undefined, cb);
    }
    finally(cb) {
        return this.then((res)=> {
            cb()
            return res;
        }, (res) => {
            cb()
            throw res;
        })
    }
    static resolve(val) {
        return new MyPromise(resolve => {
            resolve(val)
        })
    }
    static reject(val) {
        return new MyPromise((resolve,reject) => {
            reject(val);
        })
    }
    static all(promiseArr) {
        let results = [];
        let completedPromise = 0;
        return new MyPromise((resolve,reject) => {
            for(let i=0;i<promiseArr.length;i++){
                promiseArr[i].then((res)=> {
                    results[i] = res;
                    completedPromise++;
                    if(completedPromise == promiseArr.length) {
                        resolve(results);
                    }
                })
                .catch(e=>reject(e));
            }
        })
    }
    static allSettled(promiseArr) {
        let result = [];
        let completedPromise = 0;
        return new MyPromise((resolve, reject) => {
            for(let i =0;i<promiseArr.length;i++) {
                promiseArr[i].then((res) => {
                    result[i] = {STATE: STATE.FULFILLED, res}
                }).catch(e => {
                    result[i] = {STATE: STATE.REJECTED, e}
                })
            }
            resolve(result);
        })
    }
    static race(promiseArr) {
        return new MyPromise((resolve, reject) => {
            for(let i=0;i<promiseArr.length;i++){
                promiseArr[i].then((res)=>{
                    resolve(res)
                }).catch(e => reject(e))
            }
        })       
    }
    static any(promiseArr) {
        let completedCount = 0;
        return new MyPromise((resolve,reject) => {
            for(let i=0;i<promiseArr.length;i++) {
                promiseArr[i].then((res) => {
                    resolve(res)
                }).catch((e) => {
                    completedCount++;
                    if(completedCount == promiseArr.length) {
                        reject(e);
                    }
                })
            }
        })
    }
}
class UncaughtPromiseErr extends Error {
    constructor(err) {
        super(err)
        this.stack = `(in promise) ${err.stack}`
    }
}
module.exports = MyPromise;