<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-gray-700 mb-6">Login</h1>

      <!-- Email Input -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email" type="email" placeholder="Enter your email" />
      </div>

      <!-- Password Input -->
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password" type="password" placeholder="Enter your password" />
      </div>

      <!-- Remember Me Checkbox -->
      <div class="flex items-center justify-between mb-6">
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
          <span class="ml-2 text-gray-600">Remember me</span>
        </label>
        <router-link to="/register"
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Don't have an account yet?
        </router-link>
      </div>

      <!-- Login Button -->
      <div class="flex items-center justify-center">
        <button @click="fetchAccounts"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Khai báo biến lưu giá trị email và password từ người dùng nhập
const email = ref('');
const password = ref('');
const router = useRouter();


// Hàm lấy dữ liệu từ API
const fetchAccounts = async () => {
  try {
    // Gọi API để lấy danh sách tất cả các tài khoản
    const response = await axios.get('http://localhost:8080/user');
    const accounts = response.data; // Lưu lại danh sách tài khoản


    // So sánh với dữ liệu người dùng nhập
    const userAccount = accounts.find(
      account => account.email === email.value && account.password === password.value
    );

    if (userAccount) {
      if (userAccount.status===false) {
        localStorage.setItem("account", JSON.stringify(userAccount))
        if (userAccount.email === 'admin@gmail.com' && password.value === 'phuonganh123') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        alert("Tài khoản bị khóa")
      }

    } else {
      alert('Tài khoản hoặc mật khẩu không đúng!');
    }
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ server:', error);
  }
};
</script>

<style></style>
