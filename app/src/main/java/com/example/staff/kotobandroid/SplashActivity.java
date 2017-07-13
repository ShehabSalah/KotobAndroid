package com.example.staff.kotobandroid;

import android.content.Intent;
import android.os.AsyncTask;
import android.provider.SyncStateContract;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.DecelerateInterpolator;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.daimajia.androidanimations.library.Techniques;
import com.example.staff.kotobandroid.util.Fonts;
import com.viksaa.sssplash.lib.activity.AwesomeSplash;
import com.viksaa.sssplash.lib.model.ConfigSplash;

import butterknife.BindView;
import butterknife.ButterKnife;

import static java.lang.Thread.sleep;

public class SplashActivity extends AppCompatActivity {
    @BindView(R.id.hindawi_hint) TextView hindawi_hint;
    @BindView(R.id.splash_logo) ImageView hindawi_logo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Hide ToolBar
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        //Inflate Splash Screen Layout
        setContentView(R.layout.activity_splash_kotob);
        ButterKnife.bind(this);
        //Hide the Action bar
        if (getSupportActionBar()!=null)
            getSupportActionBar().hide();

        //Apply font
        Fonts.setTypeFace(this, (TextView) findViewById(R.id.hindawi_hint));
        initSplashAnimation();
    }

    private void initSplashAnimation(){
        // FadeIn Animation setup
        Animation fadeIn = new AlphaAnimation(0, 1);
        fadeIn.setInterpolator(new DecelerateInterpolator());
        fadeIn.setDuration(2000);

        // Add FadeIn animation to splash logo and Text
        AnimationSet animation = new AnimationSet(false);
        animation.addAnimation(fadeIn);
        hindawi_logo.setAnimation(animation);
        hindawi_hint.setAnimation(animation);

        //Run background Thread to check if the user exists or not
        // ToDo 2: move the following 2 lines in another method then Implement the AsyncTask Methods
        CheckUserInfo checkUserInfo = new CheckUserInfo();
        checkUserInfo.execute();

    }


    /**
     * ToDo 1: Change this Class to abstract and move it to util
     * */
    private class CheckUserInfo extends AsyncTask<Void, Void, Void>{

        @Override
        protected Void doInBackground(Void... voids) {
            try {
                // Thread will sleep for 5 seconds

                sleep(3 * 1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            // ToDo : Check on the user here!!!
            return null;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);
            //Go to Next Activity
            Toast.makeText(getApplicationContext(),"Go To Next", Toast.LENGTH_LONG).show();
            startActivity(new Intent(getApplicationContext(), HomeActivity.class));
        }
    }
}
