/**
 * Created by jinjiaxing on 16/3/4.
 */
class PagePermission extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        };
    }

    render(){
        return(
            <div id="PageTransaction">
                <div class="pageTransaction_Header">
                    <h1>权限管理</h1>
                    <button> 新增人员 </button>
                </div>

            </div>
        );
    }
}

PagePermission.defaultProps={};
export default PagePermission;