/**
 * Accordion Widget
 * @creator  沉鱼<fool2fish@gmail.com>
 */
KISSY.add('accordion', function(S) {

    var DOM = S.DOM,
        DISPLAY = 'display', BLOCK = 'block', NONE = 'none',

        defaultConfig = {
            markupType: 1,
            triggerType: 'click',
            multiple: false
        };

    /**
     * Accordion Class
     * @constructor
     */
    function Accordion(container, config) {
        var self = this;

        // factory or constructor
        if (!(self instanceof Accordion)) {
            return new Accordion(container, config);
        }

        Accordion.superclass.constructor.call(self, container, S.merge(defaultConfig, config));
    }

    S.extend(Accordion, S.Switchable);
    S.Accordion = Accordion;

    S.augment(Accordion, {

        /**
         * 重复触发时的有效判断
         */
        _triggerIsValid: function(index) {
            // multiple 模式下，再次触发意味着切换展开/收缩状态
            return this.activeIndex !== index || this.config.multiple;
        },

        /**
         * 切换当前触点
         */
        _switchTrigger: function(fromTrigger, toTrigger/*, index*/) {
            var self = this, cfg = self.config, activeTriggerCls = this.config.activeTriggerCls;
            if (cfg.multiple) {
                DOM.toggleClass(toTrigger, activeTriggerCls);
            }
            else {
                Accordion.superclass._switchTrigger.call(self, fromTrigger, toTrigger);
            }
        },

        /**
         * 切换视图
         */
        _switchView: function(fromPanels, toPanels, index) {
            var self = this, cfg = self.config,
                panel = toPanels[0];
            if (cfg.multiple) {
                DOM.css(panel, DISPLAY, panel.style[DISPLAY] == NONE ? BLOCK : NONE);
                this._fireOnSwitch(index);
            }
            else {
                Accordion.superclass._switchView.call(self, fromPanels, toPanels, index);
            }
        }
    });

}, { host: 'switchable' } );

/**
 * TODO:
 *
 *  - 支持动画
 *
 */
