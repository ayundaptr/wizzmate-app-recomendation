package com.bangkit.wizzmate.view.welcome

import android.content.Intent
import android.graphics.Color
import android.graphics.Typeface
import android.os.Bundle
import android.text.SpannableString
import android.text.Spanned
import android.text.TextPaint
import android.text.method.LinkMovementMethod
import android.text.style.ClickableSpan
import android.text.style.StyleSpan
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.bangkit.wizzmate.R
import com.bangkit.wizzmate.databinding.ActivityWelcomeBinding
import com.bangkit.wizzmate.view.authentication.AuthenticationActivity

class WelcomeActivity : AppCompatActivity() {
    private lateinit var binding: ActivityWelcomeBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWelcomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.buttonLogin.setOnClickListener {
            startActivity(Intent(this, AuthenticationActivity::class.java))
        }

        makeTextLink(binding.confirmAccount, "Sign Up", true, R.color.white) {
            val intent = Intent(this, AuthenticationActivity::class.java).apply {
                putExtra("isRegister", true)
            }
            startActivity(intent)
        }
        makeTextLink(binding.tvTermDescription, "Terms of Services", false, R.color.primaryColor) {
            val intent = Intent(this, AuthenticationActivity::class.java).apply {
                putExtra("isRegister", true)
            }
            startActivity(intent)
        }
        makeTextLink(binding.tvTermDescription, "Privacy Policy", false, R.color.primaryColor) {
            val intent = Intent(this, AuthenticationActivity::class.java).apply {
                putExtra("isRegister", true)
            }
            startActivity(intent)
        }
    }

    private fun makeTextLink(textView: TextView, str: String, underlined: Boolean, color: Int?, action: (() -> Unit)? = null) {
        val spannableString = SpannableString(textView.text)
        val textColor = color?.let {
            resources.getColor(it, textView.context.theme)
        } ?: textView.currentTextColor
        val clickableSpan = object : ClickableSpan() {
            override fun onClick(textView: View) {
                action?.invoke()
            }
            override fun updateDrawState(drawState: TextPaint) {
                super.updateDrawState(drawState)
                drawState.isUnderlineText = underlined
                drawState.color = textColor
            }
        }
        val index = spannableString.indexOf(str)
        spannableString.setSpan(
            StyleSpan(Typeface.BOLD),
            index,
            index + str.length,
            Spanned.SPAN_EXCLUSIVE_EXCLUSIVE
        )

        spannableString.setSpan(clickableSpan, index, index + str.length, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
        textView.text = spannableString
        textView.movementMethod = LinkMovementMethod.getInstance()
        textView.highlightColor = Color.TRANSPARENT
    }
}