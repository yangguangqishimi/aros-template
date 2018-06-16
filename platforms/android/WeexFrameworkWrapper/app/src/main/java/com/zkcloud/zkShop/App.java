package com.zkcloud.zkShop;

import android.app.Application;

import com.benmu.framework.BMWXApplication;
import com.zkcloud.zkShop.extend.component.WXMapMarkerComponent;
import com.zkcloud.zkShop.extend.component.WXMapViewComponent;
import com.zkcloud.zkShop.extend.component.WXScrollerHeaderComponent;
import com.zkcloud.zkShop.extend.module.WXIOSPickerModule;
import com.zkcloud.zkShop.extend.module.WXMapModule;
import com.zkcloud.zkShop.extend.module.WXWebSocketModule;
import com.zkcloud.zkShop.extend.module.WXZyToolsModule;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;

/**
 * Created by Carry on 2017/8/23.
 */

public class App extends BMWXApplication {
    public Application mInstance;

    @Override
    public void onCreate() {
        // BMWXEngine.iWebSocketAdapterFactory= new DefaultWebSocketAdapterFactory();
        super.onCreate();
        try {
            WXSDKEngine.registerModule("picker", WXIOSPickerModule.class);
            WXSDKEngine.registerModule("zyTools", WXZyToolsModule.class);
            WXSDKEngine.registerModule("webSocket", WXWebSocketModule.class);
            WXSDKEngine.registerModule("amap", WXMapModule.class);
            WXSDKEngine.registerComponent("weex-amap", WXMapViewComponent.class);
            WXSDKEngine.registerComponent("weex-amap-marker", WXMapMarkerComponent.class);
            WXSDKEngine.registerComponent("scroller-header", WXScrollerHeaderComponent.class);
        } catch (WXException e) {
            e.printStackTrace();
        }

        mInstance = this;
    }

}
