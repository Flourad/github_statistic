/**
 * Created by danyu on 4/2/16.
 */
let {Table} = AntD;

class PageChinaRank extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: undefined,
            loading: false,
            pagination: {
                // 当前页
                current: 1,
                // 每页显示的条数
                size: 10,
                // 总的条数
                total: 0
            }
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
                console.log(text,record);
                return(
                    <span><a href={'https://github.com/'+record.login}>{record.login}</a>{' ('+text+')'}</span>
                )
            }
        }, {
            title: 'score',
            dataIndex: 'followersCount'
        }, {
            title: 'Language',
            dataIndex: 'language'
        }, {
            title: 'Location',
            dataIndex: 'location'
        }, {
            title: 'profile',
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
            url: 'githubchina',
            dataType: 'json',
            success: function(result) {
                console.log('dddddddd',result);
                if (result.status === 0) {
                    me.setState({loading: false});
                    console.log(result.users);
                    me.setState({dataSource:result.users});
                    me.setState({pagination: {total: result.total}})
                } else {
                    alert('Error~');
                }
            },
            error: function(e) {

            }
        })

    }

    componentDidMount() {
        this.requestData(this.state.pagination.size,this.state.pagination.current);//第一次请求数据
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

        this.setState({
            pagination: pager
        });

        this.requestData(pager.size, pager.current);
    }


}

export default PageChinaRank;