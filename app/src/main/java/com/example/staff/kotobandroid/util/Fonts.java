package com.example.staff.kotobandroid.util;

import android.content.Context;
import android.graphics.Typeface;
import android.widget.TextView;

/**
 * Created by staff on 2017.07.13.
 * Class Fonts responsible on assigning fonts to TextViews
 */

public class Fonts {
    /**
     * setTypeFace: assign DroidKufi Regular font to text views
     * @param context Application Context (used to retrieve the font from assets foldr)
     * @param textView TextView that you want to apply the font on!
     * */
    public static void setTypeFace(Context context, TextView... textView)
    {
        //Get the font face
        Typeface custom_font = Typeface.createFromAsset(context.getAssets(),
                "fonts/DroidKufi-Regular.ttf");
        //Loop on each textView.
        for (int i = 0; i < textView.length; i++){
            //Apply the font on the textView
            textView[i].setTypeface(custom_font);
        }
    }
}
