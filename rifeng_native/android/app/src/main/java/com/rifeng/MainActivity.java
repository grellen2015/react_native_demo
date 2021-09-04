package com.rifeng;


import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.PersistableBundle;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.JSBundleLoader;
import com.facebook.react.bridge.ReactContext;

import org.mauritsd.reactnativedynamicbundle.RNDynamicBundleModule;

import java.io.File;
import java.lang.reflect.Field;

public class MainActivity extends ReactActivity implements RNDynamicBundleModule.OnReloadRequestedListener{

  private RNDynamicBundleModule module;
  public static MainActivity mainActivity;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mainActivity = this;
   // reloadBundle();

  }

  public void reloadBundle(){
      final ReactInstanceManager instanceManager;
      try {

        instanceManager = resolveInstanceManager();
        if (instanceManager == null) {
          return;
        }

        //获取本地的js代码 这里就不给出代码了。 如果本地没有就返回assets目录的
//            String latestJSBundleFile = Utils.getJSBundleFileInternal();
        String latestJSBundleFile = getJSBundleFileInternal();

        setJSBundle(instanceManager, latestJSBundleFile);

        new Handler(Looper.getMainLooper()).post(new Runnable() {
          @Override
          public void run() {
            try {

              instanceManager.recreateReactContextInBackground();
            } catch (Exception e) {
              // The recreation method threw an unknown exception
              // so just simply fallback to restarting the Activity (if it exists)
              loadBundleLegacy();
            }
          }
        });
      }  catch (Exception e) {
        e.printStackTrace();
        loadBundleLegacy();
      }

  }

  private String getJSBundleFileInternal() {

    String jsBundleFile = getFilesDir().getAbsolutePath() + "/mainbundle/index.bundle";
//              String jsBundleFile = Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + "mainbundle/index.bundle";
    File file = new File(jsBundleFile);

    if( file != null && file.exists()){
      return jsBundleFile;
    }else{
      return  null;
    }
  }

  @Override
  protected void onStart() {
    super.onStart();

    if (module != null) {
      module.setListener(this);
    }
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "rifeng";
  }


  @Override
  public void onReloadRequested() {
    this.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(MainActivity.this, "reloadRequest", Toast.LENGTH_LONG).show();
        MainActivity.this.getReactNativeHost().clear();
        MainActivity.this.recreate();
      }
    });
  }


  private ReactInstanceManager resolveInstanceManager(){
    ReactInstanceManager instanceManager;
    final Activity currentActivity = MainActivity.this;
    if (currentActivity == null) {
      return null;
    }
    ReactApplication reactApplication = (ReactApplication) currentActivity.getApplication();
    instanceManager = reactApplication.getReactNativeHost().getReactInstanceManager();

    return instanceManager;
  }

  private void setJSBundle(ReactInstanceManager instanceManager, String latestJSBundleFile) throws IllegalAccessException {
    try {
      JSBundleLoader latestJSBundleLoader;
      if (latestJSBundleFile.toLowerCase().startsWith("assets://")) {
        latestJSBundleLoader = JSBundleLoader.createAssetLoader(MainApplication.mainApplication, latestJSBundleFile, false);
      } else {
        latestJSBundleLoader = JSBundleLoader.createFileLoader(latestJSBundleFile);
      }
      Field bundleLoaderField = instanceManager.getClass().getDeclaredField("mBundleLoader");
      bundleLoaderField.setAccessible(true);
      bundleLoaderField.set(instanceManager, latestJSBundleLoader);
    } catch (Exception e) {
      throw new IllegalAccessException("Could not setJSBundle");
    }
  }

  private void loadBundleLegacy() {
    Log.d("loadBundleLegacy","loadBundle #3 loadBundleLegacy...");
    final Activity currentActivity =  MainActivity.this;
    if (currentActivity == null) {
      // The currentActivity can be null if it is backgrounded / destroyed, so we simply
      // no-op to prevent any null pointer exceptions.
      return;
    }
    currentActivity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        currentActivity.recreate();
      }
    });
  }
}
