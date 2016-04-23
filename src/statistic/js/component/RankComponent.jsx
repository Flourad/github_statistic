/**
 * Created by danyu on 4/4/16.
 */

let {Table} = AntD;
import {ChinaRankStore, WorldRankStore} from '../Stores/RankStore.jsx';
import {ChinaRankAction, WorldRankAction} from '../Actions/RankAction.jsx';

class RankComponent extends React.Component {

    constructor(props) {
        super(props);
        let store = this.props.type === 'chinaRank' ? ChinaRankStore:WorldRankStore;
        console.log(this.props.type);
        this.state = {
            dataSource: undefined,
            loading: false,
            pagination: store.pagination
        }

        this.columns = [{
            title: 'Rank',
            dataIndex: 'Ranker',
            render(text) {
                return <span>{text}</span>;
            }
        }, {
            title: 'Name',
            dataIndex: 'name',
            render(text, record) {
                // console.log(text,record);
                return(
                    <span><a target="_blank" href={'https://github.com/'+record.login}>{record.login}</a>{' ('+text+')'}</span>
                )
            }
        }, {
            title: 'Score',
            dataIndex: 'score'
        }, {
            title: 'Language',
            dataIndex: 'language'
        }, {
            title: 'Location',
            dataIndex: 'location'
        }, {
            title: 'Profile',
            dataIndex: 'gravatar',
            render(text) {
                return(<img src={text} className = 'usersImg'/>)
            }
        }];
    }

    requestData(page_size, current_page) {
        let me = this;
        me.setState({loading: true});
        $.ajax({
            type: 'get',
            data:
            {
                page_size:page_size,
                current_page:current_page
            },
            url: me.props.reqUrl,
            dataType: 'json',
            success: function(result) {
                // console.log('dddddddd',result);
                if (result.status === 0) {
                    me.setState({loading: false});
                    // console.log(result.users);
                    me.setState({dataSource:result.users});
                    // me.setState({pagination: {total: result.total}})
                    let rankAction = me.props.type === 'chinaRank' ? ChinaRankAction:WorldRankAction;
                    let pagination = me.state.pagination;
                    pagination.total = result.total;
                    rankAction.updatePagination(pagination);
                } else {
                    alert('Error~');
                }
            },
            error: function(e) {

            }
        })

    }

    updateRank(data) {
        this.setState({pagination: data});
    }

    componentDidMount() {

        let store = this.props.type === 'chinaRank' ? ChinaRankStore:WorldRankStore;
        // 监听store
        this.unsubscribe = store.listen(this.updateRank.bind(this));
        this.requestData(this.state.pagination.size,this.state.pagination.current);//第一次请求数据
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return(
            <div>
                <Table rowKey={(record)=>(record.id)} columns={this.columns} dataSource={this.state.dataSource}
                       pagination={this.state.pagination} loading={this.state.loading}  onChange={this.handleTableChange.bind(this)}/>
                <span className='total_records'>共 <i style={{color:"red"}}>{this.state.pagination.total}</i> 条记录</span>
            </div>
        )
    }

    handleTableChange(pagination) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.size = 10;

        // this.setState({
        //     pagination: pager
        // });

        let rankAction = this.props.type === 'chinaRank' ? ChinaRankAction:WorldRankAction;
        rankAction.updatePagination(pager);

        this.requestData(pager.size, pager.current);
    }


}

export default RankComponent;