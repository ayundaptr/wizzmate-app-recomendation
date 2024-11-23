package com.bangkit.wizzmate.data.remote.request

data class LoginRequest(
    val name: String,
    val email: String,
    val password: String
)