package com.zkcloud.zkShop.extend;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.support.v4.app.NotificationCompat;
import android.text.TextUtils;

import com.benmu.framework.BMWXEnvironment;
// import com.benmu.framework.adapter.router.PreRenderHelper;
import com.benmu.framework.adapter.router.RouterTracker;
import com.zkcloud.zkShop.R;
import com.zkcloud.zkShop.constant.Constant;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

/**
 * Created by lifugui on 2017/10/17.
 */

public class zyTools extends WXModule {

    @JSMethod(uiThread=false)
    public void getLocation(JSCallback callback) {
        LocationManager locationManager = new LocationManager();
        locationManager.setCallback(callback);
    }
    @JSMethod(uiThread=false)
    public void quit() {
        RouterTracker.popStackFrame();
    }
    @JSMethod(uiThread=false)
    public void send() {
        Intent intent1 = new Intent("JumpToNotificationPage");
        PendingIntent pi = PendingIntent.getBroadcast(WXEnvironment.sApplication,0,intent1,0);
        NotificationManager manager = (NotificationManager)WXEnvironment.sApplication
                .getSystemService(WXEnvironment.sApplication.NOTIFICATION_SERVICE);
        Notification notification = new NotificationCompat.Builder(WXEnvironment.sApplication)
                .setContentTitle("send()")
                .setContentText("This is content text")
                .setWhen(System.currentTimeMillis())
                .setSmallIcon(R.mipmap.checkbox_checked)
                .setLargeIcon(BitmapFactory.decodeResource(WXEnvironment.sApplication.getResources(),
                        R.mipmap.ic_launcher))
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setContentIntent(pi)
                .setAutoCancel(true)
                .build();
        manager.notify(Constant.NOTIFICATION_MESSAGE, notification);
    }
    @JSMethod(uiThread=false)
    public void preLoad(String url) {
        String pathUrl = url;
        if (TextUtils.isEmpty(pathUrl)) return ;
        Uri pathUri = Uri.parse(pathUrl);
        if (!TextUtils.equals("http", pathUri.getScheme()) && !TextUtils.equals("https", pathUri
                .getScheme())) {
            pathUri = Uri.parse(BMWXEnvironment.mPlatformConfig.getUrl().getJsServer() +
                    "/fe/dist/js" + pathUrl);
        }

        //PreRenderHelper helper = new PreRenderHelper(pathUri.toString());
        //helper.preLoad(mWXSDKInstance.getContext(),pathUri.toString());
    }
}
