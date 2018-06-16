package com.zkcloud.zkShop.extend.module;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.net.DhcpInfo;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.LocaleList;
import android.provider.Settings;
import android.support.v4.app.NotificationCompat;
import android.util.DisplayMetrics;

import com.benmu.framework.adapter.router.RouterTracker;

import com.benmu.framework.utils.AppUtils;

import com.benmu.framework.utils.LanguageUtil;
import com.benmu.framework.utils.SharePreferenceUtil;
import com.zkcloud.zkShop.R;
import com.zkcloud.zkShop.constant.Constant;
import com.zkcloud.zkShop.extend.LocationManager;
import com.zkcloud.zkShop.service.WebSocketService;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

/**
 * Created by lfg on 2017/11/29.
 */

public class WXZyToolsModule extends WXModule {
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
    public void send(String title, String content) {
        Intent intent1 = new Intent("JumpToNotificationPage");
        PendingIntent pi = PendingIntent.getBroadcast(WXEnvironment.sApplication,0,intent1,0);
        NotificationManager manager = (NotificationManager)WXEnvironment.sApplication
                .getSystemService(WXEnvironment.sApplication.NOTIFICATION_SERVICE);
        Notification notification = new NotificationCompat.Builder(WXEnvironment.sApplication)
                .setContentTitle(title)
                .setContentText(content)
                .setWhen(System.currentTimeMillis())
                .setSmallIcon(R.mipmap.logo_white)
                .setLargeIcon(BitmapFactory.decodeResource(WXEnvironment.sApplication.getResources(),
                        R.mipmap.ic_launcher))
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setContentIntent(pi)
                .setAutoCancel(true)
                .setVibrate(new long[] {0, 500, 500, 500})
                .setLights(Color.RED, 1000,1000)
                .build();

        manager.notify(Constant.NOTIFICATION_MESSAGE, notification);
    }
    @JSMethod(uiThread = false)
    public void moveTaskToFront() {
        ActivityManager am = (ActivityManager) WXEnvironment.sApplication.getSystemService(Context.ACTIVITY_SERVICE);
        am.moveTaskToFront(((Activity)mWXSDKInstance.getContext()).getTaskId(), ActivityManager.MOVE_TASK_WITH_HOME);
    }
    @JSMethod(uiThread = false)
    public void moveTaskToBack() {
        ((Activity)mWXSDKInstance.getContext()).moveTaskToBack(true);
    }

    @JSMethod(uiThread=false)
    public void getWifiList(JSCallback callback) {
        Context context = WXEnvironment.sApplication;
        WifiManager wifiManager = (WifiManager)context.getSystemService(Context.WIFI_SERVICE);
        WifiInfo wifiInfo = wifiManager.getConnectionInfo();
        wifiInfo.getSSID();
        List<ScanResult> scan = wifiManager.getScanResults();
        Collections.sort(scan, new Comparator<ScanResult>() {
            @Override
            public int compare(ScanResult o1, ScanResult o2) {
                return o1.level > o2.level ? 1 : 0;
            }
        });
        if (callback != null) {
            callback.invoke(scan);
        }
    }
    @JSMethod(uiThread=false)
    public void getConnectedWifi(JSCallback callback) {
        Context context = WXEnvironment.sApplication;
        WifiManager wifiManager = (WifiManager)context.getSystemService(Context.WIFI_SERVICE);
        WifiInfo wifiInfo = wifiManager.getConnectionInfo();
        DhcpInfo dhcpInfo = wifiManager.getDhcpInfo();

        HashMap data = new HashMap(2);
        HashMap map = new HashMap(2);
        map.put("ssid", wifiInfo.getSSID().replace("\"",""));
        map.put("linkSpeed", wifiInfo.getLinkSpeed());
        map.put("dns1", intToAddress(dhcpInfo.dns1));
        map.put("dns2", intToAddress(dhcpInfo.dns2));
        map.put("gateway", intToAddress(dhcpInfo.gateway));
        map.put("netmask", intToAddress(dhcpInfo.netmask));
        map.put("ip", intToAddress(dhcpInfo.ipAddress));
        map.put("leaseDuration", dhcpInfo.leaseDuration);
        map.put("serverAddress", intToAddress(dhcpInfo.serverAddress));
        map.put("ip", intToAddress(dhcpInfo.ipAddress));
        data.put("data", map);
        data.put("status", 0);
        callback.invoke(data);
    }

    public String intToAddress(int value){
        String address = "";
        for (int i = 0; i < 4; i++){
            int offset = (4 - 1 - i) * 8;
            address = ((value >>> offset) & 0xFF) + "." + address;
        }
        address = address.substring(0, address.length()-1);
        return address;
    }
    @JSMethod(uiThread=false)
    public void openSettingWifi() {
        Context context = mWXSDKInstance.getContext();
        Intent intent = new Intent(Settings.ACTION_WIFI_SETTINGS);
        context.startActivity(intent);
    }
//    @JSMethod(uiThread=false)
//    public void closeDebug(Boolean isDebug) {
//        DebugableUtil.isDebug = isDebug;
//    }

    @JSMethod(uiThread=false)
    public void getJsVersion(JSCallback callback) {
        String version = AppUtils.getJsVersion(WXEnvironment.sApplication);
        if (callback != null) {
            callback.invoke(version);
        }
    }
    @JSMethod(uiThread=false)
    public void setLocale(String locale) {
        LanguageUtil.locale = locale;
        Resources res = mWXSDKInstance.getContext().getResources();
        Configuration config = res.getConfiguration();
        DisplayMetrics dm = res.getDisplayMetrics();
        if (locale.equals("en")) {
            if (config.locale.equals(Locale.US)) return;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                config.setLocale(Locale.US);
            } else {
                config.locale = Locale.US;
            }
        } else if (locale.equals("zh")){
            if (config.locale.equals(Locale.SIMPLIFIED_CHINESE)) return;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                config.setLocale(Locale.CHINA);
            } else {
                config.locale = Locale.CHINA;
            }
        } else {
            return;
        }
        res.updateConfiguration(config, dm);
    }
    @JSMethod(uiThread=false)
    public void updateApp(String url, String version, JSCallback callback) {
        if (!WebSocketService.isDownloading) {
            Intent intent = new Intent(mWXSDKInstance.getContext(), WebSocketService.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.putExtra("url", url);
            intent.putExtra("version", version);
            mWXSDKInstance.getContext().startService(intent);
            callback.invoke(true);
        } else {
            callback.invoke(false);
        }
    }
    @JSMethod(uiThread = false)
    public void getUpdateInfo(JSCallback callback) {
        String info = SharePreferenceUtil.getUpdateInfo(mWXSDKInstance.getContext());
        if (callback != null) {
            callback.invoke(info);
        }
    }
    @JSMethod(uiThread = false)
    public String getSystemLanguage(JSCallback callback) {
        Locale locale;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            locale = LocaleList.getDefault().get(0);
        } else locale = Locale.getDefault();
        return locale.getLanguage();
    }
}
