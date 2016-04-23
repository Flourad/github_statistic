import {ChinaRankAction, WorldRankAction} from '../Actions/RankAction.jsx';

var ChinaRankStore = Reflux.createStore({
   pagination: {
            // 当前页
            current: 1,
            // 每页显示的条数
            size: 10,
            // 总的条数
            total: 0
    },
    listenables: ChinaRankAction,
    onUpdatePagination(pagination) {
        this.pagination = pagination;
        this.trigger(pagination);
    }
});

var WorldRankStore = Reflux.createStore({
   pagination: {
            // 当前页
            current: 1,
            // 每页显示的条数
            size: 10,
            // 总的条数
            total: 0
    },
    listenables: WorldRankAction,
    onUpdatePagination(pagination) {
        this.pagination = pagination;
        this.trigger(pagination);
    }
});

export {ChinaRankStore, WorldRankStore};