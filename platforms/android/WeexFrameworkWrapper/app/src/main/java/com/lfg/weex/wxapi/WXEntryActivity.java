package com.lfg.weex.wxapi;

import android.os.Bundle;

import com.benmu.framework.BMWXEnvironment;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.umeng.weixin.callback.WXCallbackActivity;

/**
 * Created by Dong Fuhai on 2014-07-22 16:42.
 *
 * @modify:
 */
public class WXEntryActivity extends WXCallbackActivity implements IWXAPIEventHandler {

    public static WXEntryActivity activity;

    IWXAPI api;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activity = this;
        //注册API
        IWXAPI mWXApi = BMWXEnvironment.mWXApi;
        if (mWXApi == null) return;
        mWXApi.handleIntent(getIntent(), this);
    }


    @Override
    public void onReq(BaseReq baseReq) {

    }

    @Override
    public void onResp(BaseResp baseResp) {
//        if (baseResp instanceof SendAuth.Resp) {
//            SendAuth.Resp newResp = (SendAuth.Resp) baseResp;
//            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(newResp);
//        }
//        this.finish();
    }
}
