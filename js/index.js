window.onload = function () {
    initSwiper();
};

function initSwiper() {
    new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
        pagination: { // 如果需要分页器
            el: '.swiper-pagination',
            type: 'custom',
            clickable: true,
            renderCustom: function (swiper, current, total) {
                let customPaginationHtml = "";
                for (let i = 0; i < total; i++) {
                    //判断哪个分页器此刻应该被激活
                    if (i === (current - 1)) {
                        customPaginationHtml += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
                    } else {
                        customPaginationHtml += '<span class="swiper-pagination-customs"></span>';
                    }
                }
                return customPaginationHtml;
            }
        }
    });
}

function loadRelativeWebsite() {
    let _this = this;
    axios.get('./data.json')
        .then((res)=>{
            let data = res.data.relativeWebsites;
            if(data.code === 0) {
                _this.relativeWebsites = data.data;
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
            alert("请求出错");
        });
}

//倒计时
function created() {
    let _this = this;
    // 更新本地存储的服务器时间，不再向服务器发送获取时间请求
    setInterval(() => {
        _this.serverTime += 1000;
    }, 1000);

    $(document).bind("click", function (e) {// 鼠标点击空白处，隐藏搜索input　　　
        let target = $(e.target);
        if (target.closest(".toggle-search").length === 0) {
            _this.searchFlag = false;
        }
    });

    this.loadRelativeWebsite();

}


//搜过框
function initSearchBox() {

}

function mounted() {

}

const app = new Vue({
    el: '#app',
    data: {
        searchFlag: false,
        headSearchTxt: '',
        searchParam: {
            searchTxt: ''
        },
        serverTime: 1542942519745, // 异步请求获取服务器时间
        relativeWebsites: [],
        items: [{
            id: '1',
            title: '广东省广播电视网络股份有限公司清远分公司全市光纤、同轴电缆',
            buyUnit: '广东省广播电视网络股份有限公司',
            publishTime: '2018-11-06 18：15：17',
            endTime: 1542942529745,
            buttonType: '即将开始',
            status: 0
        },
            {
                id: '2',
                title: '广东省广播电视网络股份有限公司清远分公司全市光纤、同轴电缆',
                buyUnit: '广东省广播电视网络股份有限公司',
                publishTime: '2018-11-06 18：15：17',
                endTime: 1542977959654,
                buttonType: '已结束',
                status: 2
            },
            {
                id: '3',
                title: '广东省广播电视网络股份有限公司清远分公司全市光纤、同轴电缆',
                buyUnit: '广东省广播电视网络股份有限公司',
                publishTime: '2018-11-06 18：15：17',
                endTime: 1542946969654,
                buttonType: '正在进行',
                status: 1
            },
            {
                id: '4',
                title: '广东省广播电视网络股份有限公司清远分公司全市光纤、同轴电缆',
                buyUnit: '广东省广播电视网络股份有限公司',
                publishTime: '2018-11-06 18：15：17',
                endTime: 1542947959654,
                buttonType: '点击查看',
                status: 3
            },
            {
                id: '5',
                title: '广东省广播电视网络股份有限公司清远分公司全市光纤、同轴电缆',
                buyUnit: '广东省广播电视网络股份有限公司',
                publishTime: '2018-11-06 18：15：17',
                endTime: 1542947959654,
                buttonType: '即将开始',
                status: 0

            },
            {
                id: '6',
                title: '广东省广播电视网络股份有限公司清远分公司全市光纤、同轴电缆',
                buyUnit: '广东省广播电视网络股份有限公司',
                publishTime: '2018-11-06 18：15：17',
                endTime: 1542947959654,
                buttonType: '即将开始',
                status: 0

            },
            {
                id: '7',
                title: '广东省广播电视网络股份有限公司清远分公司全市光纤、同轴电缆',
                buyUnit: '广东省广播电视网络股份有限公司',
                publishTime: '2018-11-06 18：15：17',
                endTime: 1542947959654,
                buttonType: '点击查看',
                status: 3
            },
            {
                id: '8',
                title: '广东省广播电视网络股份有限公司清远分公司全市光纤、同轴电缆',
                buyUnit: '广东省广播电视网络股份有限公司',
                publishTime: '2018-11-06 18：15：17',
                endTime: 1542947959654,
                buttonType: '即将开始',
                status: 0
            },
            {
                id: '9',
                title: '广东省广播电视网络股份有限公司清远分公司全市光纤、同轴电缆',
                buyUnit: '广东省广播电视网络股份有限公司',
                publishTime: '2018-11-06 18：15：17',
                endTime: 1542949959654,
                buttonType: '正在进行',
                status: 3
            }],
        left: [],

    },
    watch: {
        serverTime: function () {
            let lf = [];
            for (let i = 0; i < this.items.length; i++) {
                let item = {};
                item.id = this.items[i].id;
                item.left = this.items[i].endTime - this.serverTime;
                lf[i] = item;
            }
            this.left = lf;
        }
    },
    methods: {
        loadRelativeWebsite,
        getDays: function (millis) { // 1min = 60000ms, 1h = 3600000ms
            return parseInt(millis / 86400000);
        },
        getHours: function (millis) { // 1min = 60000ms, 1h = 3600000ms
            return parseInt(millis / 3600000);
        },
        getMinutes: function (millis) {
            return parseInt(millis % 3600000 / 60000);
        },
        getSeconds: function (millis) {
            return parseInt(millis % 3600000 % 60000 / 1000);
        },
        formatNum: function (time, length) { // 指定数字长度，长度不足前面补0
            let len = length || 2; // 如果不传length，默认设置为2
            let str = time.toString();
            let preStr = '';
            let preLen = len - str.length;
            for (let i = 0; i < preLen; i++) {
                preStr += '0';
            }
            let tmpStr = preStr + str;
            let html = '';
            for (let i = 0; i < tmpStr.length; i++) {
                let clazz = 'time';
                if(i > 0) {
                    clazz += ' margin-left-3px';
                }
                html += '<span class="'+ clazz +'">' + tmpStr[i] + '</span>'
            }
            return html;
        },
        showDiffBtn: function (status) {
            switch (status) {
                case 0:
                    return 'btn-green';//即将开始
                case 1:
                    return 'btn-orange';//正在进行
                case 2:
                    return 'btn-grey';//已结束
                case 3:
                    return 'btn-stronggrey';//立即查看
            }
        },
        handleSearch: function () {
            // 如果输入框未展开则展开输入框
            if (!this.searchFlag) {
                this.searchFlag = true;
                // 因为searchFlag改变会触发DOM渲染，focus必须在DOM渲染完在执行，这里可以用延时执行解决
                // setTimeout("$('#searchInput').focus()", 500);
                //但是我建议用vue 的 nextTick，即下一帧（渲染结束）再执行
                this.$nextTick(() => {
                    $('#searchInput').focus()
                });
            } else {
                // 异步请求
            }

        }
    },

    //create的时期：dom还没被vue的dom替换
    //mounted的时期：dom还没被vue的dom替换
    created: created,
    mounted: mounted,
})