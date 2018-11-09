/*   处理弹出的操作面板   */

module.exports = class PopupNumbers {

    constructor($panel) {
        this._$panel = $panel.hide().removeClass("hidden");
    }

    popup($cell) {
        const { left, top } = $cell.position();
        this._$panel
            .css({
                left: `${left}px`,
                top: `${top}px`
            })
            .show();
    }
}