/**
 * 首页 上页 [1] 2 3 4 5 7 8 9 9 10 下页 末页 当前第 1/18 页 共100条记录 每页x条
 *
 * @param totalIndexCount
 *            总索引数:分页条最多显示多少个页码
 * @param currentPage
 *            当前页
 * @param totalPage
 *            总页数
 * @return
 */
const getPageIndex = function (totalIndexCount, currentPage, totalPage) {
    let startPageIndex = currentPage - (totalIndexCount % 2 === 0 ? Math.floor(totalIndexCount/2) - 1 : Math.floor(totalIndexCount/2));
    let endPageIndex = currentPage + Math.floor(totalIndexCount/2);
    if (startPageIndex < 1) {
        startPageIndex = 1;
        if (totalPage >= totalIndexCount) {
            endPageIndex = totalIndexCount;
        } else {
            endPageIndex = totalPage;
        }
    }
    if (endPageIndex > totalPage) {
        endPageIndex = totalPage;
        if (endPageIndex - totalIndexCount > 0) {
            startPageIndex = endPageIndex - totalIndexCount + 1;
        } else {
            startPageIndex = 1;
        }
    }
    return {'startPageIndex':parseInt(startPageIndex),'endPageIndex':parseInt(endPageIndex)};
}