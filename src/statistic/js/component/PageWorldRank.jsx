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
            total: 0
        }

        this.columns = [{
            title: 'Rank',
            dataIndex: 'rank',
            render(text) {
                return <a href="#">{text}</a>;
            }
        }, {
            title: 'Name',
            dataIndex: 'name',
            render(text, record) {
                console.log(text,record);
                return(
                    <span><a href={'https://github.com/'+record.login}>{record.login}</a>{'('+text+')'}</span>
                )
            }
        }, {
            title: 'score',
            dataIndex: 'score'
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
                return(<img src={text}/>)
            }
        }];
    }

    componentDidMount() {
        let me = this;
        me.setState({loading: true});
        $.ajax({
            type: 'post',
            url: 'githubworld',
            dataType: 'json',
            success: function(result) {
                me.setState({loading: false});
                console.log(result);
                me.setState({dataSource:result});
            },
            error: function(e) {

            }
        })


    }

    render() {
        return(
            <div>
                <Table columns={this.columns} dataSource={this.state.dataSource} loading={this.state.loading}/>
                <span className='total_records'>共 <i style={{color:"red"}}>{this.state.total}</i> 条记录</span>
            </div>
        )
    }
}

export default PageChinaRank;