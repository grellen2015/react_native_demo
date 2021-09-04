package com.rifeng;

import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.mauritsd.reactnativedynamicbundle.RNDynamicBundleModule;

public class ReloadModule extends ReactContextBaseJavaModule {

    public ReloadModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "Reload";
    }

    /**
     * 这是js调用的方法，需要使用注解@ReactMethod,返回类型必须为void
     */
    @ReactMethod
    public void reloadModule(
                              Callback successCallback) {


        MainActivity.mainActivity.reloadBundle();
        successCallback.invoke("call success");

        Toast.makeText(getReactApplicationContext(), "call reloadModule",Toast.LENGTH_LONG).show();
        Log.i("===========", "call reloadModule");
    }
}
