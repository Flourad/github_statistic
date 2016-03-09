/**
 * @file 新增/修改 权限
 * Created by jinjiaxing on 16/3/9.
 */

class PageAddPermission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){

        console.log(this.props.params.data);

        return (
            <div id='pageAddPermission'>
                新增权限页面
            </div>
        );
    }
}

export default PageAddPermission;