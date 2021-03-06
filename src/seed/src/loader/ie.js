/**
 * @fileOverview for ie ,find current executive script ,then infer module name
 * @author yiminghe@gmail.com
 */
(function (S, loader, utils) {
    if ("require" in this) {
        return;
    }
    S.mix(loader, {
        //ie 特有，找到当前正在交互的脚本，根据脚本名确定模块名
        // 如果找不到，返回发送前那个脚本
        __findModuleNameByInteractive:function () {
            var self = this,
                scripts = document.getElementsByTagName("script"),
                re,
                script;

            for (var i = 0; i < scripts.length; i++) {
                script = scripts[i];
                if (script.readyState == "interactive") {
                    re = script;
                    break;
                }
            }
            if (!re) {
                // sometimes when read module file from cache , interactive status is not triggered
                // module code is executed right after inserting into dom
                // i has to preserve module name before insert module script into dom , then get it back here
                S.log("can not find interactive script,time diff : " + (+new Date() - self.__startLoadTime), "error");
                S.log("old_ie get modname from cache : " + self.__startLoadModuleName);
                return self.__startLoadModuleName;
                //S.error("找不到 interactive 状态的 script");
            }

            // src 必定是绝对路径
            // or re.hasAttribute ? re.src :  re.getAttribute('src', 4);
            // http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
            var src = utils.absoluteFilePath(re.src);
            // S.log("interactive src :" + src);
            // 注意：模块名不包含后缀名以及参数，所以去除
            // 系统模块去除系统路径
            // 需要 base norm , 防止 base 被指定为相对路径
            self.Config.base = utils.normalBasePath(self.Config.base);
            if (src.lastIndexOf(self.Config.base, 0)
                === 0) {
                return utils.removePostfix(src.substring(self.Config.base.length));
            }
            var packages = self.Config.packages;
            //外部模块去除包路径，得到模块名
            for (var p in packages) {
                if (packages.hasOwnProperty(p)) {
                    var p_path = packages[p].path;
                    if (packages.hasOwnProperty(p) &&
                        src.lastIndexOf(p_path, 0) === 0) {
                        return utils.removePostfix(src.substring(p_path.length));
                    }
                }
            }
            S.log("interactive script does not have package config ：" + src, "error");
        }
    });
})(KISSY, KISSY.__loader, KISSY.__loaderUtils);