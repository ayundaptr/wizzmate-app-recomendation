package com.bangkit.wizzmate.data.remote.response

import com.google.gson.annotations.SerializedName

data class AuthResponse(

	@field:SerializedName("message")
	val message: String,

	@field:SerializedName("user")
	val user: String
)
