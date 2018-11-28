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
//加载服务器的时间
function loadServerTime() {
    let _this = this;
    getReq('./data/serverTime.json').then((res)=>{
        _this.serverTime = res.data;
    })
}

//加载相关网站
function loadRelativeWebsite() {
    let _this = this;
    /*axios.get('./data/relativeWebsites.json')
        .then(function(res){
            let data = res.data;
           if(data.code === 0) {
                _this.relativeWebsites = data.data;
           } else {

           }
        })
        .catch(function (error){
            console.log(error);
            alert("请求出错");
        });*/
    getReq('./data/relativeWebsites.json').then((res)=>{
        _this.relativeWebsites = res.data;
    });
}

function loadBids() {
    let _this = this;
    getReq('./data/bids.json', _this.bidsSearchParam).then((res)=>{
        _this.bids = res.data;
        let bar = getPageIndex(_this.bids.pageSize, _this.bids.currentPage, _this.bids.totalPage);
        _this.bidsPageBar.startIndex = bar.startPageIndex;
        _this.bidsPageBar.endIndex = bar.endPageIndex;
    });
}

//选择搜索类型
function loadSearchType(){
    let _this = this;
    getReq('./data/searchTypes.json')
        .then(function(res){
            _this.searchTypes = res.data;
        });
}

function loadSearchRegions(){
    let _this = this;
    getReq('./data/searchRegions.json').then((res)=>{
        _this.searchRegions = res.data;
    })
}



//倒计时
function countingdown(){
    let _this = this;
    // 更新本地存储的服务器时间，不再向服务器发送获取时间请求
    setInterval(() => {
        _this.serverTime += 1000;
    }, 1000);
}

//搜过框
function initSearchBox() {
    let _this = this;
    $(document).bind("click", function (e) {// 鼠标点击空白处，隐藏搜索input　　　
        let target = $(e.target);
        if (target.closest(".toggle-search").length === 0) {
            _this.searchFlag = false;
        }
    });
}

function created() {
    this.countingdown();
    this.initSearchBox();
    this.loadServerTime();
    this.loadBids();
    this.loadRelativeWebsite();
    this.loadSearchType();
    this.loadSearchRegions();
}

function mounted() {

}

const app = new Vue({
    el: '#app',
    data: {
        searchFlag: false,
        headSearchTxt: '',
        serverTime: new Date().getTime(), // 异步请求获取服务器时间
        relativeWebsites: [],
        searchTypes:[],
        searchRegions:[],

        bidsSearchParam: {
            keyword: '',
            region: '',
            type: '',
            page: 1
        },
        bids: {
            currentPage: 1,
            totalPage: 1,
            totalNum: 0,
            pageSize: 9,
            data: []
        },
        bidsPageBar: {
            pageBarSize: 10,
            startIndex: 1,
            endIndex: 10
        },
        left: [],

    },
    watch: {
        serverTime: function () {
            let lf = [];
            for (let i = 0; i < this.bids.data.length; i++) {
                let item = {};
                item.id = this.bids.data[i].id;
                item.left = this.bids.data[i].endTime - this.serverTime;
                lf[i] = item;
            }
            this.left = lf;
        }
    },
    methods: {
        initSearchBox:initSearchBox,
        countingdown:countingdown,
        loadServerTime: loadServerTime,
        loadRelativeWebsite:loadRelativeWebsite,
        loadSearchType:loadSearchType,
        loadSearchRegions:loadSearchRegions,
        loadBids: loadBids,
        goPage: function(page) {
            this.bidsSearchParam.page = page;
            this.loadBids();
        },
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
            let htmlfinal = '<span class="time margin-left-3px">0</span><span class="time margin-left-3px">0</span>';
            for (let i = 0; i < tmpStr.length; i++) {
                let clazz = 'time';
                if(i > 0) {
                    clazz += ' margin-left-3px';
                }
                html += '<span class="'+ clazz +'">' + tmpStr[i] + '</span>';

            }
          if(time < 0 )
              return htmlfinal;
          else
              return html
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