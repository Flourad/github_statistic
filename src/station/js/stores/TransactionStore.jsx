/**
 * Created by danyu on 3/15/16.
 */

import TransactionActions from '../actions/TransactionAction.jsx';

var TransactionStore = Reflux.createStore({
    selectedStationList: [],
    stationList: [],
    listenables: [TransactionActions],
    onUpdateSelectedStations: function (selectedStationList,type) {
        this.selectedStationList = selectedStationList;
        this.trigger(selectedStationList,type);
    },
    onUpdateStationList: function (stationList,type) {
        this.stationList = stationList;
        this.trigger(stationList,type);
    }
});

export default TransactionStore;