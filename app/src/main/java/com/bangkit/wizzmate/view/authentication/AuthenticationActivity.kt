package com.bangkit.wizzmate.view.authentication

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.fragment.app.Fragment
import com.bangkit.wizzmate.R
import com.bangkit.wizzmate.databinding.ActivityAuthenticationBinding

class AuthenticationActivity : AppCompatActivity() {
    private lateinit var binding: ActivityAuthenticationBinding


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAuthenticationBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val isRegister = intent.getBooleanExtra("isRegister", false)

        if (savedInstanceState == null) {
            if(isRegister){
                switchFragment(RegisterFragment())
                binding.toggleAuthetication.check(R.id.buttonRegister)
            } else {
                switchFragment(LoginFragment())
                binding.toggleAuthetication.check(R.id.buttonLogin)
            }
        }

        binding.toggleAuthetication.addOnButtonCheckedListener { _, checkedId, isChecked ->
            if (isChecked) {
                when (checkedId) {
                    R.id.buttonLogin -> switchFragment(LoginFragment())
                    R.id.buttonRegister -> switchFragment(RegisterFragment())
                }
            }
        }
    }

    fun switchFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainerView, fragment)
            .commit()
        if (fragment is LoginFragment) {
            binding.toggleAuthetication.check(R.id.buttonLogin)
        } else {
            binding.toggleAuthetication.check(R.id.buttonRegister)
        }
    }
}