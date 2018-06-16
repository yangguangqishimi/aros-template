package com.zkcloud.zkShop.extend.module;

import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.appfram.websocket.IWebSocketAdapter;
import com.taobao.weex.appfram.websocket.WebSocketCloseCodes;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.utils.WXLogUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lfg on 2017/12/6.
 */

public class WXWebSocketModule extends WXSDKEngine.DestroyableModule {
    private static final String TAG = "WebSocketModule";
    private static final String KEY_DATA = "data";
    private static final String KEY_CODE = "code";
    private static final String KEY_REASON = "reason";
    private static final String KEY_WAS_CLEAN = "wasClean";

    private IWebSocketAdapter webSocketAdapter;
    private JSCallback onOpen;
    private JSCallback onMessage;
    private JSCallback onClose;
    private JSCallback onError;
    private IWebSocketAdapter.EventListener eventListener = new IWebSocketAdapter.EventListener() {
        @Override
        public void onOpen() {
            if (onOpen != null) {
                onOpen.invoke(new HashMap<>(0));
            }
        }

        @Override
        public void onMessage(String data) {
            if (onMessage != null) {
                Map<String, String> msg = new HashMap<>(1);
                msg.put(KEY_DATA, data);
                onMessage.invokeAndKeepAlive(msg);
            }
        }

        @Override
        public void onClose(int code, String reason, boolean wasClean) {
            if (onClose != null) {
                Map<String, Object> msg = new HashMap<>(3);
                msg.put(KEY_CODE, code);
                msg.put(KEY_REASON, reason);
                msg.put(KEY_WAS_CLEAN, wasClean);
                onClose.invoke(msg);
            }
        }

        @Override
        public void onError(String msg) {
            if (onError != null) {
                Map<String, String> info = new HashMap<>(1);
                info.put(KEY_DATA, msg);
                onError.invokeAndKeepAlive(info);
            }
        }
    };

    @JSMethod
    public void WebSocket(final String url, final String protocol) {
        new Thread() {
            @Override
            public void run() {
                if (webSocketAdapter != null) {
                    webSocketAdapter.close(WebSocketCloseCodes.CLOSE_GOING_AWAY.getCode(), WebSocketCloseCodes.CLOSE_GOING_AWAY.name());
                }
                webSocketAdapter = mWXSDKInstance.getWXWebSocketAdapter();
                if (!reportErrorIfNoAdapter()) {
                    webSocketAdapter.connect(url, protocol, eventListener);
                }
            }
        }.start();
    }

    @JSMethod
    public void send(final String data) {
        if (!reportErrorIfNoAdapter()) {
            new Thread() {
                @Override
                public void run() {
                    webSocketAdapter.send(data);
                }
            }.start();
        }
    }

    @JSMethod
    public void close(String code, String reason) {
        if (!reportErrorIfNoAdapter()) {
            int codeNumber = WebSocketCloseCodes.CLOSE_NORMAL.getCode();
            if (code != null) {
                try {
                    codeNumber = Integer.parseInt(code);
                } catch (NumberFormatException e) {
                    //ignore
                }
            }
            webSocketAdapter.close(codeNumber, reason);
        }
    }

    @JSMethod
    public void onopen(JSCallback callback) {
        this.onOpen = callback;
    }

    @JSMethod
    public void onmessage(JSCallback callback) {
        this.onMessage = callback;
    }

    @JSMethod
    public void onclose(JSCallback callback) {
        this.onClose = callback;
    }

    @JSMethod
    public void onerror(JSCallback callback) {
        this.onError = callback;
    }

    @Override
    public void destroy() {
        if (webSocketAdapter != null) {
            webSocketAdapter.destroy();
        }
        eventListener = null;
    }

    private boolean reportErrorIfNoAdapter() {
        if (webSocketAdapter == null) {
            if (eventListener != null) {
                eventListener.onError("No implementation found for IWebSocketAdapter");
            }
            WXLogUtils.e(TAG, "No implementation found for IWebSocketAdapter");
            return true;
        }
        return false;
    }
}
