var couponDialogLeftPosition = ((window.innerWidth - 486) / 2) + 'px';
var couponDialogTopPosition = (window.innerHeight * 0.11) + 'px';

var CouponDialog = React.createClass({
    render: function() {
        return (
            <div className={this.props.visible ? "layout__obfuscator is-visible" : "layout__obfuscator"}>
                <div className="couponDialog" style={{left: couponDialogLeftPosition, top: couponDialogTopPosition}}>
                    <div className="icon-ic_dialog_close dialogClose" onClick={this.props.handleClose}></div>
                    <p className="couponPriceSummary"><span className="currency">&yen;</span>{this.props.couponPrice}</p>
                    <p className="couponPriceLabel">&ensp;恭喜您获得{this.props.couponPrice}元油券！</p>
                    <div className="imgCenter buttonNeutral buttonCheckCoupon" onClick={this.props.handleCheckCoupon}>立即查看</div>
                </div>
            </div>
        );
    }
});

module.exports = CouponDialog;
