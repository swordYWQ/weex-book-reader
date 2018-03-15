package com.weex.app.extend;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.common.WXModule;

public class CloseModule extends WXModule {

    @JSMethod(uiThread = false)
    public void closeApp() {
        System.exit(0); // 正常退出app
    }
}