/**
 * 为了不用在每一次发起网络请求的时候都去处理各种异常情况，
 * 将所有的异常情况都在工具js中进行统一的处理，这里对axios进行了简单的封装
 * @param url
 * @param param
 * @param success
 * @param error
 * @returns {Promise<any>} 处理业务上的逻辑,code=0 和code !=0的情况,catch就捕获异常
 */
function getReq(url, param, success, error) {
    if (!url) {
        console.error("请设置URL");
        return;
    }
    let _param = param || {};
    let _success = success || function (res) {
        console.log(res);
    };
    let _error = error || function (res) {
        alert(res.data.message);
        console.error(res);
    };
    return new Promise((resolve, reject) => {
        console.log(_param);
        axios.get(url, {params: _param}).then((res) => {
            if (res.data.code === 0) {
                _success(res);
            } else {
                _error(res);
            }
            resolve(res.data);

        }).catch((err) => {
            console.error(err);
            reject(err);
            alert("请求出错");
        })
    })


}

function postReq(url, param, success, error) {
    if (!url) {
        console.error("请设置URL");
        return;
    }
    let _param = param || {};
    let _success = success || function (res) {
        console.log(res);
    };
    let _error = error || function (res) {
        alert(res.data.message);
        console.error(res);
    };
    return new Promise((resolve, reject) => {
        axios.post(url, _param).then((res) => {
            if (res.data.code === 0) {
                _success(res);
            } else {
                _error(res);
            }
            resolve(res.data);

        }).catch((err) => {
            console.error(err);
            reject(err);
            alert("请求出错");
        })
    })
}

function deleteReq(url, param, success, error) {
    if (!url) {
        console.error("请设置URL");
        return;
    }
    let _param = param || {};
    let _success = success || function (res) {
        console.log(res);
    };
    let _error = error || function (res) {
        alert(res.data.message);
        console.error(res);
    };
    return new Promise((resolve, reject) => {
        axios.delete(url, _param).then((res) => {
            if (res.data.code === 0) {
                _success(res);
            } else {
                _error(res);
            }
            resolve(res.data);

        }).catch((err) => {
            console.error(err);
            reject(err);
            alert("请求出错");
        })
    })
}

function putReq(url, param, success, error) {
    if (!url) {
        console.error("请设置URL");
        return;
    }
    let _param = param || {};
    let _success = success || function (res) {
        console.log(res);
    };
    let _error = error || function (res) {
        alert(res.data.message);
        console.error(res);
    };
    return new Promise((resolve, reject) => {
        axios.delete(url, _param).then((res) => {
            if (res.data.code === 0) {
                _success(res);
            } else {
                _error(res);
            }
            resolve(res.data);

        }).catch((err) => {
            console.error(err);
            reject(err);
            alert("请求出错");
        })
    })
}