package com.rifeng;

import android.app.Application;
import android.content.Context;
import android.os.Environment;

import androidx.annotation.Nullable;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.reactnativerestart.RestartPackage;

import org.mauritsd.reactnativedynamicbundle.RNDynamicBundleModule;
import org.mauritsd.reactnativedynamicbundle.RNDynamicBundlePackage;

import com.facebook.react.ReactInstanceManagerBuilder;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;
import com.rnfs.RNFSPackage;
import com.zoontek.rnpermissions.RNPermissionsPackage;
import org.reactnative.camera.RNCameraPackage;
import com.zoontek.rnpermissions.RNPermissionsPackage;
import org.reactnative.camera.RNCameraPackage;
//import com.zoontek.rnpermissions.RNPermissionsPackage;
import org.reactnative.camera.RNCameraPackage;
import org.mauritsd.reactnativedynamicbundle.RNDynamicBundlePackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JSIModulePackage;
import com.facebook.soloader.SoLoader;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    public static MainApplication mainApplication;

    private ReactInstanceManager mReactInstanceManager;

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return false;//BuildConfig.DEBUG; //在Debug模式下，会去加载JS Server服务的bundle。在Release模式下会去加载本地的bundle
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
            packages.add(new ReloadReactPackage());
//            packages.add(new MainReactPackage(),
//            new RestartPackage());
//            packages.add(new RNFSPackage());
//            packages.add(new RNDynamicBundlePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }


          @Nullable
          @Override
          protected String getJSBundleFile() {
              String jsBundleFile = getFilesDir().getAbsolutePath() + "/mainbundle/index.bundle";
//              String jsBundleFile = Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + "mainbundle/index.bundle";
              File file = new File(jsBundleFile);

              if( file != null && file.exists()){
                  return jsBundleFile;
              }else{
                  return  super.getJSBundleFile();
              }
//              return RNDynamicBundleModule.launchResolveBundlePath(MainApplication.this);

          }

          @Override
          protected ReactInstanceManager createReactInstanceManager() {
              ReactInstanceManagerBuilder builder = ReactInstanceManager.builder()
                      .setApplication(getApplication())
                      .setJSMainModulePath(getJSMainModuleName())
                      .setUseDeveloperSupport(getUseDeveloperSupport())
                      .setRedBoxHandler(getRedBoxHandler())
                      .setJavaScriptExecutorFactory(getJavaScriptExecutorFactory())
                      .setUIImplementationProvider(getUIImplementationProvider())
                      .setJSIModulesPackage(getJSIModulePackage())
                      .setInitialLifecycleState(LifecycleState.BEFORE_CREATE);

              for (ReactPackage reactPackage : getPackages()) {
                  builder.addPackage(reactPackage);
              }
              String jsBundleFile = getJSBundleFile();
              if (jsBundleFile != null) {

                  builder.setJSBundleFile(jsBundleFile);
              } else {

                  builder.setBundleAssetName(Assertions.assertNotNull(getBundleAssetName()));
              }
              mReactInstanceManager = builder.build();
              return mReactInstanceManager;
          }

      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
      mainApplication = this;
    SoLoader.init(this, /* native exopackage */ false);



  }

}
